import { Expense, CategoryValue } from '@/types/expense'
import { BudgetType } from '@/types/budget'
import { formatCurrency, formatDate } from '@/utils'
import { getCategoryBreakdown } from '@/utils/expense'
import ExpenseDropdown from '@/Components/ExpenseDropdown'
import CategoryBreakdown from '@/Components/CategoryBreakdown'
import { useMemo, useState } from 'react'

type Props = {
    expenses: Expense[]
    budgetType: BudgetType
}

const VISIBLE_LIMIT = 5

export default function ExpenseList({ expenses, budgetType }: Props) {
    const [showAll, setShowAll] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<CategoryValue | null>(null)

    const breakdown = useMemo(() => getCategoryBreakdown(expenses), [expenses])
    const showBreakdown = budgetType === 'general' && breakdown.length >= 2

    // Si se borra el último gasto de la categoría activa, el filtro deja de aplicarse solo
    const activeItem = showBreakdown
        ? breakdown.find((item) => item.category === selectedCategory) ?? null
        : null

    const filteredExpenses = activeItem
        ? expenses.filter((expense) => (expense.category ?? 'other') === activeItem.category)
        : expenses

    const visibleExpenses = showAll ? filteredExpenses : filteredExpenses.slice(0, VISIBLE_LIMIT)

    const handleSelect = (category: CategoryValue | null) => {
        setSelectedCategory(category)
        setShowAll(false)
    }

    return (
        <div className="border-t border-border-soft pt-6">
            {showBreakdown && (
                <div className="mb-8">
                    <p className="text-xs font-bold text-muted uppercase tracking-wide mb-3">
                        En qué gastas
                    </p>
                    <CategoryBreakdown
                        items={breakdown}
                        selected={activeItem?.category ?? null}
                        onSelect={handleSelect}
                    />
                </div>
            )}

            <div className="flex items-baseline justify-between gap-3 mb-3">
                <p className="text-xs font-bold text-muted uppercase tracking-wide" aria-live="polite">
                    {activeItem ? `Gastos en ${activeItem.label}` : 'Últimos gastos'}
                </p>

                {activeItem && (
                    <button
                        type="button"
                        onClick={() => handleSelect(null)}
                        className="text-xs font-bold text-accent hover:text-accent-dark"
                    >
                        Quitar filtro
                    </button>
                )}
            </div>

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

                                {budgetType === 'general' && !activeItem && expense.category_label && (
                                    <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full ${expense.category_color}`}>
                                        {expense.category_label}
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center gap-3">
                                <p className="font-bold text-ink text-sm">
                                    {formatCurrency(Number(expense.amount))}
                                </p>

                                <ExpenseDropdown expense={expense} />
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {filteredExpenses.length > VISIBLE_LIMIT && (
                <button
                    type="button"
                    onClick={() => setShowAll(!showAll)}
                    className="mt-3 text-xs font-bold text-accent hover:text-accent-dark"
                >
                    {showAll
                        ? 'Ver menos'
                        : activeItem
                            ? `Ver todos los gastos en ${activeItem.label} (${filteredExpenses.length})`
                            : `Ver todos los gastos (${expenses.length})`}
                </button>
            )}
        </div>
    )
}
