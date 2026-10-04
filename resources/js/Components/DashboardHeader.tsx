import { Link, usePage } from '@inertiajs/react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { formatCurrency } from '@/utils'

type Props = {
    managed: string
    spent: string
    attention: number
    finished: number
}

export default function DashboardHeader({ managed, spent, attention, finished }: Props) {
    const { user } = usePage().props
    const name = user?.user?.name

    return (
        <div className="relative overflow-hidden rounded-2xl border border-border-soft bg-muted/10 p-6 mb-10">
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(5,24,34,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(5,24,34,0.05) 1px, transparent 1px)',
                    backgroundSize: '16px 16px',
                }}
                aria-hidden="true"
            />

            <div className="relative z-10">
                <div className="flex items-start justify-between gap-4">
                    <div className="text-center sm:text-left">
                        <h1 className="text-2xl font-bold text-ink">
                            {name ? `Hola, ${name}` : 'Tus presupuestos'}
                        </h1>
                        <p className="text-sm text-muted mt-1">Así van tus presupuestos activos.</p>
                    </div>

                    <Link
                        href="/budgets/create"
                        className="hidden sm:flex shrink-0 bg-accent hover:bg-accent-dark text-white px-4 py-2.5 rounded-lg text-sm font-bold items-center gap-2 transition-colors"
                    >
                        <PlusIcon className="size-4" />
                        Nuevo presupuesto
                    </Link>
                </div>

                <dl className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-y-5 items-start border-t border-ink/10 pt-5 sm:divide-x sm:divide-ink/10">
                    <div className="text-center px-2">
                        <dt className="text-[11px] font-semibold text-muted uppercase">Gestionado</dt>
                        <dd className="text-lg font-bold text-ink mt-1">{formatCurrency(Number(managed))}</dd>
                    </div>
                    <div className="text-center px-2">
                        <dt className="text-[11px] font-semibold text-muted uppercase">Gastado</dt>
                        <dd className="text-lg font-bold text-accent-dark mt-1">{formatCurrency(Number(spent))}</dd>
                    </div>
                    <div className="text-center px-2">
                        <dt className="text-[11px] font-semibold text-muted uppercase">Requieren atención</dt>
                        <dd className={`text-lg font-bold mt-1 ${attention > 0 ? 'text-amber-700' : 'text-ink'}`}>
                            {attention}
                        </dd>
                    </div>
                    <div className="text-center px-2">
                        <dt className="text-[11px] font-semibold text-muted uppercase">Finalizados</dt>
                        <dd className="text-lg font-bold text-ink mt-1">{finished}</dd>
                    </div>
                </dl>
            </div>
        </div>
    )
}
