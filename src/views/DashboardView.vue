<script setup lang="ts">
import { SvgIcon } from '@/assets'
import { AppHeader, DashboardPanel, QuickViewCard } from '@/components'

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
    <header class="mb-[25px] flex flex-col items-start gap-5 min-[901px]:flex-row min-[901px]:items-center min-[901px]:justify-between min-[901px]:gap-8">
      <div>
        <h1 class="text-[0.9rem] font-extrabold tracking-[0.14em] text-forest-green uppercase">
          Executive Summary
        </h1>
        <h1 class="text-[2rem] mb-4 font-extrabold tracking-[0.14em] uppercase text-ink">
          Exposure Cost Dashboard
        </h1>
        <p class="max-w-[780px] text-[0.82rem] leading-[1.7] text-slate-green sm:text-[0.9rem]">
          A unified view of meal-period and location-based punch exceptions, designed to turn audit
          activity into a clearer conversation about employee abuse and unnecessary costs.
        </p>
      </div>
      <div class="flex w-full flex-col items-start gap-5 sm:w-auto sm:shrink-0 sm:flex-row sm:items-center sm:gap-6">
        <button
          type="button"
          class="inline-flex min-h-18 w-full items-center justify-center gap-2 uppercase cursor-pointer rounded-lg bg-forest-green px-6 py-4 text-base font-semibold whitespace-nowrap text-lavender-mist shadow-sm shadow-deep-pine/10 hover:bg-deep-pine focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest-green motion-safe:transition-colors sm:w-auto"
        >
          <SvgIcon name="uploadFile" class="size-6" />
          Upload audit file
        </button>
        <div class="shrink-0 border-l-[3px] border-forest-green py-1 pl-[18px] text-xs leading-[1.8] text-slate-green">
          <h2 class="mb-[5px] text-[0.68rem] font-bold tracking-[0.1em] text-ink uppercase">
            Current audit periods
          </h2>
          <p>Meal: <time datetime="2025-12-26">Dec 26, 2025</time>–<time datetime="2026-06-23">Jun 23, 2026</time></p>
          <p>Location: <time datetime="2026-05-25">May 25</time>–<time datetime="2026-06-23">Jun 23, 2026</time></p>
        </div>
      </div>
    </header>

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
  </main>
</template>
