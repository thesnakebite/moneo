import { router } from '@inertiajs/react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useSwapModalStore } from '@/stores/swap-modal-store'
import { route } from 'ziggy-js'
import { useState, useEffect } from 'react'
import { InfoIcon, XIcon } from "@animateicons/react/lucide"

type Preview = {
    amount_due: number
    next_payment_amount: number
    next_payment_date: string
}

export default function SwapPlanModal() {
    const open = useSwapModalStore((state) => state.open)
    const closeModal = useSwapModalStore((state) => state.closeModal)

    const [loading, setLoading] = useState(false)
    const [preview, setPreview] = useState<Preview | null>(null)
    const [loadingPreview, setLoadingPreview] = useState(false)
    const [showInfo, setShowInfo] = useState(false)

    const yearlyPrice = 49.99
    const credit = preview ? (yearlyPrice - preview.amount_due).toFixed(2) : null

    useEffect(() => {
        if (open) {
            setLoadingPreview(true)

            fetch('/subscription/preview-swap/yearly')
                .then((res) => res.json())
                .then((data) => setPreview(data))
                .catch(() => setPreview(null))
                .finally(() => setLoadingPreview(false))
        } else {
            setPreview(null)
        }
    }, [open])

    const handleConfirm = (newPlan: string) => {
        setLoading(true)

        router.post(
            route('subscription.swap', newPlan),
            {},
            {
                onSuccess: () => closeModal(),
                onFinish: () => setLoading(false),
                preserveScroll: true,
            }
        )
    }

    return (
        <Dialog open={open} onClose={closeModal} className="relative z-50">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-ink/40 duration-200 ease-out data-closed:opacity-0 overflow-hidden"
            />

            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel
                    transition
                    className="w-full max-w-md rounded-2xl bg-surface shadow-xl duration-200 ease-out data-closed:scale-95 data-closed:opacity-0"
                >
                    <div className="bg-ink/5 px-6 pt-6 pb-5">
                        <DialogTitle className="text-lg font-bold text-ink text-center mb-2">
                            Confirma tu nueva suscripción
                        </DialogTitle>
                        <p className="text-xs text-muted max-w-sm mx-auto text-center">
                            El plan anual te da acceso completo al asistente de IA y al escaneo de tickets, con dos meses gratis respecto al plan mensual.
                        </p>
                    </div>

                    <div className="px-6 pb-6">
                        <div className="flex items-center justify-between mt-4">
                            <h3 className="font-bold font-stretch-125% text-2xl">Anual</h3>
                            <img
                                src={'/images/pro-anual.png'}
                                alt={'Plan Pro Anual'}
                                className="size-8 sm:size-14 aspect-square"
                            />
                        </div>

                        <div className="mt-4 divide-y divide-border-soft/50">
                            <div className="flex justify-between px-4 py-3">
                                <span className="text-sm text-muted font-semibold">Nuevo plan</span>
                                <span className="text-sm font-semibold text-ink">Anual</span>
                            </div>

                            <div className="flex justify-between px-4 py-3">
                                <div className="flex items-center gap-1">
                                    <span className="text-sm text-muted font-semibold">Hoy pagas</span>
                                    <button type="button" onClick={() => setShowInfo(!showInfo)} className='text-muted hover:text-accent transition-colors'>
                                        <InfoIcon size={14} duration={1} color="currentColor" />
                                    </button>
                                </div>
                                <span className="text-sm font-semibold text-ink">
                                    {loadingPreview ? '...' : preview ? `${preview.amount_due}€` : '—'}
                                </span>
                            </div>

                            <div className="flex justify-between px-4 py-3">
                                <span className="text-xs text-muted">Próximo pago el {loadingPreview ? '...' : preview ? `${preview.next_payment_date}` : '—'}</span>
                                <span className="text-xs text-ink">
                                    {loadingPreview
                                        ? '...'
                                        : preview
                                        ? `${preview.next_payment_amount}€`
                                        : '—'}
                                </span>
                            </div>

                            {/* Info */}
                            {showInfo && (
                                <div className="mt-3 rounded-lg bg-accent/5 border border-accent/20 px-4 py-3 relative">
                                    <button
                                        type="button"
                                        onClick={() => setShowInfo(false)}
                                        className="absolute top-2 right-2 text-muted hover:text-ink transition-colors" aria-label='Cerrar explicación'
                                    >
                                        <XIcon
                                            size={14}
                                            duration={1}
                                            color="currentColor"
                                        />

                                    </button>
                                    <p className="text-xs font-semibold text-ink mb-1">¿Por qué este importe es diferente?</p>
                                    <p className="text-xs text-muted">
                                        Cuando actualizas tu plan, el nuevo plan empieza de inmediato y, como ya pagaste tu plan actual por adelantado, te abonamos <span className="font-semibold text-ink">{credit}€</span> por el tiempo no utilizado. Ese abono se aplica a tu nueva suscripción, haciendo que el pago de hoy sea más barato.
                                    </p>
                                </div>
                            )}
                        </div>

                        <p className="mt-4 text-xs text-muted">
                            El cambio se aplica de inmediato. Si tu banco requiere confirmación adicional, te lo pediremos a continuación.
                        </p>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="px-4 py-2.5 text-sm font-bold text-ink hover:bg-accent/10 rounded-lg transition-colors"
                            >
                                Cancelar
                            </button>

                            <button
                                type="button"
                                onClick={() => handleConfirm('yearly')}
                                disabled={loading}
                                className="bg-accent hover:bg-accent-dark text-white px-4 py-2.5 rounded-lg text-sm font-bold transition-colors"
                            >
                                {loading ? 'Procesando...' : 'Cambio a Anual'}
                            </button>
                        </div>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}
