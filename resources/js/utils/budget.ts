import { BudgetType } from "@/types/budget"

export function getBudgetStatusColor(percentageUsed: number): string {
    if (percentageUsed >= 100) return 'var(--color-red-600)'
    if (percentageUsed >= 90) return 'var(--color-orange-600)'
    if (percentageUsed >= 70) return 'var(--color-amber-600)'

    return 'var(--color-accent)'
}

type Surface = 'light' | 'dark'

export function getBudgetStatusTextColor(percentageUsed: number, surface: Surface): string {
    if (percentageUsed >= 100) return surface === 'dark' ? 'var(--color-red-400)' : 'var(--color-red-700)'
    if (percentageUsed >= 90) return surface === 'dark' ? 'var(--color-orange-400)' : 'var(--color-orange-700)'
    if (percentageUsed >= 70) return surface === 'dark' ? 'var(--color-amber-400)' : 'var(--color-amber-700)'

    return surface === 'dark' ? 'var(--color-surface)' : 'var(--color-ink)'
}

export const TRASH_RETENTION_DAYS = 30

export function getDaysUntilPurge(deletedAt: string): number {
    const dayInMs = 1000 * 60 * 60 * 24
    const purgeAt = new Date(deletedAt).getTime() + TRASH_RETENTION_DAYS * dayInMs

    return Math.max(0, Math.ceil((purgeAt - Date.now()) / dayInMs))
}

export type SpendingPace =
    | { status: 'upcoming'; daysUntilStart: number }
    | { status: 'on-track'; daysLeft: number; dailyAllowance: number; remaining: number }
    | { status: 'exceeded'; daysLeft: number }
    | { status: 'finished' }

const DAY_IN_MS = 1000 * 60 * 60 * 24

// Usa solo YYYY-MM-DD y construye la fecha en hora local
// para que la zona horaria no mueva el día.
function toLocalDate(value: string): Date {
    const [year, month, day] = value.slice(0, 10).split('-').map(Number)
    return new Date(year, month - 1, day)
}

function daysBetween(from: Date, to: Date): number {
    return Math.round((to.getTime() - from.getTime()) / DAY_IN_MS)
}

export type BudgetPeriod =
    | { status: 'upcoming'; daysUntilStart: number }
    | { status: 'active'; currentDay: number; totalDays: number; daysLeft: number; elapsedPercentage: number }
    | { status: 'finished' }

export function getBudgetPeriod(startsAt: string | null, endsAt: string | null): BudgetPeriod | null {
    if (!startsAt || !endsAt) return null

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const start = toLocalDate(startsAt)
    const end = toLocalDate(endsAt)

    if (today < start) return { status: 'upcoming', daysUntilStart: daysBetween(today, start) }
    if (today > end) return { status: 'finished' }

    // Inicio y fin cuentan los dos, igual que el scope active() (ends_at >= today)
    const totalDays = daysBetween(start, end) + 1
    const currentDay = daysBetween(start, today) + 1
    const daysLeft = totalDays - currentDay + 1

    return {
        status: 'active',
        currentDay,
        totalDays,
        daysLeft,
        elapsedPercentage: Math.round((currentDay / totalDays) * 100),
    }
}

export type BudgetStatus = 'upcoming' | 'active' | 'finished'

export function getBudgetStatus(startsAt: string | null, endsAt: string | null): BudgetStatus {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (endsAt && toLocalDate(endsAt) < today) return 'finished'
    if (startsAt && toLocalDate(startsAt) > today) return 'upcoming'

    return 'active'
}

// Mantener sincronizado con BudgetType::label() en App\Enums\BudgetType
export const BUDGET_TYPE_LABELS: Record<BudgetType, string> = {
    general: 'General',
    goal: 'Proyecto',
}
