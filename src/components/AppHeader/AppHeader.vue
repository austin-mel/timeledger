<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { SvgIcon, TimeledgerLogo } from '@/assets'

const route = useRoute()
const router = useRouter()
</script>

<template>
  <header class="mx-auto w-full max-w-[1560px] px-5 sm:px-10">
    <div class="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b-[3px] border-forest-green py-6">
      <img
        :src="TimeledgerLogo"
        alt="timeledger"
        width="144"
        height="28"
        class="h-7 w-auto shrink-0"
      />
      <p class="order-last flex w-full items-center gap-2 text-[10px] font-medium tracking-[0.1em] text-charcoal-blue uppercase sm:text-xs md:order-none md:ml-auto md:w-auto">
        <span class="size-1.5 shrink-0 rounded-full bg-forest-green" aria-hidden="true"></span>
        Workforce intelligence
      </p>
      <button
        v-if="route.name !== 'login'"
        type="button"
        class="ml-auto inline-flex min-h-11 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg border border-forest-green/25 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-700 hover:text-lavender-mist focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest-green motion-safe:transition-colors md:ml-0"
        @click="router.replace({ name: 'login' })"
      >
        <SvgIcon name="logout" class="size-5" />
        Logout
      </button>
    </div>
  </header>
</template>
