<script setup lang="ts">
import { computed } from 'vue'
import type { Employee, StudyCosts } from '@/data'

const props = defineProps<{
  employee: Employee | null
}>()

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
const integer = new Intl.NumberFormat('en-US')
const decimal = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

interface StudyDetail {
  kind: 'meal' | 'location'
  title: string
  label: string
  fields: { label: string; value: string }[]
}

function costFields(study: StudyCosts) {
  return [
    { label: 'Observed cost', value: currency.format(study.observedCost) },
    { label: 'Annualized cost', value: currency.format(study.annualizedCost) },
  ]
}

const studies = computed<StudyDetail[]>(() => {
  const employee = props.employee
  if (!employee) return []

  const details: StudyDetail[] = []

  if (employee.meal) {
    details.push({
      kind: 'meal',
      title: 'Meal-period review',
      label: 'Meal-period',
      fields: [
        { label: 'Meal exceptions', value: integer.format(employee.mealExceptions) },
        { label: 'Hourly rate', value: `${currency.format(employee.meal.hourlyRate)}/hr` },
        ...costFields(employee.meal),
      ],
    })
  }

  if (employee.location) {
    details.push({
      kind: 'location',
      title: 'Location punch review',
      label: 'Location',
      fields: [
        { label: 'Location exceptions', value: integer.format(employee.locationExceptions) },
        { label: 'Hourly rate', value: `${currency.format(employee.location.hourlyRate)}/hr` },
        { label: 'Distance', value: `${decimal.format(employee.locationMiles)} mi` },
        { label: 'Estimated time', value: `${integer.format(employee.location.estimatedMinutes)} min` },
        ...costFields(employee.location),
      ],
    })
  }

  return details
})
</script>

<template>
  <aside
    aria-label="Selected Employee"
    aria-live="polite"
    aria-atomic="true"
    class="min-w-0 rounded-xl border border-slate-green/17 border-t-[3px] border-t-forest-green bg-white p-5 shadow-lg shadow-charcoal-blue/10 min-[561px]:p-6 min-[1151px]:sticky min-[1151px]:top-5"
  >
    <p class="mb-[7px] text-[0.67rem] font-extrabold tracking-[0.14em] text-forest-green uppercase">
      Selected Employee
    </p>
    <template v-if="employee">
      <h2 class="text-[1.4rem] font-bold tracking-[-0.04em] text-ink">{{ employee.name }}</h2>
      <p class="mt-2 mb-[21px] text-[0.74rem] leading-[1.65] text-slate-green">
        A study-by-study breakdown of recorded exceptions and the documented cost treatment.
      </p>

      <section
        v-for="study in studies"
        :key="study.kind"
        class="border-t border-slate-green/17 py-[18px]"
      >
        <div class="mb-[13px] flex items-center justify-between gap-2">
          <h3 class="text-[0.78rem] font-bold text-ink">{{ study.title }}</h3>
          <span
            class="shrink-0 rounded-md px-2 py-[5px] text-[0.65rem] font-bold"
            :class="study.kind === 'meal' ? 'bg-copper-soft text-burnt-copper' : 'bg-soft-sage text-deep-pine'"
          >
            {{ study.label }}
          </span>
        </div>
        <dl class="grid grid-cols-2 gap-2 min-[561px]:grid-cols-4 min-[1151px]:grid-cols-2">
          <div
            v-for="field in study.fields"
            :key="field.label"
            class="rounded-md p-2.5"
            :class="study.kind === 'meal' ? 'bg-copper-soft' : 'bg-lavender-mist'"
          >
            <dt class="text-[0.63rem] text-slate-green">{{ field.label }}</dt>
            <dd class="mt-[3px] text-[0.85rem] font-[650] text-ink tabular-nums">
              {{ field.value }}
            </dd>
          </div>
        </dl>
      </section>

      <dl class="mt-0.5 rounded-lg bg-forest-green p-4 text-lavender-mist">
        <dt class="text-[0.65rem]">Combined supported annualized cost</dt>
        <dd class="mt-1 text-[1.75rem] font-[650] tracking-[-0.035em] text-soft-sage tabular-nums">
          {{ currency.format(employee.annualizedCost) }}
        </dd>
      </dl>
    </template>
    <template v-else>
      <h2 class="text-lg font-bold text-ink">No matching employees</h2>
      <p class="mt-2 text-xs leading-[1.65] text-slate-green">
        Adjust your search or audit type to view employee details.
      </p>
    </template>
  </aside>
</template>
