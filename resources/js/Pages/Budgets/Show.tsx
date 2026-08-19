import { Head, usePage } from "@inertiajs/react"
import ExpenseModal from "@/Components/ExpenseModal"
import { useExpenseModalStore } from "@/stores/expense-modal-store"
import { Budget } from "@/types/budget"
import { Category } from "@/types/category"
import { formatCurrency } from "@/utils"
import { toast, Toaster } from "sonner"
import { useEffect, useState } from "react"
import ExpenseList from "@/Components/ExpenseList"
import ProgressBar from "@/Components/ProgressBar"
import DeleteExpenseModal from "@/Components/DeleteExpenseModal"
import MoneoAgent from "@/Components/MoneoAgent"

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

            <div className="max-w-2xl mx-auto mt-16 px-4">
                <div className="p-8 sm:p-10 space-y-8">
                    <h1 className="text-gray-900 text-2xl font-bold">Presupuesto: {budget.name}</h1>

                    <div className="flex items-center gap-8">
                        <div className="w-28 shrink-0">
                            <ProgressBar percentageUsed={progress} />
                        </div>

                        <div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Te queda</p>
                                <p className="text-3xl font-bold text-gray-900 mt-0.5">{formatCurrency(remaining)}</p>
                                <p className="text-xs text-gray-500 mt-2">
                                    {formatCurrency(Number(spent))} gastados de {formatCurrency(Number(budget.amount))}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2.5">
                        <ExpenseModal />
                        <DeleteExpenseModal />

                        <Toaster position="bottom-center" />

                        <a
                            href="/dashboard"
                            className="bg-gray-900 text-white text-center px-2 sm:px-4 py-1.5 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold"
                        >
                            Volver al dashboard
                        </a>
                    </div>

                    <ExpenseList expenses={budget.expenses} budgetType={budget.type} />
                    <MoneoAgent budgetId={budget.id} userName={user?.name ?? 'Tú'} />
                </div>
            </div>
        </>
    )
}
