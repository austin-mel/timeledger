<script setup lang="ts">
import { computed, ref, useId, watch } from 'vue'
import { SelectedEmployeeCard } from '../SelectedEmployeeCard'
import { employees } from '@/data'

type AuditType = 'all' | 'meal' | 'location'

const titleId = useId()
const searchId = useId()
const auditTypeId = useId()
const detailsId = useId()
const searchQuery = ref('')
const auditType = ref<AuditType>('all')
const selectedEmployeeName = ref<string | null>(null)
const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
const decimal = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const filteredEmployees = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return employees.filter((employee) => {
    if (!employee.name.toLowerCase().includes(query)) return false
    if (auditType.value === 'meal') return employee.mealExceptions > 0
    if (auditType.value === 'location') return employee.locationExceptions > 0
    return true
  })
})

watch(
  filteredEmployees,
  (visibleEmployees) => {
    if (!visibleEmployees.some((employee) => employee.name === selectedEmployeeName.value)) {
      selectedEmployeeName.value = visibleEmployees[0]?.name ?? null
    }
  },
  { immediate: true },
)

const selectedEmployee = computed(() =>
  filteredEmployees.value.find((employee) => employee.name === selectedEmployeeName.value) ?? null,
)
</script>

<template>
  <div class="grid items-start gap-5 min-[1151px]:grid-cols-[minmax(0,1fr)_340px]">
    <section
      :aria-labelledby="titleId"
      class="min-w-0 overflow-hidden rounded-xl border border-slate-green/17 bg-white"
    >
      <header class="px-5 py-5 sm:px-[22px]">
        <h2 :id="titleId" class="text-base font-bold tracking-[-0.025em] text-ink">
          Employee exception directory
        </h2>
        <p role="status" class="mt-[5px] text-xs text-slate-green">
          {{ filteredEmployees.length }} of {{ employees.length }} employees shown
        </p>
        <div class="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end">
          <div class="min-w-0 flex-1">
            <label :for="searchId" class="mb-1.5 block text-xs font-semibold text-slate-green">
              Search employees
            </label>
            <input
              :id="searchId"
              v-model="searchQuery"
              type="search"
              placeholder="Search employee name"
              class="min-h-11 w-full rounded-lg border border-slate-green/20 bg-lavender-mist px-3 py-2.5 text-sm text-ink placeholder:text-slate-green focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-green"
            />
          </div>
          <div class="sm:w-52 sm:shrink-0">
            <label :for="auditTypeId" class="mb-1.5 block text-xs font-semibold text-slate-green">
              Audit type
            </label>
            <select
              :id="auditTypeId"
              v-model="auditType"
              class="min-h-11 w-full cursor-pointer rounded-lg border border-slate-green/20 bg-lavender-mist px-3 py-2.5 text-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-green"
            >
              <option value="all">All audit types</option>
              <option value="meal">Meal-period</option>
              <option value="location">Location</option>
            </select>
          </div>
        </div>
      </header>
      <div class="overflow-x-auto">
        <table :aria-labelledby="titleId" class="w-full min-w-[680px] border-collapse text-right tabular-nums">
          <thead class="bg-charcoal-blue text-[0.6rem] tracking-[0.045em] whitespace-nowrap text-lavender-mist uppercase">
            <tr>
              <th scope="col" class="py-[13px] pr-3 pl-[22px] text-left font-[650]">Employee</th>
              <th scope="col" class="px-3 py-[13px] font-[650]">Meal exceptions</th>
              <th scope="col" class="px-3 py-[13px] font-[650]">Location exceptions</th>
              <th scope="col" class="px-3 py-[13px] font-[650]">Location miles</th>
              <th scope="col" class="py-[13px] pr-[22px] pl-3 font-[650]">Annualized cost</th>
            </tr>
          </thead>
          <tbody class="text-[0.74rem] whitespace-nowrap text-ink">
            <tr
              v-for="employee in filteredEmployees"
              :key="employee.name"
              class="cursor-pointer border-t border-slate-green/17"
              :class="selectedEmployee?.name === employee.name ? 'bg-forest-green/10' : 'hover:bg-lavender-mist/60'"
              @click="selectedEmployeeName = employee.name"
            >
              <th
                scope="row"
                class="py-3.5 pr-3 pl-[22px] text-left font-[650]"
                :class="{ 'text-forest-green shadow-[inset_3px_0_0_currentColor]': selectedEmployee?.name === employee.name }"
              >
                <button
                  type="button"
                  :aria-controls="detailsId"
                  :aria-pressed="selectedEmployee?.name === employee.name"
                  :aria-label="`View details for ${employee.name}`"
                  class="cursor-pointer rounded-sm text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest-green"
                  @click.stop="selectedEmployeeName = employee.name"
                >
                  {{ employee.name }}
                </button>
              </th>
              <td class="px-3 py-3.5">{{ employee.mealExceptions }}</td>
              <td class="px-3 py-3.5">{{ employee.locationExceptions }}</td>
              <td class="px-3 py-3.5">{{ decimal.format(employee.locationMiles) }}</td>
              <td class="py-3.5 pr-[22px] pl-3 font-[650]">{{ currency.format(employee.annualizedCost) }}</td>
            </tr>
            <tr v-if="filteredEmployees.length === 0" class="border-t border-slate-green/17">
              <td colspan="5" class="px-5 py-8 text-center whitespace-normal text-slate-green">
                No employees match your search and audit type.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <SelectedEmployeeCard :id="detailsId" :employee="selectedEmployee" />
  </div>
</template>
