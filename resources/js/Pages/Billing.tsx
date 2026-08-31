import PricingPlans from '@/Components/PricingPlans'
import AppLayout from '@/Layouts/AppLayout'
import { Head, Link } from '@inertiajs/react'
import { ReactElement } from 'react'

type Props = {
    monthlyPriceId: string,
    yearlyPriceIs: string,
}

export default function Billing({ monthlyPriceId, yearlyPriceIs }: Props) {

    return (
        <>
            <Head title="Planes y suscripciones" />

            <div className="text-center mb-10">
                <h1 className="text-2xl text-ink font-medium">
                    Elige tu plan
                </h1>
                <p className="text-sm text-muted mt-1">
                    Desbloquea el asistente de IA y el escaneo de tickets.
                </p>

                <PricingPlans monthlyPriceId='monthlyPriceId' yearlyPriceId='yearlyPriceIs'  />
            </div>
        </>
    )
}

Billing.layout = (page: ReactElement) => <AppLayout>{page}</AppLayout>
