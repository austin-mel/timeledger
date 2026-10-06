export interface AuditSourceFile {
  id: string
  name: string
  auditType: 'meal' | 'location'
  coverageStart: string
  coverageEnd: string
  uploadedAt: string
  records: number
}

export const seededAuditFiles: readonly AuditSourceFile[] = [
  {
    id: 'meal-june',
    name: 'meal-periods_jun-2026.csv',
    auditType: 'meal',
    coverageStart: '2026-06-01',
    coverageEnd: '2026-06-23',
    uploadedAt: '2026-06-24',
    records: 318,
  },
  {
    id: 'location-june',
    name: 'location-punches_jun-2026.xlsx',
    auditType: 'location',
    coverageStart: '2026-06-01',
    coverageEnd: '2026-06-23',
    uploadedAt: '2026-06-24',
    records: 642,
  },
  {
    id: 'meal-may',
    name: 'meal-periods_may-2026.csv',
    auditType: 'meal',
    coverageStart: '2026-05-01',
    coverageEnd: '2026-05-31',
    uploadedAt: '2026-06-02',
    records: 426,
  },
  {
    id: 'location-may',
    name: 'location-punches_may-2026.csv',
    auditType: 'location',
    coverageStart: '2026-05-25',
    coverageEnd: '2026-05-31',
    uploadedAt: '2026-06-02',
    records: 187,
  },
  {
    id: 'meal-march-april',
    name: 'meal-periods_mar-apr-2026.xlsx',
    auditType: 'meal',
    coverageStart: '2026-03-01',
    coverageEnd: '2026-04-30',
    uploadedAt: '2026-05-02',
    records: 854,
  },
  {
    id: 'meal-december-february',
    name: 'meal-periods_dec-2025_feb-2026.csv',
    auditType: 'meal',
    coverageStart: '2025-12-26',
    coverageEnd: '2026-02-28',
    uploadedAt: '2026-03-02',
    records: 912,
  },
]
