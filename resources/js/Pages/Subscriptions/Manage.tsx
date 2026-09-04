import PageHeader from '@/Components/PageHeader';
import AppLayout from '@/Layouts/AppLayout'
import { Head } from '@inertiajs/react'
import { ReactElement } from 'react'

type Props = {
    plan: 'monthly' | 'yearly'
}

export default function Manage({ plan }: Props) {


    return (
        <>
            <Head title="Administra tu suscripción" />

            <PageHeader
                title="Administra tu suscripción"
                description="Consulta el estado de tu plan y gestiona tu membresía."
            />

            <div className="max-w-2xl mx-auto">
                {/* aquí irá SubscriptionStatus */}
            </div>
        </>
    )
}

Manage.layout = (page: ReactElement) => <AppLayout>{page}</AppLayout>
