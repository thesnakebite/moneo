import type { Expense } from '@/types/expense'

export type CategoryBreakdownItem = {
    category: string
    label: string
    total: number
    count: number
    percentage: number
}

export function getCategoryBreakdown(expenses: Expense[]): CategoryBreakdownItem[] {
    const groups = new Map<string, CategoryBreakdownItem>()

    for (const expense of expenses) {
        const category = expense.category ?? 'other'
        const group = groups.get(category) ?? {
            category,
            label: expense.category_label ?? 'Otros',
            total: 0,
            count: 0,
            percentage: 0,
        }

        group.total += Number(expense.amount)
        group.count += 1
        groups.set(category, group)
    }

    const items = [...groups.values()]
    const spent = items.reduce((sum, item) => sum + item.total, 0)

    return items
        .map((item) => ({
            ...item,
            percentage: spent > 0 ? Math.round((item.total / spent) * 100) : 0,
        }))
        .sort((a, b) => b.total - a.total)
}
