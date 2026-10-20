import { useEffect, useState } from 'react'
import { formatCurrency } from '@/utils'
import type { CategoryValue } from '@/types/expense'
import type { CategoryBreakdownItem } from '@/utils/expense'

type Props = {
    items: CategoryBreakdownItem[]
    selected: CategoryValue | null
    onSelect: (category: CategoryValue | null) => void
}

const pluralExpenses = (count: number) => (count === 1 ? '1 gasto' : `${count} gastos`)

export default function CategoryBreakdown({ items, selected, onSelect }: Props) {
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        const timeout = setTimeout(() => setIsReady(true), 200)
        return () => clearTimeout(timeout)
    }, [])

    // La categoría con más gasto llena la barra; el resto se mide respecto a ella
    const maxTotal = items[0]?.total ?? 0

    return (
        <div role="group" aria-label="Filtrar gastos por categoría" className="space-y-1">
            {items.map((item, index) => {
                const isSelected = selected === item.category
                const isDimmed = selected !== null && !isSelected
                const width = maxTotal > 0 ? (item.total / maxTotal) * 100 : 0

                return (
                    <button
                        key={item.category}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => onSelect(isSelected ? null : item.category)}
                        className={`grid w-full grid-cols-[6.5rem_1fr_6rem] items-center gap-4 rounded-lg border px-3 py-2 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                            isSelected ? 'border-accent bg-accent/10' : 'border-transparent hover:bg-ink/5'
                        }`}
                    >
                        <span className="min-w-0">
                            <span className="block truncate text-sm font-semibold text-ink">{item.label}</span>
                            <span className="block text-xs text-muted">{pluralExpenses(item.count)}</span>
                        </span>

                        <span className="h-1.5 rounded-full bg-border-soft/35" aria-hidden="true">
                            <span
                                className={`block h-full rounded-full transition-[width,background-color] duration-700 ease-out motion-reduce:transition-none ${
                                    isDimmed ? 'bg-border-soft' : 'bg-accent'
                                }`}
                                style={{ width: `${isReady ? width : 0}%`, transitionDelay: `${index * 60}ms` }}
                            />
                        </span>

                        <span className="text-right">
                            <span className="block text-sm font-bold text-ink">{formatCurrency(item.total)}</span>
                            <span className="block text-xs text-muted">{item.percentage} %</span>
                        </span>
                    </button>
                )
            })}
        </div>
    )
}
