<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string
    value: string | number
    description: string
    note?: string
    variant?: 'default' | 'copper' | 'highlight'
    align?: 'left' | 'center'
  }>(),
  { variant: 'default', align: 'left' },
)
</script>

<template>
  <article
    class="min-h-[173px] min-w-0 rounded-xl border p-[15px] sm:p-[18px] xl:p-[22px]"
    :class="[
      variant === 'highlight'
        ? 'border-forest-green bg-forest-green text-lavender-mist'
        : 'border-slate-green/17 bg-white text-slate-green',
      { 'text-center': align === 'center' },
    ]"
  >
    <div
      aria-hidden="true"
      class="mb-3.5 h-[3px] w-6 rounded-sm"
      :class="{
        'bg-forest-green': variant === 'default',
        'bg-burnt-copper': variant === 'copper',
        'bg-soft-sage': variant === 'highlight',
        'mx-auto': align === 'center',
      }"
    ></div>
    <h2 class="text-[0.73rem] font-semibold">{{ label }}</h2>
    <p
      class="mt-2.5 mb-[5px] text-[clamp(1.8rem,2.5vw,2.65rem)] leading-[1.12] font-[650] tracking-[-0.055em] tabular-nums"
      :class="variant === 'highlight' ? 'text-soft-sage' : 'text-ink'"
    >
      {{ value }}
    </p>
    <p class="text-xs">{{ description }}</p>
    <p v-if="note" class="mt-[15px] text-[0.67rem]">{{ note }}</p>
  </article>
</template>
