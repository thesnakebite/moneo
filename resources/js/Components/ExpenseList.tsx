import { Expense } from '@/types/expense'
import { BudgetType } from '@/types/budget'
import { formatCurrency, formatDate } from '@/utils'

type Props = {
    expenses: Expense[]
    budgetType: BudgetType
}

export default function ExpenseList({ expenses, budgetType }: Props) {
    const recent = expenses.slice(0, 5)

    return (
        <div className="border-t border-gray-200 pt-6">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
                Últimos gastos
            </p>

            {recent.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-6">
                    Aún no has registrado ningún gasto.
                </p>
            ) : (
                <ul className="divide-y divide-gray-100">
                    {recent.map((expense) => (
                        <li key={expense.id} className="flex items-start justify-between py-3">
                            <div>
                                <p className="text-xs text-gray-400">{formatDate(expense.created_at)}</p>

                                <p className="font-semibold text-gray-900 text-sm mt-0.5">{expense.name}</p>
                                {budgetType === 'general' && expense.category && (
                                    <p className="text-xs text-gray-500 mt-0.5">{expense.category}</p>
                                )}
                            </div>
                            <p className="font-bold text-gray-900 text-sm">
                                {formatCurrency(Number(expense.amount))}
                            </p>
                        </li>
                    ))}
                </ul>
            )}

            {expenses.length > 5 && (
                <button type="button" className="mt-3 text-xs font-bold text-gray-500 hover:text-gray-900">
                    Ver todos los gastos ({expenses.length})
                </button>
            )}
        </div>
    )
}
