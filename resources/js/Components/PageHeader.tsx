import { Link } from '@inertiajs/react'
import { ReactNode } from 'react'

type Props = {
    title: string
    description: string
    backHref?: string
    backLabel?: string
    icon?: ReactNode
}

export default function PageHeader({ title, description, backHref = '/dashboard', backLabel = 'Volver a presupuestos', icon }: Props) {
    return (
        <div className="relative overflow-hidden bg-linear-to-br from-ink via-ink to-muted max-w-4xl mx-auto rounded-2xl border border-accent py-6 px-12 mb-10">
            <div
                className="absolute inset-0 pointer-events-none opacity-40"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(212,201,199,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(212,201,199,0.06) 1px, transparent 1px)',
                    backgroundSize: '16px 16px',
                }}
                aria-hidden="true"
            />

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-start sm:justify-between">
                <div className="flex items-center gap-4">
                    {icon && (
                        <div className="flex size-12 sm:size-14 shrink-0 items-center justify-center rounded-2xl bg-accent/15">
                            {icon}
                        </div>
                    )}
                    <div>
                        <h1 className="text-lg sm:text-2xl font-bold text-surface">{title}</h1>
                        <p className="text-xs text-surface/60 mt-1">{description}</p>
                    </div>
                </div>

                <Link
                    href={backHref}
                    className="border border-surface/30 text-surface hover:bg-accent/10 hover:border-accent/40 text-center px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-colors shrink-0"
                >
                    {backLabel}
                </Link>
            </div>
        </div>
    )
}
