export type DemoRole = 'user' | 'admin'

export interface DemoProfile {
  id: string
  name: string
  email: string
  password: string
  role: DemoRole
}

// Public, fictional credentials for the local proof of concept only.
export const demoProfiles: readonly DemoProfile[] = [
  {
    id: 'demo-user',
    name: 'Alex Morgan',
    email: 'user@timeledger.demo',
    password: 'demo123',
    role: 'user',
  },
  {
    id: 'demo-admin',
    name: 'Jordan Ellis',
    email: 'admin@timeledger.demo',
    password: 'demo123',
    role: 'admin',
  },
]
