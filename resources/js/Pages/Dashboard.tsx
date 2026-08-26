import { Head, Link } from '@inertiajs/react'
import AppLayout from '@/Layouts/AppLayout'
import { formatCurrency } from '@/utils'
import { Budget } from '@/types/budget'
import { PlusIcon } from '@heroicons/react/24/outline'
import { ReactElement } from 'react'
import ProgressBar from '@/Components/ProgressBar'
import BudgetDropdown from '@/Components/BudgetDropdown'

type Props = {
    budgets: Budget[]
    totalManaged: string
}

function Dashboard({ budgets, totalManaged }: Props) {
    return (
        <>
            <Head title="Tus presupuestos" />

            <div className="max-w-5xl mx-auto">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-ink">Tus presupuestos</h1>
                        <p className="text-sm text-muted mt-1">
                            {budgets.length} {budgets.length === 1 ? 'presupuesto activo' : 'presupuestos activos'} · {formatCurrency(Number(totalManaged))} gestionados en total
                        </p>
                    </div>

                    <Link href="/budgets/create" className="bg-accent hover:bg-accent-dark text-white px-4 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors">
                        <PlusIcon className="size-4" />
                        Nuevo presupuesto
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {budgets.map((budget) => {
                        const spent = budget.expenses.reduce((sum, e) => sum + Number(e.amount), 0)
                        const percentageUsed = Number(budget.amount) > 0 ? Math.round((spent / Number(budget.amount)) * 100) : 0

                        return (
                            <div className="relative overflow-hidden bg-linear-to-br from-ink via-ink to-muted border border-accent rounded-xl p-5 z-0">
                                {/* Capa de rejilla decorativa, sobre el gradiente */}
                                <div
                                    className="absolute inset-0 pointer-events-none opacity-40"
                                    style={{
                                        backgroundImage:
                                            'linear-gradient(rgba(212,201,199,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(212,201,199,0.06) 1px, transparent 1px)',
                                        backgroundSize: '16px 16px',
                                    }}
                                    aria-hidden="true"
                                />

                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="space-y-0.5">
                                            <p className="font-semibold text-surface">{budget.name}</p>
                                            <span className="inline-block text-[10px] font-semibold text-surface/70 border border-surface/20 rounded-full px-2 py-0.5 mt-1">
                                                {budget.type === 'general' ? 'General' : 'Proyecto'}
                                            </span>
                                        </div>

                                        <div className="w-16 shrink-0">
                                            <ProgressBar percentageUsed={percentageUsed} trailColor="#2D383E" textColor="#D4C9C7" textSize="20px" />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-lg font-bold text-accent">{formatCurrency(spent)}</p>
                                            <p className="text-xs text-surface/60 mt-0.5">de {formatCurrency(Number(budget.amount))}</p>
                                        </div>

                                        <BudgetDropdown budget={budget} />
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                    <Link
                        href="/budgets/create"
                        className="border border-dashed border-border-soft rounded-xl p-5 flex flex-col items-center justify-center gap-2 text-muted hover:border-accent/40 hover:text-accent transition-colors min-h-35"
                    >
                        <PlusIcon className="size-5" />
                        <p className="text-sm">Crear presupuesto</p>
                    </Link>
                </div>

                {budgets.length === 0 && (
                    <p className="text-sm text-muted text-center py-12">
                        Aún no tienes presupuestos. Crea el primero para empezar.
                    </p>
                )}
            </div>
        </>
    )
}

Dashboard.layout = (page: ReactElement) => <AppLayout>{page}</AppLayout>

export default Dashboard
