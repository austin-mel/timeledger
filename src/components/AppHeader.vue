<script setup lang="ts">
import timeledgerLogo from '../assets/timeledger-logo.svg'
</script>

<template>
  <header class="mx-auto w-full max-w-[1560px] px-5 sm:px-10">
    <div class="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b-[3px] border-forest-green py-6">
      <img
        :src="timeledgerLogo"
        alt="timeledger"
        width="144"
        height="28"
        class="h-7 w-auto shrink-0"
      />
      <p class="flex items-center gap-2 text-[10px] font-medium tracking-[0.1em] text-charcoal-blue uppercase sm:text-xs">
        <span class="size-1.5 shrink-0 rounded-full bg-forest-green" aria-hidden="true"></span>
        Workforce intelligence dashboard
      </p>
    </div>
  </header>
</template>
