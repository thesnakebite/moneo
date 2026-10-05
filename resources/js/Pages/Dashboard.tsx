import { Head, Link } from '@inertiajs/react'
import { ReactElement, useRef } from 'react'
import AppLayout from '@/Layouts/AppLayout'
import BudgetCard from '@/Components/BudgetCard'
import { Budget } from '@/types/budget'
import { PlusIcon } from "@animateicons/react/lucide"
import type { PlusIconHandle } from "@animateicons/react/lucide"
import DeleteBudgetModal from '@/Components/DeleteBudgetModal'
import WelcomeProModal from '@/Components/WelcomeAiModal'
import DashboardHeader from '@/Components/DashboardHeader'
import DashboardEmpty from '@/Components/DashboardEmpty'

type Props = {
    activeBudgets: Budget[]
    finishedBudgets: Budget[]
    summary: {
        managed: string
        spent: string
        attention: number
        finished: number
    }
}

export default function Dashboard({ activeBudgets, finishedBudgets, summary }: Props) {
    const hasNoBudgets = activeBudgets.length === 0 && finishedBudgets.length === 0
    const PlusIconRef = useRef<PlusIconHandle>(null)

    return (
        <>
            <Head title="Tus presupuestos" />

            <div className="max-w-5xl mx-auto">
                {hasNoBudgets ? (
                    <DashboardEmpty />
                ) : (
                    <>
                        <DashboardHeader
                            managed={summary.managed}
                            spent={summary.spent}
                            attention={summary.attention}
                            finished={summary.finished}
                        />

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
                                    onMouseEnter={() => PlusIconRef.current?.startAnimation()}
                                    onMouseLeave={() => PlusIconRef.current?.stopAnimation()}
                                    className="border border-dashed border-border-soft rounded-xl p-5 flex flex-col items-center justify-center gap-2 text-muted hover:border-accent/40 hover:text-accent transition-colors min-h-35"
                                >
                                    <PlusIcon ref={PlusIconRef} size={20} duration={1} color="currentColor" />
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
                    </>
                )}
            </div>

            <DeleteBudgetModal />
            <WelcomeProModal />
        </>
    )
}

Dashboard.layout = (page: ReactElement) => <AppLayout>{page}</AppLayout>
