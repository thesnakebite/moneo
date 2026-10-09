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
