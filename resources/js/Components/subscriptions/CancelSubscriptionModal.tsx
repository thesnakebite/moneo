import { router } from '@inertiajs/react'
import { useState } from "react"
import { route } from 'ziggy-js'
import { useCancelSubscriptionModalStore } from "@/stores/cancel-subscription-modal-store"
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react"

type Props = {
    currentPeriodEnd: string | null
}

export default function CancelSubscriptionModal({ currentPeriodEnd }: Props) {
    const open = useCancelSubscriptionModalStore((state) => state.open)
    const closeModal = useCancelSubscriptionModalStore((state) => state.closeModal)
    const [loading, setLoading] = useState(false)

    const handleCancel = () => {
        setLoading(true)

        router.post(
            route('subscription.cancel'),
            {},
            {
                onSuccess: () => closeModal(),
                onFinish: () => setLoading(false),
                preserveScroll: true
            }
        )
    }

    return (
        <Dialog open={open} onClose={closeModal} className="relative z-50">
            <DialogBackdrop transition className="fixed inset-0 bg-ink/40 duration-200 ease-out data-closed:opacity-0"></DialogBackdrop>

            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel transition className="w-full max-w-md rounded-2xl bg-surface p-6 shadow-xl duration-200 ease-out data-closed:scale-95 data-closed:opacity-0">
                    <DialogTitle className="text-lg font-bold text-ink">Cancelar suscripción</DialogTitle>
                    <p className="mt-2 text-sm text-muted">
                        Mantendrás acceso al asistente de IA y al escaneo de tickets hasta el{' '}
                        <span className="font-semibold text-ink">{currentPeriodEnd ?? 'final de tu periodo actual'}</span>.
                        Después de esa fecha, dejarás de tener acceso a las funciones Pro, aunque podrás reactivar tu suscripción en cualquier momento antes de esa fecha.
                    </p>

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={closeModal}
                            disabled={loading}
                            className="px-4 py-2.5 text-sm font-bold text-ink hover:bg-accent/10 disabled:opacity-40 rounded-lg transition-colors"
                        >
                            Seguir suscrito
                        </button>

                        <button
                            type="button"
                            onClick={handleCancel}
                            disabled={loading}
                            className="bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white px-4 py-2.5 rounded-lg text-sm font-bold transition-colors"
                        >
                            {loading ? 'Cancelando...' : 'Cancelar suscripción'}
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}
