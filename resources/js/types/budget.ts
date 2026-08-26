import { Expense } from "./expense"

export type BudgetType = 'general' | 'goal'

export type Budget = {
    id: number
    name: string
    amount: string
    type: BudgetType
    starts_at: string | null
    ends_at: string | null
    created_at: string
    expenses: Expense[]
}
