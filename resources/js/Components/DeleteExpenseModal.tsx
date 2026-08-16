import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react"
import { router } from "@inertiajs/react"
import { useDeleteExpenseStore } from "@/stores/expense-delete-store"
import { useExpenseModalStore } from "@/stores/expense-modal-store"
import { route } from "ziggy-js"


export default function DeleteExpenseModal() {
    const budget = useExpenseModalStore(state => state.budget)
    const open = useDeleteExpenseStore(state => state.open)
    const expense = useDeleteExpenseStore(state => state.expense)
    const closeModal = useDeleteExpenseStore(state => state.closeModal)

    if(!budget || !expense) return null

    const handleDelete = () => {
        router.delete(
            route('budgets.expenses.destroy', {
                budget: budget.id,
                expense: expense.id
            }), {
                onSuccess: () => {
                    closeModal()
                },
                preserveScroll: true
            }
        )
    }

    return (
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
                    <div className="flex items-start gap-4">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-red-100">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5 text-red-600">
                                <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>

                        <div>
                            <DialogTitle className="text-base font-bold text-gray-900">
                                Eliminar gasto
                            </DialogTitle>
                            <p className="mt-1 text-sm text-gray-500">
                                «{expense?.name}» se eliminará permanentemente. Esta acción no se puede deshacer.
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-100 rounded-lg"
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white px-4 py-2.5 rounded-lg text-sm font-bold"
                        >
                            Eliminar
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}
