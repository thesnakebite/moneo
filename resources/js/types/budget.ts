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
    deleted_at: string | null
    expenses: Expense[]
}

export type DashboardBudget = Omit<Budget, 'expenses'> & {
    expenses_sum_amount: string | null
}
