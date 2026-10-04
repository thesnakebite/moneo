import { Head, Link, usePage } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import AppLayout from '@/Layouts/AppLayout'
import BudgetCard from '@/Components/BudgetCard'
import { Budget } from '@/types/budget'
import { formatCurrency } from '@/utils'
import { PlusIcon } from '@heroicons/react/24/outline'
import { ReactElement } from 'react'
import DeleteBudgetModal from '@/Components/DeleteBudgetModal'
import WelcomeProModal from '@/Components/WelcomeAiModal'

type Props = {
    activeBudgets: Budget[]
    finishedBudgets: Budget[]
    totalManaged: string
}

function Dashboard({ activeBudgets, finishedBudgets, totalManaged }: Props) {
    const { flash } = usePage().props
    const [showWelcome, setShowWelcome] = useState(false)

    useEffect(() => {
        if (flash.subscribed) {
            setShowWelcome(true)
        }
    }, [flash.subscribed])

    const hasNoBudgets = activeBudgets.length === 0 && finishedBudgets.length === 0

    return (
        <>
            <Head title="Tus presupuestos" />

            <div className="max-w-5xl mx-auto">
                <div className="flex items-start justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-ink">Tus presupuestos</h1>
                        <p className="text-sm text-muted mt-1">
                            {formatCurrency(Number(totalManaged))} gestionados en presupuestos activos
                        </p>
                    </div>

                    <Link href="/budgets/create" className="bg-accent hover:bg-accent-dark text-white px-4 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors">
                        <PlusIcon className="size-4" />
                        Nuevo presupuesto
                    </Link>
                </div>

                <section>
                    <div className="mb-4">
                        <h2 className="text-lg font-bold text-ink">Activos</h2>
                        <p className="text-sm text-muted">En curso o sin fecha de cierre.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {activeBudgets.map((budget) => (
                            <BudgetCard key={budget.id} budget={budget} />
                        ))}

                        <Link
                            href="/budgets/create"
                            className="border border-dashed border-border-soft rounded-xl p-5 flex flex-col items-center justify-center gap-2 text-muted hover:border-accent/40 hover:text-accent transition-colors min-h-35"
                        >
                            <PlusIcon className="size-5" />
                            <p className="text-sm">Crear presupuesto</p>
                        </Link>
                    </div>
                </section>

                {finishedBudgets.length > 0 && (
                    <section className="mt-12">
                        <div className="mb-4">
                            <h2 className="text-lg font-bold text-ink">Finalizados</h2>
                            <p className="text-sm text-muted">Su fecha de finalización ya pasó. Puedes consultarlos o editarlos cuando quieras.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {finishedBudgets.map((budget) => (
                                <BudgetCard key={budget.id} budget={budget} finished />
                            ))}
                        </div>
                    </section>
                )}

                {hasNoBudgets && (
                    <p className="text-sm text-muted text-center py-12">
                        Aún no tienes presupuestos. Crea el primero para empezar.
                    </p>
                )}
            </div>

            <DeleteBudgetModal />
            <WelcomeProModal />
        </>
    )
}

Dashboard.layout = (page: ReactElement) => <AppLayout>{page}</AppLayout>

export default Dashboard
