import { router } from '@inertiajs/react'
import { route } from 'ziggy-js'
import { useEffect, useRef, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { Trash2Icon, type Trash2IconHandle } from '@animateicons/react/lucide'
import { useBudgetDeleteModalStore } from '@/stores/budget-delete-store'
import { TRASH_RETENTION_DAYS } from '@/utils/budget'

export default function DeleteBudgetModal() {
    const open = useBudgetDeleteModalStore((state) => state.open)
    const budget = useBudgetDeleteModalStore((state) => state.budget)
    const closeModal = useBudgetDeleteModalStore((state) => state.closeModal)

    const trashIconRef = useRef<Trash2IconHandle>(null)
    const [animationKey, setAnimationKey] = useState(0)
    const [processing, setProcessing] = useState(false)

    useEffect(() => {
        if (open) {
            setAnimationKey((prev) => prev + 1)
        }
    }, [open])

    useEffect(() => {
        if (open) {
            const timeout = setTimeout(() => trashIconRef.current?.startAnimation(), 50)
            return () => clearTimeout(timeout)
        }
    }, [open, animationKey])

    if (!budget) return null

    const handleDelete = () => {
        setProcessing(true)

        router.delete(
            route('budgets.destroy', { budget: budget.id }),
            {
                onSuccess: () => {
                    setProcessing(false)
                    closeModal()
                },
                onError: () => setProcessing(false),
                preserveScroll: true,
            }
        )
    }

    return (
        <Dialog open={open} onClose={closeModal} className="relative z-50">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-ink/40 duration-200 ease-out data-closed:opacity-0"
            />

            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel
                    transition
                    className="w-full max-w-md rounded-2xl bg-surface p-6 shadow-xl duration-200 ease-out data-closed:scale-95 data-closed:opacity-0"
                >
                    <div className="flex items-start gap-4">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-red-100">
                            <Trash2Icon key={animationKey} ref={trashIconRef} size={20} color="var(--color-ink)" />
                        </div>

                        <div>
                            <DialogTitle className="text-base font-bold text-ink">
                                ¿Mover a la papelera?
                            </DialogTitle>
                            <p className="mt-1 text-sm text-muted">
                                «{budget.name}» se moverá a la papelera. Podrás restaurarlo durante {TRASH_RETENTION_DAYS} días; después se eliminará definitivamente junto con sus gastos.
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={closeModal}
                            disabled={processing}
                            className="px-4 py-2.5 text-sm font-bold text-ink hover:bg-accent/10 rounded-lg transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={processing}
                            className="bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white px-4 py-2.5 rounded-lg text-sm font-bold"
                        >
                            {processing ? 'Moviendo...' : 'Mover a la papelera'}
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}
