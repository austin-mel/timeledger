<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { SvgIcon } from '@/assets'
import { UploadAuditModal } from '../UploadAuditModal'
import { useDemoSession } from '@/composables/useDemoSession'

defineProps<{
  eyebrow: string
  title: string
  description: string
}>()

const { isAdmin } = useDemoSession()
const uploadAuditModal = useTemplateRef<InstanceType<typeof UploadAuditModal>>('uploadAuditModal')
</script>

<template>
  <header class="mb-[25px] flex flex-col items-start gap-5 min-[901px]:flex-row min-[901px]:flex-wrap min-[901px]:items-center min-[901px]:justify-between min-[901px]:gap-8">
    <div class="min-w-0 min-[901px]:flex-1 min-[901px]:basis-[28rem]">
      <p class="text-[0.9rem] font-extrabold tracking-[0.14em] text-forest-green uppercase">
        {{ eyebrow }}
      </p>
      <h1
        class="mb-4 font-extrabold tracking-[0.14em] uppercase text-ink"
        :class="isAdmin ? 'text-2xl break-words sm:text-[2rem]' : 'text-[2rem]'"
      >
        {{ title }}
      </h1>
      <p class="max-w-[780px] text-[0.82rem] leading-[1.7] text-slate-green sm:text-[0.9rem]">
        {{ description }}
      </p>
    </div>
    <div class="flex w-full min-w-0 max-w-full flex-col items-start gap-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6 min-[901px]:w-auto">
      <button
        v-if="isAdmin"
        type="button"
        aria-haspopup="dialog"
        class="inline-flex min-h-14 w-full items-center justify-center gap-2 uppercase cursor-pointer rounded-lg bg-forest-green px-4 py-3 text-sm font-semibold whitespace-nowrap text-lavender-mist shadow-sm shadow-deep-pine/10 hover:bg-deep-pine focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest-green motion-safe:transition-colors sm:min-h-18 sm:w-auto sm:px-6 sm:py-4 sm:text-base"
        @click="uploadAuditModal?.open()"
      >
        <SvgIcon name="uploadFile" class="size-5 sm:size-6" />
        Upload audit file
      </button>
      <div class="shrink-0 border-l-[3px] border-forest-green py-1 pl-[18px] text-xs leading-[1.8] text-slate-green">
        <h2 class="mb-[5px] text-[0.68rem] font-bold tracking-[0.1em] text-ink uppercase">
          Current audit periods
        </h2>
        <p>Meal: <time datetime="2025-12-26">Dec 26, 2025</time> – <time datetime="2026-06-23">Jun 23, 2026</time><strong> (XX days)</strong></p>
        <p>Location: <time datetime="2026-05-25">May 25</time> – <time datetime="2026-06-23">Jun 23, 2026</time><strong> (XX days)</strong></p>
      </div>
    </div>
  </header>
  <UploadAuditModal v-if="isAdmin" ref="uploadAuditModal" />
</template>
