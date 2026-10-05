import { useRef } from 'react'
import { useDeleteExpenseStore } from '@/stores/expense-delete-store'
import { useExpenseModalStore } from '@/stores/expense-modal-store'
import { Expense } from '@/types/expense'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { PencilIcon, Trash2Icon } from "@animateicons/react/lucide"
import type { PencilIconHandle, Trash2IconHandle } from "@animateicons/react/lucide"

type Props = {
    expense: Expense
}

export default function ExpenseDropdown({ expense }: Props) {
    const openEditModal = useExpenseModalStore(state => state.openEditModal)
    const openDeleteModal = useDeleteExpenseStore(state => state.openModal)
    const PencilIconRef = useRef<PencilIconHandle>(null)
    const Trash2IconRef = useRef<Trash2IconHandle>(null)

    return (
        <Menu>
            <MenuButton className="text-gray-400 hover:text-gray-600 focus:outline-none">
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                    <circle cx="12" cy="5" r="1.75" />
                    <circle cx="12" cy="12" r="1.75" />
                    <circle cx="12" cy="19" r="1.75" />
                </svg>
            </MenuButton>

            <MenuItems
                transition
                anchor="bottom end"
                className="w-40 origin-top-right rounded-xl border border-gray-200 bg-white p-1 text-sm text-gray-700 shadow-lg transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
            >
                <MenuItem>
                    <button
                        type="button"
                        onMouseEnter={() => PencilIconRef.current?.startAnimation()}
                        onMouseLeave={() => PencilIconRef.current?.stopAnimation()}
                        onClick={() => openEditModal(expense)}
                        className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-gray-100 focus:outline-none"
                    >
                        <PencilIcon ref={PencilIconRef} size={16} duration={1} color="currentColor" />
                        Editar
                    </button>
                </MenuItem>

                <div className="my-1 h-px bg-gray-100" />

                <MenuItem>
                    <button
                        onMouseEnter={() => Trash2IconRef.current?.startAnimation()}
                        onMouseLeave={() => Trash2IconRef.current?.stopAnimation()}
                        onClick={() => openDeleteModal(expense)}
                        className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-red-600 data-focus:bg-red-50 focus:outline-none"
                    >
                        <Trash2Icon ref={Trash2IconRef} size={16} duration={1} color="currentColor" />
                        Eliminar
                    </button>
                </MenuItem>
            </MenuItems>
        </Menu>
    )
}
