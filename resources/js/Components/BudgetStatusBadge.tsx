import type { BudgetStatus } from '@/utils/budget'

const STATUS = {
    upcoming: { label: 'Próximo', dot: 'bg-border-soft' },
    active: { label: 'En curso', dot: 'bg-accent' },
    finished: { label: 'Concluido', dot: 'bg-ink' },
} satisfies Record<BudgetStatus, { label: string; dot: string }>

export default function BudgetStatusBadge({ status }: { status: BudgetStatus }) {
    const { label, dot } = STATUS[status]

    return (
        <span className="inline-flex items-center gap-2 rounded-full border border-border-soft/60 bg-ink/5 px-3 py-1 text-xs font-semibold text-ink">
            <span className={`size-1.5 rounded-full ${dot}`} aria-hidden="true" />
            {label}
        </span>
    )
}
