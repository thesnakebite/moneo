import PageHeader from '@/Components/PageHeader'
import SubscriptionStatus from '@/Components/subscriptions/SubscriptionStatus'
import AppLayout from '@/Layouts/AppLayout'
import { Subscription } from '@/types/subscription'
import { Head } from '@inertiajs/react'
import { ReactElement } from 'react'

type Props = Subscription

export default function Manage({ plan, onGracePeriod, endsAt }: Props) {


    return (
        <>
            <Head title="Administra tu suscripción" />

            <PageHeader
                title="Administra tu suscripción"
                description="Consulta el estado de tu plan y gestiona tu membresía."
            />

            <div className="max-w-2xl mx-auto">
                <SubscriptionStatus plan={plan} onGracePeriod={onGracePeriod} endsAt={endsAt} />
            </div>
        </>
    )
}

Manage.layout = (page: ReactElement) => <AppLayout>{page}</AppLayout>
