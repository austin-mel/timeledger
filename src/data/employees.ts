export interface StudyCosts {
  hourlyRate: number
  observedCost: number
  annualizedCost: number
}

export interface LocationStudyCosts extends StudyCosts {
  estimatedMinutes: number
}

export interface Employee {
  name: string
  mealExceptions: number
  locationExceptions: number
  locationMiles: number
  annualizedCost: number
  meal: StudyCosts | null
  location: LocationStudyCosts | null
}

// Fictional examples, fixed so the table matches the dashboard's sample totals.
const employeeSummaries = [
  {
    name: 'Avery Irving',
    mealExceptions: 1,
    locationExceptions: 5,
    locationMiles: 27.91,
    annualizedCost: 493.39,
    mealAnnualizedCost: 61.19,
  },
  {
    name: 'Blake Lawson',
    mealExceptions: 2,
    locationExceptions: 10,
    locationMiles: 45.97,
    annualizedCost: 836.91,
    mealAnnualizedCost: 125.04,
  },
  {
    name: 'Cameron Vaughn',
    mealExceptions: 2,
    locationExceptions: 5,
    locationMiles: 29.01,
    annualizedCost: 570.28,
    mealAnnualizedCost: 121.05,
  },
  {
    name: 'Casey Whitaker',
    mealExceptions: 2,
    locationExceptions: 10,
    locationMiles: 47.62,
    annualizedCost: 875.77,
    mealAnnualizedCost: 138.35,
  },
  {
    name: 'Dakota Winslow',
    mealExceptions: 0,
    locationExceptions: 5,
    locationMiles: 28.19,
    annualizedCost: 436.53,
    mealAnnualizedCost: 0.00,
  },
  {
    name: 'Drew Reed',
    mealExceptions: 1,
    locationExceptions: 8,
    locationMiles: 52.10,
    annualizedCost: 868.65,
    mealAnnualizedCost: 61.86,
  },
  {
    name: 'Ellis Jensen',
    mealExceptions: 1,
    locationExceptions: 9,
    locationMiles: 52.21,
    annualizedCost: 874.35,
    mealAnnualizedCost: 65.85,
  },
  {
    name: 'Emerson Nolan',
    mealExceptions: 0,
    locationExceptions: 6,
    locationMiles: 36.12,
    annualizedCost: 559.33,
    mealAnnualizedCost: 0.00,
  },
  {
    name: 'Finley Dalton',
    mealExceptions: 1,
    locationExceptions: 6,
    locationMiles: 37.76,
    annualizedCost: 648.58,
    mealAnnualizedCost: 63.85,
  },
  {
    name: 'Harper Mercer',
    mealExceptions: 2,
    locationExceptions: 4,
    locationMiles: 19.92,
    annualizedCost: 442.82,
    mealAnnualizedCost: 134.35,
  },
  {
    name: 'Hayden Callahan',
    mealExceptions: 1,
    locationExceptions: 6,
    locationMiles: 28.90,
    annualizedCost: 518.03,
    mealAnnualizedCost: 70.50,
  },
  {
    name: 'Jordan Ellison',
    mealExceptions: 2,
    locationExceptions: 7,
    locationMiles: 41.76,
    annualizedCost: 773.04,
    mealAnnualizedCost: 126.37,
  },
  {
    name: 'Morgan Hawthorne',
    mealExceptions: 3,
    locationExceptions: 6,
    locationMiles: 37.11,
    annualizedCost: 784.17,
    mealAnnualizedCost: 209.51,
  },
  {
    name: 'Parker Bennett',
    mealExceptions: 0,
    locationExceptions: 7,
    locationMiles: 45.21,
    annualizedCost: 700.10,
    mealAnnualizedCost: 0.00,
  },
  {
    name: 'Quinn Kendall',
    mealExceptions: 0,
    locationExceptions: 7,
    locationMiles: 32.57,
    annualizedCost: 504.36,
    mealAnnualizedCost: 0.00,
  },
  {
    name: 'Reese Turner',
    mealExceptions: 1,
    locationExceptions: 4,
    locationMiles: 20.14,
    annualizedCost: 384.38,
    mealAnnualizedCost: 72.50,
  },
  {
    name: 'Riley Sullivan',
    mealExceptions: 0,
    locationExceptions: 6,
    locationMiles: 33.50,
    annualizedCost: 518.76,
    mealAnnualizedCost: 0.00,
  },
  {
    name: 'Rowan Walker',
    mealExceptions: 1,
    locationExceptions: 9,
    locationMiles: 42.36,
    annualizedCost: 725.13,
    mealAnnualizedCost: 69.17,
  },
  {
    name: 'Sage Griffin',
    mealExceptions: 1,
    locationExceptions: 7,
    locationMiles: 45.21,
    annualizedCost: 764.62,
    mealAnnualizedCost: 64.52,
  },
  {
    name: 'Skyler Palmer',
    mealExceptions: 2,
    locationExceptions: 7,
    locationMiles: 32.56,
    annualizedCost: 645.22,
    mealAnnualizedCost: 141.01,
  },
  {
    name: 'Taylor Foster',
    mealExceptions: 3,
    locationExceptions: 4,
    locationMiles: 19.48,
    annualizedCost: 503.19,
    mealAnnualizedCost: 201.53,
  },
] as const

// Backfill fictional study costs and rates from the existing annualized totals.
// Keep intermediate precision; currency is rounded only when displayed.
export const employees: Employee[] = employeeSummaries.map(({ mealAnnualizedCost, ...summary }) => {
  const mealObservedCost = mealAnnualizedCost * 180 / 365
  const locationAnnualizedCost = (
    Math.round(summary.annualizedCost * 100) - Math.round(mealAnnualizedCost * 100)
  ) / 100
  const locationObservedCost = locationAnnualizedCost / 12
  const estimatedMinutes = Math.round(summary.locationMiles / 25 * 60)

  return {
    ...summary,
    meal: summary.mealExceptions > 0 ? {
      hourlyRate: mealObservedCost / summary.mealExceptions,
      observedCost: mealObservedCost,
      annualizedCost: mealAnnualizedCost,
    } : null,
    location: summary.locationExceptions > 0 ? {
      hourlyRate: locationObservedCost * 60 / estimatedMinutes,
      observedCost: locationObservedCost,
      annualizedCost: locationAnnualizedCost,
      estimatedMinutes,
    } : null,
  }
})
