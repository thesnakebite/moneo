import { Head, usePage, Link } from "@inertiajs/react"
import ExpenseModal from "@/Components/ExpenseModal"
import { useExpenseModalStore } from "@/stores/expense-modal-store"
import { Budget } from "@/types/budget"
import { Category } from "@/types/category"
import { formatCurrency, formatDate } from "@/utils"
import { toast, Toaster } from "sonner"
import { useEffect, useState } from "react"
import ExpenseList from "@/Components/ExpenseList"
import ProgressBar from "@/Components/ProgressBar"
import DeleteExpenseModal from "@/Components/DeleteExpenseModal"
import MoneoAgent from "@/Components/MoneoAgent"
import { ArrowRightIcon, CalendarRangeIcon, PiggyBankIcon } from "@animateicons/react/lucide"
import { getBudgetStatusColor, getBudgetStatusTextColor } from "@/utils/budget"

type Props = {
    budget: Budget
    categories: Category[]
    spent: string
}

export default function Show({budget, categories, spent} : Props) {
    const { flash, user } = usePage().props

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success)
        }
    }, [flash.success])

    const remaining = Number(budget.amount) - Number(spent)
    const percentageUsed = Math.round((Number(spent) / Number(budget.amount)) * 100)
    const isOverBudget = percentageUsed >= 100

    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setProgress(percentageUsed)
        }, 200);

        return () => clearTimeout(timeout)
    }, [percentageUsed])

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
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                    {isOverBudget ? 'Te has excedido' : 'Te queda'}
                                </p>
                                <p className={`text-3xl font-bold mt-0.5 ${isOverBudget ? 'text-red-700' : 'text-ink'}`}>
                                    {formatCurrency(Math.abs(remaining))}
                                </p>
                                <p className="text-xs text-gray-500 mt-2">
                                    {formatCurrency(Number(spent))} gastados de {formatCurrency(Number(budget.amount))}
                                </p>
                            </div>
                        </div>
                    </div>

                    {(budget.starts_at || budget.ends_at) && (
                        <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-border-soft/60 bg-ink/5">
                            <CalendarRangeIcon size={16} duration={0} color="var(--color-accent)"/>
                            {budget.starts_at && !budget.ends_at && (
                                <span className="text-xs text-muted">Desde {formatDate(budget.starts_at)}</span>
                            )}
                            {budget.ends_at && !budget.starts_at && (
                                <span className="text-xs text-muted">Hasta {formatDate(budget.ends_at)}</span>
                            )}
                            {budget.starts_at && budget.ends_at && (
                                <>
                                    <span className="text-xs text-muted">{formatDate(budget.starts_at)}</span>
                                    <ArrowRightIcon className="size-3 text-border-soft" />
                                    <span className="text-xs text-muted">{formatDate(budget.ends_at)}</span>
                                </>
                            )}
                        </div>
                    )}

                    <div className="flex flex-col gap-1">
                        <ExpenseModal />
                        <DeleteExpenseModal />
                        <Toaster position="bottom-center" />

                        <a
                            href="/dashboard"
                            className="inline-block bg-accent text-white hover:bg-accent-dark text-center px-4 py-2.5 rounded-lg text-sm font-bold transition-colors"
                        >
                            Volver al dashboard
                        </a>
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
