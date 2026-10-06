<script setup lang="ts">
import { AppHeader, AuditPageHeader, DashboardPanel, EmployeeTable, QuickViewCard } from '@/components'

// Example values randomized once for the dashboard mockup.
const quickViewCards = [
  {
    label: 'Meal-period exceptions',
    value: 26,
    description: 'meal-period violations',
    note: '16 unique employees',
    variant: 'copper',
  },
  {
    label: 'Meal-period exposure',
    value: '$1,726.65',
    description: 'annualized labor cost projection',
    note: '$851.50 current observed labor cost',
    variant: 'copper',
  },
  {
    label: 'Location punch exceptions',
    value: 138,
    description: 'location violations',
    note: '21 unique employees totaling 755.61 miles',
    variant: 'default',
  },
  {
    label: 'Location punch exposure',
    value: '$11,700.96',
    description: 'annualized labor cost projection',
    note: '$975.08 current observed labor cost',
    variant: 'default',
  },
] as const

const combinedExposureCard = {
  label: 'Total labor cost exposure',
  value: '$13,427.61',
  note: 'annualized meal + location cost projection',
  variant: 'highlight',
} as const

const studySummary = [
  {
    label: 'Meal-period known cost',
    value: '$851.50',
    study: 'meal',
  },
  {
    label: 'Meal-period annualized cost projection',
    value: '$1,726.65',
    study: 'meal',
  },
  {
    label: 'Location known labor cost',
    value: '$975.08',
    study: 'location',
  },
  {
    label: 'Location annualized labor cost projection',
    value: '$11,700.96',
    study: 'location',
  },
] as const

const calculationAssumptions = [
  {
    title: 'Meal-period cost projection',
    description: 'Recorded one-hour events × hourly rate × 365 / 180 days.',
  },
  {
    title: 'Location to time and cost conversion',
    description: 'Actual miles ÷ 25 mph × 60, rounded per incident; annualized at 12×.',
  }
] as const
</script>

<template>
  <AppHeader />
  <main class="mx-auto w-full max-w-[1560px] flex-1 px-5 pt-7 pb-8 sm:px-10 sm:pt-9">
    <AuditPageHeader
      eyebrow="Executive Summary"
      title="Exposure Cost Dashboard"
      description="A unified view of meal-period and location-based punch exceptions, designed to turn audit activity into a clearer conversation about employee abuse and unnecessary costs."
    />

    <section
      aria-label="Data-use note"
      class="mb-6 flex items-start gap-3 rounded-[10px] bg-charcoal-blue px-[17px] py-[13px] text-lavender-mist sm:items-center"
    >
      <span
        aria-hidden="true"
        class="flex size-[22px] shrink-0 items-center justify-center rounded-full border border-soft-sage font-serif font-bold text-soft-sage"
      >i</span>
      <p class="text-[0.76rem]">
        <strong class="font-bold text-white">Disclaimer:</strong> Results quantify potential
        labor-cost exposure from only the uploaded audit records. They do not determine legal compensability
        or liability.
      </p>
    </section>

    <section
      aria-label="Executive metrics"
      class="mb-6 grid grid-cols-1 gap-4 min-[400px]:grid-cols-2 min-[901px]:grid-cols-4"
    >
      <QuickViewCard v-for="card in quickViewCards" :key="card.label" v-bind="card" />
      <QuickViewCard
        class="min-[400px]:col-span-2 min-[901px]:col-start-2"
        align="center"
        v-bind="combinedExposureCard"
      />
    </section>

    <section
      aria-label="Study summaries and methodology"
      class="mb-[30px] grid grid-cols-1 gap-[18px] min-[901px]:grid-cols-[1.1fr_0.9fr]"
    >
      <DashboardPanel
        title="At a glance"
        description="Observed costs are separated from annualized management projections."
      >
        <dl class="grid grid-cols-1 gap-x-3.5 gap-y-[19px] min-[561px]:grid-cols-2">
          <div
            v-for="stat in studySummary"
            :key="stat.label"
            class="border-l-[3px] py-0.5 pl-3"
            :class="stat.study === 'meal' ? 'border-burnt-copper' : 'border-forest-green'"
          >
            <dt class="text-[0.71rem] text-slate-green">{{ stat.label }}</dt>
            <dd class="mt-1 text-[1.22rem] font-[650] tracking-[-0.035em] text-ink tabular-nums">
              {{ stat.value }}
            </dd>
          </div>
        </dl>
      </DashboardPanel>

      <DashboardPanel
        title="Calculation assumptions"
        description="Annualization estimations are directly calculated based on the audit period provided."
      >
        <dl class="grid pt-[18px] gap-[6px]">
          <div
            v-for="assumption in calculationAssumptions"
            :key="assumption.title"
            class="border-b border-slate-green/17 pb-[11px] last:border-0 last:pb-0"
          >
            <dt class="text-[0.77rem] font-bold text-ink">{{ assumption.title }}</dt>
            <dd class="mt-[3px] text-[0.73rem] text-slate-green">
              {{ assumption.description }}
            </dd>
          </div>
        </dl>
      </DashboardPanel>
    </section>
    <EmployeeTable />
  </main>
</template>
