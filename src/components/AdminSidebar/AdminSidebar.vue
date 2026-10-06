<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { SvgIcon, TimeledgerIcon } from '@/assets'
import { useDemoSession } from '@/composables/useDemoSession'

const { currentProfile } = useDemoSession()
const items = [
  { name: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { name: 'audit-list', label: 'Audit List', icon: 'auditList' },
] as const
</script>

<template>
  <aside class="fixed inset-y-0 left-0 z-20 flex w-20 flex-col overflow-y-auto border-r border-forest-green bg-deep-pine px-3 py-6 text-lavender-mist md:w-60 md:px-4">
    <div class="mb-9 flex items-center justify-center gap-3 md:justify-start md:px-2">
      <span class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-soft-sage">
        <img :src="TimeledgerIcon" alt="" width="28" height="28" />
      </span>
      <div class="hidden md:block">
        <p class="text-base font-extrabold tracking-tight">timeledger.</p>
        <p class="mt-0.5 text-[10px] font-medium tracking-widest text-soft-sage uppercase">Admin workspace</p>
      </div>
    </div>
    <nav aria-label="Admin navigation" class="space-y-2">
      <RouterLink
        v-for="item in items"
        :key="item.name"
        :to="{ name: item.name }"
        :title="item.label"
        class="flex min-h-12 items-center justify-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold text-lavender-mist/80 hover:bg-forest-green hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-soft-sage md:justify-start"
        exact-active-class="bg-forest-green text-white shadow-sm"
      >
        <SvgIcon :name="item.icon" class="size-5" />
        <span class="sr-only md:not-sr-only">{{ item.label }}</span>
      </RouterLink>
    </nav>
    <div class="mt-auto hidden border-t border-soft-sage/20 px-2 pt-5 md:block">
      <p class="text-sm font-semibold">{{ currentProfile?.name }}</p>
      <p class="mt-1 text-xs text-soft-sage">Administrator · Demo profile</p>
    </div>
  </aside>
</template>
