import { useState } from 'react'
import { router } from '@inertiajs/react'
import { route } from 'ziggy-js'
import { Budget } from '@/types/budget'
import { formatCurrency } from '@/utils'
import { getDaysUntilPurge } from '@/utils/budget'

type Props = {
    budget: Budget
}

export default function TrashedBudgetCard({ budget }: Props) {
    const [confirming, setConfirming] = useState(false)
    const [processing, setProcessing] = useState(false)

    const spent = budget.expenses.reduce((sum, expense) => sum + Number(expense.amount), 0)
    const daysLeft = getDaysUntilPurge(budget.deleted_at!)
    const isUrgent = daysLeft <= 3

    const purgeLabel =
        daysLeft === 0 ? 'Se eliminará hoy'
        : daysLeft === 1 ? 'Se eliminará mañana'
        : `Se eliminará en ${daysLeft} días`

    const handleRestore = () => {
        router.patch(route('budgets.restore', budget.id), {}, {
            preserveScroll: true,
            onStart: () => setProcessing(true),
            onFinish: () => setProcessing(false),
        })
    }

    const handleForceDelete = () => {
        router.delete(route('budgets.force-delete', budget.id), {
            preserveScroll: true,
            onStart: () => setProcessing(true),
            onFinish: () => setProcessing(false),
        })
    }

    return (
        <article className="flex flex-col rounded-xl border border-border-soft/50 bg-ink/5 p-5 min-h-35">
            <div className="flex items-start justify-between gap-3">
                <h3 className="font-bold text-ink truncate">{budget.name}</h3>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${isUrgent ? 'bg-red-700/10 text-red-700' : 'bg-ink/10 text-muted'}`}>
                    {purgeLabel}
                </span>
            </div>

            <p className="mt-1 text-xs text-muted">
                {formatCurrency(spent)} gastados de {formatCurrency(Number(budget.amount))}
            </p>

            <div className="mt-auto pt-4 flex items-center justify-between gap-2">
                {confirming ? (
                    <>
                        <span className="text-xs font-semibold text-ink">¿Eliminar para siempre?</span>
                        <div className="flex gap-1">
                            <button
                                type="button"
                                onClick={() => setConfirming(false)}
                                disabled={processing}
                                className="px-3 py-1.5 text-xs font-bold text-ink hover:bg-ink/5 rounded-lg transition-colors disabled:opacity-40"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={handleForceDelete}
                                disabled={processing}
                                className="px-3 py-1.5 text-xs font-bold text-white bg-red-700 hover:bg-red-600 rounded-lg transition-colors disabled:opacity-40"
                            >
                                {processing ? 'Eliminando...' : 'Eliminar'}
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <button
                            type="button"
                            onClick={() => setConfirming(true)}
                            disabled={processing}
                            className="px-3 py-1.5 text-xs font-bold text-red-700 hover:bg-red-700/10 rounded-lg transition-colors disabled:opacity-40"
                        >
                            Eliminar definitivamente
                        </button>
                        <button
                            type="button"
                            onClick={handleRestore}
                            disabled={processing}
                            className="px-3 py-1.5 text-xs font-bold text-white bg-accent-dark hover:bg-accent rounded-lg transition-colors disabled:opacity-40"
                        >
                            {processing ? 'Restaurando...' : 'Restaurar'}
                        </button>
                    </>
                )}
            </div>
        </article>
    )
}
