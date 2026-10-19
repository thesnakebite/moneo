import { Head, usePage, Link } from "@inertiajs/react"
import ExpenseModal from "@/Components/ExpenseModal"
import { useExpenseModalStore } from "@/stores/expense-modal-store"
import { Budget } from "@/types/budget"
import { Category } from "@/types/category"
import { formatCurrency, formatDate } from "@/utils"
import { Toaster } from "sonner"
import { useEffect } from "react"
import ExpenseList from "@/Components/ExpenseList"
import ProgressBar from "@/Components/ProgressBar"
import DeleteExpenseModal from "@/Components/DeleteExpenseModal"
import MoneoAgent from "@/Components/MoneoAgent"
import { CalendarRangeIcon, PiggyBankIcon } from "@animateicons/react/lucide"
import { getBudgetPeriod, getBudgetStatusColor, getBudgetStatusTextColor } from "@/utils/budget"
import { useFlashToasts } from "@/hooks/useFlashToasts"
import BudgetTimeline from "@/Components/BudgetTimeline"

type Props = {
    budget: Budget
    categories: Category[]
    spent: string
}

export default function Show({budget, categories, spent} : Props) {
    const { user } = usePage().props

    useFlashToasts()

    const remaining = Number(budget.amount) - Number(spent)
    const percentageUsed = Math.round((Number(spent) / Number(budget.amount)) * 100)
    const isOverBudget = percentageUsed >= 100
    const period = getBudgetPeriod(budget.starts_at, budget.ends_at)
    const dailyAllowance = period?.status === 'active' && remaining > 0 ? remaining / period.daysLeft : null

    useEffect(() => {
        useExpenseModalStore.getState().setBudget(budget)
        useExpenseModalStore.getState().setCategories(categories)
    }, [budget, categories])

    return (
        <>
            <Head title={`Presupuesto: ${budget.name}`} />

            <div
                className="pointer-events-none fixed bottom-6 -right-72 sm:bottom-10 sm:-right-52 md:-right-44 lg:bottom-14 lg:-right-36 xl:-right-28 -z-10 rotate-[-26deg] opacity-[0.04] scale-50 sm:scale-75 md:scale-[0.85] lg:scale-90 xl:scale-100"
                aria-hidden="true"
            >
                <PiggyBankIcon size={920} duration={0} color="var(--color-ink)" />
            </div>

            <div className="px-3 sm:px-6 mt-16">
                <div className="max-w-2xl mx-auto py-8 sm:py-10 space-y-8">
                    <h1 className="text-muted text-2xl font-bold">Presupuesto: {budget.name}</h1>

                    <div className="flex items-center gap-8">
                        <div className="w-28 shrink-0">
                            <ProgressBar
                                percentageUsed={percentageUsed}
                                pathColor={getBudgetStatusColor(percentageUsed)}
                                textColor={getBudgetStatusTextColor(percentageUsed, 'light')}
                            />
                        </div>

                        <div>
                            <div>
                                <p className="text-xs font-semibold text-muted uppercase tracking-wide">
                                    {isOverBudget ? 'Te has excedido' : 'Te queda'}
                                </p>
                                <p className={`text-3xl font-bold mt-0.5 ${isOverBudget ? 'text-red-700' : 'text-ink'}`}>
                                    {formatCurrency(Math.abs(remaining))}
                                </p>
                                <p className="text-xs text-muted mt-2">
                                    {formatCurrency(Number(spent))} gastados de <span className="text-accent-dark font-semibold">{formatCurrency(Number(budget.amount))}</span>
                                </p>
                                {dailyAllowance !==null && period?.status === 'active' && (
                                    <p className="text-xs text-muted mt-0.5">
                                        <span className="font-semibold text-ink">{formatCurrency(dailyAllowance)}</span>
                                        {period.daysLeft === 1 ? ' para hoy, último día' : ` al día durante ${period.daysLeft} días`}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {period && budget.starts_at && budget.ends_at ? (
                        <BudgetTimeline startsAt={budget.starts_at} endsAt={budget.ends_at} period={period} />
                    ) : (budget.starts_at || budget.ends_at) && (
                        <p className="inline-flex items-center gap-2 text-xs text-muted">
                            <CalendarRangeIcon size={16} duration={0} color="var(--color-accent)" />
                            {budget.starts_at ? `Desde ${formatDate(budget.starts_at)}` : `Hasta ${formatDate(budget.ends_at!)}`}
                        </p>
                    )}

                    <div className="flex flex-col gap-1">
                        <ExpenseModal />
                        <DeleteExpenseModal />
                        <Toaster position="bottom-center" />

                        <Link
                            href="/dashboard"
                            className="inline-block bg-accent text-white hover:bg-accent-dark text-center px-4 py-2.5 rounded-lg text-sm font-bold transition-colors"
                        >
                            Volver al dashboard
                        </Link>
                    </div>

                    <ExpenseList expenses={budget.expenses} budgetType={budget.type} />
                    {user?.subscribed ? (
                        <MoneoAgent budgetId={budget.id} userName={user?.user?.name ?? 'Tú'} />
                    ) : (
                        <div className="mt-10 rounded-2xl border border-border-soft p-6 text-center">
                            <p className="text-sm text-muted">
                                El asistente de IA es una función exclusiva para suscriptores.
                            </p>
                            <Link href="/billing" className="mt-3 inline-block bg-accent hover:bg-accent-dark text-white px-4 py-2.5 rounded-lg text-sm font-bold transition-colors">
                                Ver planes
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
