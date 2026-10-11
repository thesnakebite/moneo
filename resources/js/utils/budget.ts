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
