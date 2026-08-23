import { Expense } from '@/types/expense'
import { BudgetType } from '@/types/budget'
import { formatCurrency, formatDate } from '@/utils'
import ExpenseDropdown from '@/Components/ExpenseDropdown'
import { useState } from 'react'

type Props = {
    expenses: Expense[]
    budgetType: BudgetType
}

export default function ExpenseList({ expenses, budgetType }: Props) {
    const [showAll, setShowAll] = useState(false)
    const visibleExpenses = showAll ? expenses : expenses.slice(0, 5)

    return (
        <div className="border-t border-border-soft pt-6">
            <p className="text-xs font-bold text-muted uppercase tracking-wide mb-3">
                Últimos gastos
            </p>

            {visibleExpenses.length === 0 ? (
                <p className="text-sm text-muted text-center py-6">
                    Aún no has registrado ningún gasto.
                </p>
            ) : (
                <ul className="divide-y divide-border-soft/40">
                    {visibleExpenses.map((expense) => (
                        <li key={expense.id} className="flex items-start justify-between py-3">
                            <div>
                                <p className="text-xs text-muted/70">{formatDate(expense.created_at)}</p>
                                <p className="font-semibold text-sm mt-0.5 mb-1.5 text-ink">{expense.name}</p>

                                {budgetType === 'general' && expense.category_label && (
                                    <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full ${expense.category_color}`}>
                                        {expense.category_label}
                                    </span>
                                )}
                            </div>

                            <div className='flex items-center gap-3'>
                                <p className="font-bold text-ink text-sm">
                                    {formatCurrency(Number(expense.amount))}
                                </p>

                                <ExpenseDropdown expense={expense} />
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {expenses.length > 5 && (
                <button
                    type="button"
                    onClick={() => setShowAll(!showAll)}
                    className="mt-3 text-xs font-bold text-accent hover:text-accent-dark"
                >
                    {showAll ? 'Ver menos' : `Ver todos los gastos (${expenses.length})`}
                </button>
            )}
        </div>
    )
}
