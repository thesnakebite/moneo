import { Head, usePage } from '@inertiajs/react'
import PageHeader from '@/Components/PageHeader'
import SubscriptionStatus from '@/Components/subscriptions/SubscriptionStatus'
import SwapPlanModal from '@/Components/subscriptions/SwapPlanModal'
import AppLayout from '@/Layouts/AppLayout'
import { Subscription } from '@/types/subscription'
import { ReactElement, useEffect } from 'react'
import { toast, Toaster } from "sonner"
import CancelSubscriptionModal from '@/Components/subscriptions/CancelSubscriptionModal'
import { useCancelSubscriptionModalStore } from '@/stores/cancel-subscription-modal-store'
import ResumeSubscription from '@/Components/subscriptions/ResumeSubscription'

type Props = Subscription

export default function Manage({ plan, onGracePeriod, endsAt, price, status_label, currentPeriodEnd }: Props) {
    const { flash } = usePage().props
    const openCancelSubscription = useCancelSubscriptionModalStore((state) => state.openModal)

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success)
        }
        if (flash.error) {
            toast.error(flash.error)
        }
    }, [flash.success])

    return (
        <>
            <Head title="Administra tu suscripción" />

            <PageHeader
                title="Administra tu suscripción"
                description="Consulta el estado de tu plan y gestiona tu membresía."
            />

            <div className="max-w-2xl mx-auto">
                <SubscriptionStatus plan={plan} onGracePeriod={onGracePeriod} endsAt={endsAt} price={price} status_label={status_label} />
            </div>

            {onGracePeriod ? (
                <ResumeSubscription endsAt={endsAt} />
            ) : (
                <div className="flex items-center mt-4 mx-auto justify-center">
                        <button
                            onClick={openCancelSubscription}
                            className="text-sm text-muted font-bold cursor-pointer"
                        >
                            Cancelar suscripción
                        </button>
                </div>
            )}

            <SwapPlanModal />
            <CancelSubscriptionModal currentPeriodEnd={currentPeriodEnd} />
            <Toaster position="bottom-center" />
        </>
    )
}

Manage.layout = (page: ReactElement) => <AppLayout>{page}</AppLayout>
