import { readonly, ref } from 'vue'
import { seededAuditFiles, type AuditSourceFile } from '../data/auditFiles'
import { useDemoSession } from './useDemoSession'

// Share removals across page navigation; a reload restores the fictional files.
const files = ref<AuditSourceFile[]>(seededAuditFiles.map((file) => ({ ...file })))
const { isAdmin } = useDemoSession()

function removeFile(id: string): boolean {
  if (!isAdmin.value || !files.value.some((file) => file.id === id)) return false
  files.value = files.value.filter((file) => file.id !== id)
  return true
}

export function useAuditFiles() {
  return { files: readonly(files), removeFile }
}
