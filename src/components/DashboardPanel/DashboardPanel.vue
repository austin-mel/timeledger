<script setup lang="ts">
import { useId } from 'vue'

defineProps<{
  title: string
  description?: string
}>()

const titleId = useId()
</script>

<template>
  <article
    :aria-labelledby="titleId"
    class="min-w-0 rounded-xl border border-slate-green/17 bg-white p-5 min-[561px]:p-6"
  >
    <header class="mb-5">
      <h2 :id="titleId" class="text-base font-bold tracking-[-0.025em] text-ink">
        {{ title }}
      </h2>
      <p v-if="description" class="mt-[5px] text-xs leading-[1.6] text-slate-green">
        {{ description }}
      </p>
    </header>
    <slot />
    <div v-if="$slots.footer" class="mt-[22px] text-xs leading-[1.65] text-slate-green">
      <slot name="footer" />
    </div>
  </article>
</template>
