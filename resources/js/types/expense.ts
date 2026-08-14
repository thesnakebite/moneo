export type CategoryValue =
    | 'food'
    | 'transport'
    | 'housing'
    | 'leisure'
    | 'health'
    | 'shopping'
    | 'other';

export type Expense = {
    id: number
    name: string
    amount: string
    created_at: string
    category: CategoryValue | null
}
