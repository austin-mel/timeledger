<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue'
import QuickViewCard from '../components/QuickViewCard.vue'

// Display values from the supplied reference until dashboard data is connected.
const quickViewCards = [
  {
    label: 'Meal-period exceptions',
    value: 23,
    description: 'meal-period violations',
    note: '9 unique employees',
    variant: 'copper',
  },
  {
    label: 'Meal-period exposure',
    value: '$1,153.81',
    description: 'annualized labor cost projection',
    note: '$569.00 current observed labor cost',
    variant: 'copper',
  },
  {
    label: 'Location punch exceptions',
    value: 123,
    description: 'location violations',
    note: '13 unique employees totaling 700.82 miles',
    variant: 'default',
  },
  {
    label: 'Location punch exposure',
    value: '$8,602.00',
    description: 'annualized labor cost projection',
    note: '$716.83 current observed labor cost',
    variant: 'default',
  },
] as const

const combinedExposureCard = {
  label: 'Combined known-rate exposure',
  value: '$9,755.81',
  description: 'annualized labor cost projection',
  note: 'Meal known-rate + location estimate',
  variant: 'highlight',
} as const
</script>

<template>
  <AppHeader />
  <main class="mx-auto w-full max-w-[1560px] flex-1 px-5 pt-7 pb-8 sm:px-10 sm:pt-9">
    <header class="mb-[25px] flex flex-col items-start gap-5 min-[901px]:flex-row min-[901px]:items-center min-[901px]:justify-between min-[901px]:gap-8">
      <div>
        <h1 class="text-[1.2rem] mb-4 font-extrabold tracking-[0.14em] text-forest-green uppercase">
          Summary Dashboard
        </h1>
        <p class="max-w-[780px] text-[0.82rem] leading-[1.7] text-slate-green sm:text-[0.9rem]">
          A unified view of meal-period and location-based punch exceptions, designed to turn audit
          activity into a clearer conversation about employee abuse and improvements.
        </p>
      </div>
      <div class="flex w-full flex-col items-start gap-5 sm:w-auto sm:shrink-0 sm:flex-row sm:items-center sm:gap-6">
        <button
          type="button"
          class="min-h-18 w-full uppercase cursor-pointer rounded-lg bg-forest-green px-6 py-4 text-base font-semibold whitespace-nowrap text-lavender-mist shadow-sm shadow-deep-pine/10 hover:bg-deep-pine focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest-green motion-safe:transition-colors sm:w-auto"
        >
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
  </main>
</template>
