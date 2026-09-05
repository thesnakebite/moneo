import PageHeader from '@/Components/PageHeader'
import SubscriptionStatus from '@/Components/subscriptions/SubscriptionStatus'
import AppLayout from '@/Layouts/AppLayout'
import { Subscription } from '@/types/subscription'
import { Head } from '@inertiajs/react'
import { ReactElement } from 'react'

type Props = Subscription

const statusColors = {
    green: 'bg-green-50 text-green-600 border-green-200',
    yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200',
    amber: 'bg-amber-50 text-amber-600 border-amber-200',
    orange: 'bg-orange-50 text-orange-600 border-orange-200',
    red: 'bg-red-50 text-red-600 border-red-200',
    gray: 'bg-gray-50 text-gray-600 border-gray-200',
}

export default function Manage({ plan, onGracePeriod, endsAt, price }: Props) {


    return (
        <>
            <Head title="Administra tu suscripción" />

            <PageHeader
                title="Administra tu suscripción"
                description="Consulta el estado de tu plan y gestiona tu membresía."
            />

            <div className="max-w-2xl mx-auto">
                <SubscriptionStatus plan={plan} onGracePeriod={onGracePeriod} endsAt={endsAt} price={price} />
            </div>
        </>
    )
}

Manage.layout = (page: ReactElement) => <AppLayout>{page}</AppLayout>
