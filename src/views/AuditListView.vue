<script setup lang="ts">
import { ref, useId, useTemplateRef } from 'vue'
import { SvgIcon } from '@/assets'
import { AppHeader, AuditPageHeader } from '@/components'
import { useAuditFiles } from '@/composables/useAuditFiles'
import type { AuditSourceFile } from '@/data/auditFiles'

const { files, removeFile } = useAuditFiles()
const deleteDialog = useTemplateRef<HTMLDialogElement>('deleteDialog')
const pendingFile = ref<AuditSourceFile | null>(null)
const statusMessage = ref('')
const titleId = useId()
const deleteTitleId = useId()
const deleteDescriptionId = useId()
const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC',
})
const integer = new Intl.NumberFormat('en-US')

function formatDate(value: string) {
  return dateFormatter.format(new Date(`${value}T00:00:00Z`))
}

function requestDelete(file: AuditSourceFile) {
  pendingFile.value = file
  deleteDialog.value?.showModal()
}

function cancelDelete() {
  deleteDialog.value?.close()
}

function confirmDelete() {
  const file = pendingFile.value
  if (!file) return
  if (removeFile(file.id)) statusMessage.value = `${file.name} was removed.`
  deleteDialog.value?.close()
}
</script>

<template>
  <AppHeader />
  <main class="mx-auto w-full max-w-[1560px] flex-1 px-5 pt-7 pb-8 sm:px-10 sm:pt-9">
    <AuditPageHeader
      eyebrow="Audit management"
      title="Audit List"
      description="Review source files, their audit types, and the dates covered by each file."
    />

    <p role="status" aria-atomic="true" class="mb-4 text-sm text-forest-green">{{ statusMessage }}</p>

    <section :aria-labelledby="titleId" class="min-w-0 overflow-hidden rounded-xl border border-slate-green/17 bg-white">
      <header class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-green/17 px-5 py-5 sm:px-6">
        <h2 :id="titleId" class="text-base font-bold text-ink">Source files</h2>
        <p class="rounded-md bg-lavender-mist px-3 py-1.5 text-xs font-semibold text-slate-green">
          {{ files.length }} {{ files.length === 1 ? 'file' : 'files' }}
        </p>
      </header>
      <div
        v-if="files.length"
        tabindex="0"
        role="region"
        aria-label="Audit source files; scroll horizontally to see all columns"
        class="overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-forest-green"
      >
        <table :aria-labelledby="titleId" class="w-full min-w-[850px] border-collapse text-left text-sm">
          <thead class="bg-charcoal-blue text-[10px] tracking-wide text-lavender-mist uppercase">
            <tr>
              <th scope="col" class="px-5 py-3.5 font-semibold sm:pl-6">Filename</th>
              <th scope="col" class="px-4 py-3.5 font-semibold">Audit type</th>
              <th scope="col" class="px-4 py-3.5 font-semibold">Date coverage</th>
              <th scope="col" class="px-4 py-3.5 text-right font-semibold">Records</th>
              <th scope="col" class="px-4 py-3.5 font-semibold">Uploaded</th>
              <th scope="col" class="px-5 py-3.5 text-right font-semibold sm:pr-6">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-green/17">
            <tr v-for="file in files" :key="file.id" class="hover:bg-lavender-mist/40">
              <th scope="row" class="px-5 py-5 font-semibold sm:pl-6">
                <div class="flex items-center gap-3">
                  <SvgIcon name="auditList" class="size-5 text-slate-green" />
                  <span class="max-w-64 break-words text-xs leading-relaxed">{{ file.name }}</span>
                </div>
              </th>
              <td class="px-4 py-5">
                <span
                  class="inline-block rounded-md px-2 py-1.5 text-xs font-semibold whitespace-nowrap"
                  :class="file.auditType === 'meal' ? 'bg-copper-soft text-burnt-copper' : 'bg-soft-sage text-deep-pine'"
                >
                  {{ file.auditType === 'meal' ? 'Meal-period' : 'Location' }}
                </span>
              </td>
              <td class="px-4 py-5 text-xs leading-relaxed whitespace-nowrap text-slate-green">
                <time :datetime="file.coverageStart">{{ formatDate(file.coverageStart) }}</time>
                <span class="block">to <time :datetime="file.coverageEnd">{{ formatDate(file.coverageEnd) }}</time></span>
              </td>
              <td class="px-4 py-5 text-right text-xs text-slate-green tabular-nums">{{ integer.format(file.records) }}</td>
              <td class="px-4 py-5 text-xs whitespace-nowrap text-slate-green">
                <time :datetime="file.uploadedAt">{{ formatDate(file.uploadedAt) }}</time>
              </td>
              <td class="px-5 py-5 text-right sm:pr-6">
                <button
                  type="button"
                  :aria-label="`Delete ${file.name}`"
                  aria-haspopup="dialog"
                  class="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border border-red-700/20 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
                  @click="requestDelete(file)"
                >
                  <SvgIcon name="trash" class="size-4" />
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="px-6 py-16 text-center">
        <SvgIcon name="auditList" class="mb-4 size-10 text-slate-green" />
        <h3 class="text-lg font-semibold text-deep-pine">No source files</h3>
        <p class="mt-2 text-sm text-slate-green">All demo files have been removed. Refresh to restore the samples.</p>
      </div>
    </section>
  </main>

  <Teleport to="body">
    <dialog
      ref="deleteDialog"
      :aria-labelledby="deleteTitleId"
      :aria-describedby="deleteDescriptionId"
      class="m-auto max-h-[calc(100svh_-_2rem)] w-[calc(100%_-_2rem)] max-w-md overflow-y-auto rounded-2xl border border-slate-green/20 bg-white p-6 font-sans text-ink shadow-2xl backdrop:bg-deep-pine/50 backdrop:backdrop-blur-sm sm:p-8"
      @close="pendingFile = null"
    >
      <span class="mb-4 inline-flex size-12 items-center justify-center rounded-full bg-red-50 text-red-700">
        <SvgIcon name="trash" class="size-6" />
      </span>
      <h2 :id="deleteTitleId" class="text-xl font-bold text-deep-pine">Delete source file?</h2>
      <p :id="deleteDescriptionId" class="mt-3 text-sm leading-relaxed text-slate-green">
        Remove <strong class="break-words text-ink">{{ pendingFile?.name }}</strong> from the audit list?
        The dashboard's demo figures will stay the same.
      </p>
      <div class="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          autofocus
          class="min-h-11 cursor-pointer rounded-lg border border-slate-green/25 px-4 py-2.5 text-sm font-semibold text-ink hover:bg-lavender-mist focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-green"
          @click="cancelDelete"
        >
          Cancel
        </button>
        <button
          type="button"
          class="min-h-11 cursor-pointer rounded-lg bg-red-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
          @click="confirmDelete"
        >
          Delete file
        </button>
      </div>
    </dialog>
  </Teleport>
</template>
