import { Link } from '@inertiajs/react'

type Props = {
    monthlyPriceId: string,
    yearlyPriceId: string,
}

const plans = [
    {
        name: 'Mensual',
        price: '4,99€',
        period: '/mes',
        priceKey: 'monthly' as const,
        features: ['Asistente de IA ilimitado', 'Escaneo de tickets', 'Soporte prioritario'],
    },
    {
        name: 'Anual',
        price: '49,99€',
        period: '/anual',
        priceKey: 'yearly' as const,
        features: ['Todo lo del plan mensual', '2 meses gratis', 'Acceso anticipado a nuevas funciones'],
        featured: true,
    }
]

export default function PricingPlans({ monthlyPriceId, yearlyPriceId }: Props) {
    const priceId = { monthly: monthlyPriceId, yearly: yearlyPriceId }

    return (
        <div className="text-center mt-10">
            <div className="flex justify-end items-center max-w-2xl mx-auto mb-6">
                <Link
                    href="/dashboard"
                    className="bg-ink hover:bg-muted text-center px-4 py-2.5 rounded-lg text-sm text-white font-bold transition-colors"
                >
                    Volver
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {plans.map((plan) => (
                    <div key={plan.priceKey} className={` relative rounded-2xl p-6 border ${
                        plan.featured ? 'border-accent bg-accent/5' : 'border-border-soft bg-surface'
                    }`}>
                        {plan.featured && (
                            <span className="absolute -top-3 left-6 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">
                                Más popular
                            </span>
                        )}
                        <h3 className="font-bold text-lg text-ink">{plan.name}</h3>
                        <p className="mt-2">
                            <span className='text-3xl font-bold text-ink'>{plan.price}</span>
                            <span className='text-sm text-muted'>{plan.period}</span>
                        </p>

                        <ul className="mt-4 space-y-2">
                            {plan.features.map((feature) => (
                                <li key={feature} className="text-sm text-muted flex items-start gap-2">
                                    <span className="text-accent">✓</span>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <Link
                            href={`/subscribe/${plan.priceKey}`}
                            className={`mt-6 block text-center px-4 py-2.5 rounded-lg text-sm font-bold transition-colors ${
                                plan.featured
                                    ? 'bg-accent hover:bg-accent-dark text-white'
                                    : 'border border-border-soft text-ink hover:bg-accent/10'
                            }`}
                        >
                            Elegir {plan.name}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
