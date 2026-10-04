import { Link, usePage } from '@inertiajs/react'
import { PiggyBankIcon } from '@animateicons/react/lucide'

export default function DashboardEmpty() {
    const { user } = usePage().props
    const name = user?.user?.name

    return (
        <div className="flex flex-col items-center justify-center text-center py-24 px-6">
            <div className="flex size-20 items-center justify-center rounded-full bg-accent/15 mb-6">
                <PiggyBankIcon size={40} duration={1} color="var(--color-accent)" />
            </div>

            <h1 className="text-2xl font-bold text-ink">
                {name ? `Hola, ${name}` : 'Bienvenido a Moneo'}
            </h1>
            <p className="mt-2 max-w-md text-sm text-muted">
                Crea tu primer presupuesto para empezar a registrar gastos y ver cómo avanzas.
            </p>

            <Link
                href="/budgets/create"
                className="mt-8 bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-lg text-sm font-bold transition-colors"
            >
                Crear mi primer presupuesto
            </Link>
        </div>
    )
}
