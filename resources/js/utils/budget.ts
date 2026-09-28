export function getBudgetStatusColor(percentageUsed: number): string {
    if (percentageUsed >= 100) return 'var(--color-red-600)'
    if (percentageUsed >= 90) return 'var(--color-orange-600)'
    if (percentageUsed >= 70) return 'var(--color-amber-600)'

    return 'var(--color-accent)'
}
