<script setup lang="ts">
import { useId, useTemplateRef } from 'vue'
import { SvgIcon } from '@/assets'

const dialog = useTemplateRef<HTMLDialogElement>('dialog')
const titleId = useId()
const descriptionId = useId()
const filesTitleId = useId()
const uploadNoticeId = useId()

function open() {
  dialog.value?.showModal()
}

function close() {
  dialog.value?.close()
}

defineExpose({ open })
</script>

<template>
  <Teleport to="body">
    <dialog
      ref="dialog"
      :aria-labelledby="titleId"
      :aria-describedby="descriptionId"
      class="m-auto max-h-[calc(100svh_-_2rem)] w-[calc(100%_-_2rem)] max-w-xl overflow-y-auto rounded-2xl border border-slate-green/20 bg-white p-0 font-sans text-ink shadow-2xl backdrop:bg-deep-pine/50 backdrop:backdrop-blur-sm"
    >
      <div class="p-6 sm:p-8">
        <header class="flex items-start justify-between gap-4">
          <div>
            <h2 :id="titleId" class="text-xl font-bold tracking-tight text-deep-pine sm:text-2xl">
              Upload audit data
            </h2>
            <p :id="descriptionId" class="mt-2 text-sm leading-relaxed text-slate-green">
              Add meal-period or location audit files to your dashboard.
            </p>
          </div>
          <button
            type="button"
            autofocus
            aria-label="Close upload dialog"
            class="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-lg text-slate-green hover:bg-lavender-mist hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-green"
            @click="close"
          >
            <SvgIcon name="close" class="size-5" />
          </button>
        </header>

        <section
          :aria-labelledby="filesTitleId"
          class="mt-7 flex flex-col items-center rounded-xl border-2 border-dashed border-forest-green/25 bg-lavender-mist/50 px-5 py-9 text-center"
        >
          <span class="mb-4 flex size-14 items-center justify-center rounded-full bg-soft-sage text-forest-green">
            <SvgIcon name="uploadFile" class="size-7" />
          </span>
          <h3 :id="filesTitleId" class="text-base font-semibold text-deep-pine">Select audit files</h3>
          <p class="mt-2 max-w-xs text-sm leading-relaxed text-slate-green">
            Choose one or more files from your computer.
          </p>
          <button
            type="button"
            disabled
            :aria-describedby="uploadNoticeId"
            class="mt-5 min-h-11 cursor-not-allowed rounded-lg border border-forest-green/25 bg-white px-5 py-2.5 text-sm font-semibold text-forest-green opacity-50"
          >
            Choose files
          </button>
          <p class="mt-3 text-xs text-slate-green">No files selected</p>
        </section>
        <p :id="uploadNoticeId" class="mt-4 text-center text-xs text-slate-green">
          File uploads are coming soon.
        </p>
      </div>

      <footer class="flex flex-col-reverse gap-3 border-t border-slate-green/17 bg-lavender-mist/40 px-6 py-5 sm:flex-row sm:justify-end sm:px-8">
        <button
          type="button"
          class="min-h-11 cursor-pointer rounded-lg border border-slate-green/25 bg-white px-5 py-2.5 text-sm font-semibold text-ink hover:bg-lavender-mist focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-green"
          @click="close"
        >
          Cancel
        </button>
        <button
          type="button"
          disabled
          :aria-describedby="uploadNoticeId"
          class="inline-flex min-h-11 cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-forest-green px-5 py-2.5 text-sm font-semibold text-lavender-mist opacity-50"
        >
          <SvgIcon name="uploadFile" class="size-5" />
          Upload files
        </button>
      </footer>
    </dialog>
  </Teleport>
</template>
