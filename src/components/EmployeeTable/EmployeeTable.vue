<script setup lang="ts">
import { useId } from 'vue'

const titleId = useId()
const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
const decimal = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

// Fictional examples, fixed so the table matches the dashboard's sample totals.
const employees = [
  {
    name: 'Avery Irving',
    mealExceptions: 1,
    locationExceptions: 5,
    locationMiles: 27.91,
    annualizedCost: 493.39,
  },
  {
    name: 'Blake Lawson',
    mealExceptions: 2,
    locationExceptions: 10,
    locationMiles: 45.97,
    annualizedCost: 836.91,
  },
  {
    name: 'Cameron Vaughn',
    mealExceptions: 2,
    locationExceptions: 5,
    locationMiles: 29.01,
    annualizedCost: 570.28,
  },
  {
    name: 'Casey Whitaker',
    mealExceptions: 2,
    locationExceptions: 10,
    locationMiles: 47.62,
    annualizedCost: 875.77,
  },
  {
    name: 'Dakota Winslow',
    mealExceptions: 0,
    locationExceptions: 5,
    locationMiles: 28.19,
    annualizedCost: 436.53,
  },
  {
    name: 'Drew Reed',
    mealExceptions: 1,
    locationExceptions: 8,
    locationMiles: 52.10,
    annualizedCost: 868.65,
  },
  {
    name: 'Ellis Jensen',
    mealExceptions: 1,
    locationExceptions: 9,
    locationMiles: 52.21,
    annualizedCost: 874.35,
  },
  {
    name: 'Emerson Nolan',
    mealExceptions: 0,
    locationExceptions: 6,
    locationMiles: 36.12,
    annualizedCost: 559.33,
  },
  {
    name: 'Finley Dalton',
    mealExceptions: 1,
    locationExceptions: 6,
    locationMiles: 37.76,
    annualizedCost: 648.58,
  },
  {
    name: 'Harper Mercer',
    mealExceptions: 2,
    locationExceptions: 4,
    locationMiles: 19.92,
    annualizedCost: 442.82,
  },
  {
    name: 'Hayden Callahan',
    mealExceptions: 1,
    locationExceptions: 6,
    locationMiles: 28.90,
    annualizedCost: 518.03,
  },
  {
    name: 'Jordan Ellison',
    mealExceptions: 2,
    locationExceptions: 7,
    locationMiles: 41.76,
    annualizedCost: 773.04,
  },
  {
    name: 'Morgan Hawthorne',
    mealExceptions: 3,
    locationExceptions: 6,
    locationMiles: 37.11,
    annualizedCost: 784.17,
  },
  {
    name: 'Parker Bennett',
    mealExceptions: 0,
    locationExceptions: 7,
    locationMiles: 45.21,
    annualizedCost: 700.10,
  },
  {
    name: 'Quinn Kendall',
    mealExceptions: 0,
    locationExceptions: 7,
    locationMiles: 32.57,
    annualizedCost: 504.36,
  },
  {
    name: 'Reese Turner',
    mealExceptions: 1,
    locationExceptions: 4,
    locationMiles: 20.14,
    annualizedCost: 384.38,
  },
  {
    name: 'Riley Sullivan',
    mealExceptions: 0,
    locationExceptions: 6,
    locationMiles: 33.50,
    annualizedCost: 518.76,
  },
  {
    name: 'Rowan Walker',
    mealExceptions: 1,
    locationExceptions: 9,
    locationMiles: 42.36,
    annualizedCost: 725.13,
  },
  {
    name: 'Sage Griffin',
    mealExceptions: 1,
    locationExceptions: 7,
    locationMiles: 45.21,
    annualizedCost: 764.62,
  },
  {
    name: 'Skyler Palmer',
    mealExceptions: 2,
    locationExceptions: 7,
    locationMiles: 32.56,
    annualizedCost: 645.22,
  },
  {
    name: 'Taylor Foster',
    mealExceptions: 3,
    locationExceptions: 4,
    locationMiles: 19.48,
    annualizedCost: 503.19,
  },
] as const
</script>

<template>
  <section
    :aria-labelledby="titleId"
    class="min-w-0 overflow-hidden rounded-xl border border-slate-green/17 bg-white"
  >
    <header class="px-5 py-5 sm:px-[22px]">
      <h2 :id="titleId" class="text-base font-bold tracking-[-0.025em] text-ink">
        Employee exception directory
      </h2>
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
          <tr v-for="employee in employees" :key="employee.name" class="border-t border-slate-green/17">
            <th scope="row" class="py-3.5 pr-3 pl-[22px] text-left font-[650]">{{ employee.name }}</th>
            <td class="px-3 py-3.5">{{ employee.mealExceptions }}</td>
            <td class="px-3 py-3.5">{{ employee.locationExceptions }}</td>
            <td class="px-3 py-3.5">{{ decimal.format(employee.locationMiles) }}</td>
            <td class="py-3.5 pr-[22px] pl-3 font-[650]">{{ currency.format(employee.annualizedCost) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
