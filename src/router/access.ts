import type { DemoRole } from '../data/demoProfiles'

interface RouteAccess {
  requiresAuth?: boolean
  adminOnly?: boolean
}

// Client-side demo navigation only; production authorization belongs on the server.
export function getAccessRedirect(name: unknown, meta: RouteAccess, role: DemoRole | undefined) {
  if ((meta.requiresAuth || meta.adminOnly) && !role) return { name: 'login' }
  if (meta.adminOnly && role !== 'admin') return { name: 'dashboard' }
  if (name === 'login' && role) return { name: 'dashboard' }
  return undefined
}
