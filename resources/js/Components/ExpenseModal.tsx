import { useExpenseModalStore } from '@/stores/expense-modal-store'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'

export default function ExpenseModal() {
    const open = useExpenseModalStore(state => state.open)
    const openCreateModal = useExpenseModalStore((state) => state.openCreateModal)
    const closeModal = useExpenseModalStore((state) => state.closeModal)

    return (
        <>
            <button
                type="button"
                onClick={openCreateModal}
                className="bg-gray-900 text-white text-center px-2 sm:px-4 py-1.5 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold"
            >
                Añadir gasto
            </button>

            <Dialog open={open} onClose={closeModal} className="relative z-50">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-black/25 duration-200 ease-out data-closed:opacity-0"
                />

                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl duration-200 ease-out data-closed:scale-95 data-closed:opacity-0"
                    >
                        <DialogTitle className="text-lg font-bold text-gray-900">
                            Nuevo gasto
                        </DialogTitle>

                        <div className="mt-4">
                            {/* aquí irá el formulario del gasto */}
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="bg-red-500 hover:bg-red-400 text-white text-center px-2 sm:px-4 py-1.5 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold"
                            >
                                Cancelar
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}
