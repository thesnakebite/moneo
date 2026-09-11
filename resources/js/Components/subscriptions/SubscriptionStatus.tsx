import { Link } from "@inertiajs/react"
import { useRef } from 'react'
import { Subscription } from "@/types/subscription"
import { formatCurrency } from "@/utils"
import { TagIcon, ZapIcon, ChevronRightIcon } from "@animateicons/react/lucide"
import type { ChevronRightIconHandle, TagIconHandle } from "@animateicons/react/lucide"
import { useSwapModalStore } from "@/stores/swap-modal-store"

type Props = {
    plan: Subscription['plan']
    onGracePeriod: Subscription['onGracePeriod']
    endsAt: Subscription['endsAt']
    price: Subscription['price']
    status_label: Subscription['status_label']
}

const planLabels = {
    monthly: 'Mensual',
    yearly: 'Anual',
}

const statusColors = {
    green: 'bg-green-400/10 text-green-900 border-green-800/20',
    yellow: 'bg-yellow-400/10 text-yellow-900 border-yellow-800/20',
    amber: 'bg-amber-400/10 text-amber-900 border-amber-800/20',
    orange: 'bg-orange-400/10 text-orange-900 border-orange-800/20',
    red: 'bg-red-400/10 text-red-900 border-red-800/20',
    gray: 'bg-gray-400/10 text-gray-900 border-gray-800/20',
}

export default function SubscriptionStatus({ plan, onGracePeriod, endsAt, price, status_label }: Props) {
    const swapChevronRef = useRef<ChevronRightIconHandle>(null)
    const invoicesChevronRef = useRef<ChevronRightIconHandle>(null)
    const openSwapModal = useSwapModalStore((state) => state.openModal)

    return (
        <div className="rounded-2xl border border-border-soft bg-muted/10 p-6">
            <div className="flex items-start justify-between">
                <img
                    src={plan === 'monthly' ? '/images/pro-mensual.png' : '/images/pro-anual.png'}
                    alt={plan === 'monthly' ? 'Plan Pro Mensual' : 'Plan Pro Anual'}
                    className="size-20 sm:size-28 aspect-square"
                    />

                <div>
                    <p className="text-xs font-semibold text-muted uppercase tracking-wide">Plan actual</p>
                    <p className="text-2xl font-bold text-ink mt-1">{planLabels[plan]}</p>
                    {price && (
                        <p className="text-sm text-muted mt-0.5">
                            {formatCurrency(price.amount)} / {plan === 'monthly' ? 'mes' : 'año'}
                        </p>
                    )}
                </div>
            </div>

            {status_label && (
                <div className={`mt-4 flex items-center gap-x-1.5 text-sm border rounded-lg px-3 py-2 ${statusColors[status_label.color]}`}>
                    <TagIcon size={20} duration={1} color="currentColor" className="rotate-90" />
                    <span className="font-semibold">{status_label.text}</span>
                    {status_label.date && (
                        <span>-</span>
                    )}
                    {status_label.date && (
                        <span>{status_label.description} {status_label.date}</span>
                    )}
                </div>
            )}

            {onGracePeriod ? (
                <p className="mt-4 text-sm text-muted border-t border-border-soft pt-4">
                    Tu suscripción está cancelada y finalizará el {endsAt}. Podrás elegir un nuevo plan después.
                </p>
            ) : plan === 'monthly' ? (
                <button
                    type="button"
                    onClick={openSwapModal}
                    onMouseEnter={() => swapChevronRef.current?.startAnimation()}
                    onMouseLeave={() => swapChevronRef.current?.stopAnimation()}
                    className="mt-4 flex items-center justify-between border-t border-border-soft pt-4 group w-full text-left cursor-pointer"
                >
                    <div>
                        <p className="text-sm font-bold text-ink">Cambiar suscripción</p>
                        <p className="text-xs text-muted mt-0.5">Actualiza a anual y ahorra dos meses</p>
                    </div>

                    <div className="flex items-center gap-0.5">
                        <span className="flex items-center gap-0.5 bg-accent/10 text-muted text-xs font-stretch-90% font-bold px-2 py-1 rounded">
                            <ZapIcon size={20} duration={1} color="var(--color-accent)" />
                            Mejora tu plan
                        </span>
                        <ChevronRightIcon ref={swapChevronRef} size={20} duration={1} color="var(--color-accent)" />
                    </div>
                </button>
            ) : null}

            <Link
                href="/subscription/invoices"
                onMouseEnter={() => invoicesChevronRef.current?.startAnimation()}
                onMouseLeave={() => invoicesChevronRef.current?.stopAnimation()}
                className="text-sm font-bold"
            >
                <div className="mt-4 flex items-center justify-between gap-x-1.5 border-t border-border-soft pt-4">
                        Ver historial de pago
                    <ChevronRightIcon ref={invoicesChevronRef} size={20} duration={1} color="var(--color-accent)" />
                </div>
            </Link>
        </div>
    )
}
