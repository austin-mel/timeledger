import { computed, ref } from 'vue'
import { demoProfiles } from '../data/demoProfiles'

const storageKey = 'timeledger.demo-profile'

function readProfileId(): string | null {
  try {
    const id = window.sessionStorage.getItem(storageKey)
    return demoProfiles.some((profile) => profile.id === id) ? id : null
  } catch {
    return null
  }
}

const profileId = ref(readProfileId())
const currentProfile = computed(() => demoProfiles.find((profile) => profile.id === profileId.value) ?? null)
const isAdmin = computed(() => currentProfile.value?.role === 'admin')

function saveProfileId(id: string | null) {
  profileId.value = id
  try {
    if (id) window.sessionStorage.setItem(storageKey, id)
    else window.sessionStorage.removeItem(storageKey)
  } catch {
    // The demo also works in memory when browser storage is unavailable.
  }
}

function login(email: string, password: string): boolean {
  const profile = demoProfiles.find((candidate) =>
    candidate.email === email.trim().toLowerCase() && candidate.password === password,
  )
  if (!profile) return false
  saveProfileId(profile.id)
  return true
}

function logout() {
  saveProfileId(null)
}

export function useDemoSession() {
  return { currentProfile, isAdmin, login, logout }
}
