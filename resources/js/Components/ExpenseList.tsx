import { Expense } from '@/types/expense'
import { BudgetType } from '@/types/budget'
import { formatCurrency, formatDate } from '@/utils'
import ExpenseDropdown from '@/Components/ExpenseDropdown'

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
                                <p className="font-semibold text-sm mt-0.5 mb-1.5">{expense.name}</p>

                                {budgetType === 'general' && expense.category_label && (
                                    <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full ${expense.category_color}`}>
                                        {expense.category_label}
                                    </span>
                                )}
                            </div>

                            <div className='flex items-center gap-3'>
                                <p className="font-bold text-gray-900 text-sm">
                                    {formatCurrency(Number(expense.amount))}
                                </p>

                                <ExpenseDropdown expense={expense} />
                            </div>
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
