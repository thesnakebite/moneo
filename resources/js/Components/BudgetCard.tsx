import { Budget } from "@/types/budget"
import ProgressBar from '@/Components/ProgressBar'
import { getBudgetStatusColor } from '@/utils/budget'
import { formatCurrency } from '@/utils'
import BudgetDropdown from '@/Components/BudgetDropdown'

type Props = {
    budget: Budget
    finished?: boolean
}

export default function BudgetCard({ budget, finished = false }: Props) {
    const spent = budget.expenses.reduce((sum, e) => sum + Number(e.amount), 0)
    const percentageUsed = Number(budget.amount) > 0 ? Math.round((spent / Number(budget.amount)) * 100) : 0
    const isOverBudget = percentageUsed >= 100

    return (
        <div className={`relative overflow-hidden bg-linear-to-br from-ink via-ink to-muted border border-accent rounded-xl p-5 z-0 ${finished ? 'opacity-75' : ''}`}>
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
                        <div className="flex flex-wrap items-center gap-1 pt-1">
                            <span className="inline-block text-[10px] font-semibold text-surface/70 border border-surface/20 rounded-full px-2 py-0.5">
                                {budget.type === 'general' ? 'General' : 'Proyecto'}
                            </span>
                            {finished && (
                                <span className="inline-block text-[10px] font-semibold text-red-500 border border-red-500 bg-surface/15 rounded-full px-2 py-0.5">
                                    Finalizado
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="w-16 shrink-0">
                        <ProgressBar
                            percentageUsed={percentageUsed}
                            pathColor={getBudgetStatusColor(percentageUsed)}
                            trailColor="#2D383E"
                            textColor="#D4C9C7"
                            textSize="20px"
                            alertRing="ring-ink"
                            alertIconSize={12}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <p className={`text-lg font-bold ${isOverBudget ? 'text-red-400' : 'text-accent'}`}>
                            {formatCurrency(spent)}
                        </p>
                        <p className="text-xs text-surface/60 mt-0.5">de {formatCurrency(Number(budget.amount))}</p>
                    </div>

                    <BudgetDropdown budget={budget} />
                </div>
            </div>
        </div>
    )
}
