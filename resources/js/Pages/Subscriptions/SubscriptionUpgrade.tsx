import { Link } from '@inertiajs/react'

export default function SubscriptionUpgrade() {
    return (
        <div className="rounded-xl border border-accent/30 bg-accent/5 px-4 py-3 text-center">
            <p className="text-sm text-ink">
                Cambia a <span className="font-semibold">plan anual</span> y ahorra 2 meses.
            </p>
            <Link href="/billing" className="text-sm font-bold text-accent hover:text-accent-dark transition-colors">
                Ver plan anual
            </Link>
        </div>
    )
}
