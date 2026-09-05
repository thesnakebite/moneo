import { Subscription } from "@/types/subscription"
import { formatCurrency } from "@/utils"

type Props = {
    plan: Subscription['plan']
    onGracePeriod: Subscription['onGracePeriod']
    endsAt: Subscription['endsAt']
    price: Subscription['price']
}

const planLabels = {
    monthly: 'Mensual',
    yearly: 'Anual',
}

export default function SubscriptionStatus({ plan, onGracePeriod, endsAt, price }: Props) {

    return (
        <div className="rounded-2xl border border-border-soft bg-surface p-6">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-xs font-semibold text-muted uppercase tracking-wide">Plan actual</p>
                    <p className="text-2xl font-bold text-ink mt-1">{planLabels[plan]}</p>
                    {price && (
                        <p className="text-sm text-muted mt-0.5 font-extrabold">
                            {formatCurrency(price.amount)} / {plan === 'monthly' ? 'mes' : 'año'}
                        </p>
                    )}
                </div>

                <span className="text-xs font-bold text-white bg-accent px-3 py-1 rounded-full">
                    PRO
                </span>
            </div>

            {onGracePeriod && endsAt ? (
                <p className="mt-4 text-sm text-muted border-t border-border-soft pt-4">
                    Tu suscripción está cancelada. Seguirás teniendo acceso hasta el <span className="font-semibold text-ink">{endsAt}</span>.
                </p>
            ) : (
                <p className="mt-4 text-sm text-muted border-t border-border-soft pt-4">
                    Tu suscripción está activa y se renovará automáticamente.
                </p>
            )}
        </div>
    )
}
