import { Expense, CategoryValue } from '@/types/expense'
import { BudgetType } from '@/types/budget'
import { formatCurrency, formatDate } from '@/utils'
import { getCategoryBreakdown } from '@/utils/expense'
import ExpenseDropdown from '@/Components/ExpenseDropdown'
import CategoryBreakdown from '@/Components/CategoryBreakdown'
import { useMemo, useState } from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { ChevronDownIcon } from '@animateicons/react/lucide'

type Props = {
    expenses: Expense[]
    budgetType: BudgetType
}

const VISIBLE_LIMIT = 5
const BREAKDOWN_STORAGE_KEY = 'moneo:category-breakdown-open'

function readBreakdownOpen(): boolean {
    try {
        return localStorage.getItem(BREAKDOWN_STORAGE_KEY) !== 'false'
    } catch {
        return true
    }
}

function saveBreakdownOpen(open: boolean) {
    try {
        localStorage.setItem(BREAKDOWN_STORAGE_KEY, String(open))
    } catch {
        // Sin almacenamiento disponible (modo privado): simplemente no se recuerda
    }
}

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
                <Disclosure as="div" className="mb-8" defaultOpen={readBreakdownOpen()}>
                    {({open}) => (
                        <>
                            <DisclosureButton
                                onClick={() => saveBreakdownOpen(!open)}
                                className="group mb-3 flex w-full items-center gap-2 text-left focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded"
                            >
                                <span className="text-xs font-bold text-muted uppercase tracking-wide">En qué gastas</span>

                                {!open && (
                                    <span className="text-xs text-muted">
                                        · {breakdown[0].label} {breakdown[0].percentage} %
                                    </span>
                                )}

                                <span className="ml-auto transition-transform duration-200 group-data-open:rotate-180 motion-reduce:transition-none">
                                    <ChevronDownIcon size={16} isAnimated={false} color="var(--color-accent-dark)" />
                                </span>
                            </DisclosureButton>

                            <DisclosurePanel
                                transition
                                className="origin-top transition duration-200 ease-out data-closed:-translate-y-1 data-closed:opacity-0 motion-reduce:transition-none"
                            >
                                <CategoryBreakdown
                                    items={breakdown}
                                    selected={activeItem?.category ?? null}
                                    onSelect={handleSelect}
                                />
                            </DisclosurePanel>
                        </>
                    )}
                </Disclosure>
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
