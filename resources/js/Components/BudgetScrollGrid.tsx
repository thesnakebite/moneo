import { ReactNode, useRef, useState } from 'react'
import { InfiniteScroll, router } from '@inertiajs/react'

type Props = {
    data: string
    loadedCount: number
    perPage?: number
    children: ReactNode
}

export default function BudgetScrollGrid({ data, loadedCount, perPage = 6, children }: Props) {
    const gridRef = useRef<HTMLDivElement>(null)
    const [collapsing, setCollapsing] = useState(false)

    const canCollapse = loadedCount > perPage

    const handleShowLess = () => {
        router.reload({
            only: [data],
            reset: [data],
            onStart: () => setCollapsing(true),
            onFinish: () => {
                setCollapsing(false)
                gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            },
        })
    }

    return (
        <InfiniteScroll
            data={data}
            manual
            onlyNext
            preserveUrl
            itemsElement={gridRef}
            next={({ loading, fetch, hasMore }) =>
                (hasMore || canCollapse) && (
                    <div className="flex justify-center gap-3 pt-6">
                        {hasMore && (
                            <button
                                type="button"
                                onClick={fetch}
                                disabled={loading || collapsing}
                                className="px-4 py-2.5 text-sm font-bold text-ink border border-border-soft rounded-lg hover:bg-ink/5 transition-colors disabled:opacity-40 cursor-pointer"
                            >
                                {loading ? 'Cargando...' : 'Mostrar más'}
                            </button>
                        )}

                        {canCollapse && (
                            <button
                                type="button"
                                onClick={handleShowLess}
                                disabled={loading || collapsing}
                                className="px-4 py-2.5 text-sm font-bold text-muted rounded-lg hover:text-ink hover:bg-ink/5 transition-colors disabled:opacity-40 cursor-pointer"
                            >
                                Mostrar menos
                            </button>
                        )}
                    </div>
                )
            }
        >
            <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 scroll-mt-6">
                {children}
            </div>
        </InfiniteScroll>
    )
}
