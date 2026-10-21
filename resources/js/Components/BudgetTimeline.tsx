import { useEffect, useRef, useState } from 'react'
import { formatDate } from '@/utils'
import type { BudgetPeriod } from '@/utils/budget'
import { PiggyBankIcon, PiggyBankIconHandle } from '@animateicons/react/lucide'

type Props = {
    startsAt: string
    endsAt: string
    period: BudgetPeriod
}

const pluralDays = (days: number) => (days === 1 ? '1 día' : `${days} días`)

export default function BudgetTimeline({ startsAt, endsAt, period }: Props) {
    const target =
        period.status === 'active' ? period.elapsedPercentage
        : period.status === 'finished' ? 100
        : 0

    const [displayed, setDisplayed] = useState(0)
    const piggyRef = useRef<PiggyBankIconHandle>(null)
    const isFinished = period.status === 'finished'

    useEffect(() => {
        const timeout = setTimeout(() => setDisplayed(target), 200)
        return () => clearTimeout(timeout)
    }, [target])

    const centerLabel =
        period.status === 'active' ? `Hoy · día ${period.currentDay} de ${period.totalDays}`
        : period.status === 'upcoming' ? `Empieza en ${pluralDays(period.daysUntilStart)}`
        : 'Finalizado'

    function ResponsiveDate({ date }: { date: string }) {
        return (
            <span>
                <span className="sm:hidden">{formatDate(date, 'short')}</span>
                <span className="hidden sm:inline">{formatDate(date)}</span>
            </span>
        )
    }

    return (
        <div>
            <div className="relative h-1 rounded-full bg-border-soft/35" aria-hidden="true">
                <div
                    className="h-full rounded-full bg-muted transition-[width] duration-700 ease-out motion-reduce:transition-none"
                    style={{ width: `${displayed}%` }}
                />
                <div
                    className={`absolute top-1/2 flex size-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-accent-dark transition-[left] duration-700 ease-out motion-reduce:transition-none ${
                        isFinished ? 'bg-accent' : 'bg-surface'
                    }`}
                    style={{ left: `${displayed}%` }}
                    onTransitionEnd={(event) => {
                        if (event.propertyName === 'left') piggyRef.current?.startAnimation()
                    }}
                >
                    <PiggyBankIcon
                        ref={piggyRef}
                        size={14}
                        isAnimated={false}
                        color={isFinished ? 'var(--color-surface)' : 'var(--color-accent-dark)'}
                    />
                </div>
            </div>

            <div className="mt-2 flex items-baseline justify-between gap-3 text-xs text-muted">
                <ResponsiveDate date={startsAt} />
                <span className="font-semibold text-ink">{centerLabel}</span>
                <ResponsiveDate date={endsAt} />
            </div>
        </div>
    )
}
