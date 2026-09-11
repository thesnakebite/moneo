import { useState } from 'react'
import { Head } from '@inertiajs/react'
import { ReactElement } from 'react'
import AppLayout from '@/Layouts/AppLayout'
import PageHeader from '@/Components/PageHeader'
import { Invoice } from '@/types/subscription'
import { CreditCardIcon } from "@animateicons/react/lucide"

type Props = {
    invoices: Invoice[]
}

const statusLabels: Record<string, string> = {
    paid: 'Pagado',
    open: 'Pendiente',
    void: 'Anulado',
    uncollectible: 'Impagado',
}

const statusColors: Record<string, string> = {
    paid: 'text-green-700 bg-green-50',
    open: 'text-amber-700 bg-amber-50',
    void: 'text-muted bg-border-soft/20',
    uncollectible: 'text-red-700 bg-red-50',
}

export default function Invoices({ invoices }: Props) {
    const [showAll, setShowAll] = useState(false)
    const visibleInvoices = showAll ? invoices : invoices.slice(0, 5)

    return (
        <>
            <Head title="Historial de pagos" />

            <PageHeader
                icon={<CreditCardIcon size={22} color="var(--color-accent)" />}
                title="Historial de pagos"
                description="Consulta tus facturas anteriores."
                backHref="/subscription"
                backLabel="Volver a mi suscripción"
            />

            <div className="max-w-3xl mx-auto">
                {invoices.length === 0 ? (
                    <p className="text-sm text-muted text-center py-12">
                        Aún no tienes ninguna factura registrada.
                    </p>
                ) : (
                    <>
                        <div className="hidden sm:grid grid-cols-[1fr_1fr_2fr_1fr] gap-4 px-5 pb-2 text-xs font-semibold text-muted uppercase tracking-wide">
                            <span>Fecha</span>
                            <span>Estado</span>
                            <span>Producto</span>
                            <span className="text-right">Precio</span>
                        </div>

                        <div className="flex flex-col gap-2">
                            {visibleInvoices.map((invoice) => (
                                <div
                                    key={invoice.id}
                                    className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_2fr_1fr] gap-1 sm:gap-4 px-5 py-3 items-center rounded-xl border border-border-soft bg-muted/10 shadow-sm"
                                >
                                    <p className="text-sm font-semibold text-ink">{invoice.date}</p>

                                    <div className="flex items-center">
                                        <span className={`inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusColors[invoice.status] ?? 'text-muted bg-border-soft/20'}`}>
                                            {statusLabels[invoice.status] ?? invoice.status}
                                        </span>
                                    </div>

                                    <div>
                                        {invoice.description && (
                                            <p className="text-sm text-ink">{invoice.description}</p>
                                        )}
                                    </div>

                                    <p className="text-sm font-bold text-ink sm:text-right">{invoice.total}</p>
                                </div>
                            ))}
                        </div>

                        {invoices.length > 5 && (
                            <button
                                type="button"
                                onClick={() => setShowAll(!showAll)}
                                className="mt-4 text-sm font-bold text-accent hover:text-accent-dark transition-colors"
                            >
                                {showAll ? 'Ver menos' : `Ver más facturas (${invoices.length - 5})`}
                            </button>
                        )}
                    </>
                )}
            </div>
        </>
    )
}

Invoices.layout = (page: ReactElement) => <AppLayout>{page}</AppLayout>
