import { Link } from '@inertiajs/react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon, EyeIcon, PencilIcon, Trash2Icon } from '@animateicons/react/lucide'
import type { PencilIconHandle, Trash2IconHandle, EyeIconHandle } from '@animateicons/react/lucide'
import { Budget } from '@/types/budget'
import { useRef } from 'react'

type Props = {
    budget: Budget
}

export default function BudgetDropdown({ budget }: Props) {
    const viewIconRef = useRef<EyeIconHandle>(null)
    const editIconRef = useRef<PencilIconHandle>(null)
    const deleteIconRef = useRef<Trash2IconHandle>(null)

    return (
        <Menu>
            <MenuButton
                className="text-muted outline-none"
                onClick={(e) => e.stopPropagation()}
            >
                <EllipsisVerticalIcon size={20} duration={1} color="var(--color-accent)" />
            </MenuButton>

            <MenuItems
                transition
                anchor="bottom end"
                className="w-40 origin-top-right rounded-xl border border-border-soft bg-surface p-1 text-sm text-ink shadow-lg transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
            >
                <MenuItem>
                    <Link
                        href={`/budgets/${budget.id}`}
                        onMouseEnter={() => viewIconRef.current?.startAnimation()}
                        onMouseLeave={() => viewIconRef.current?.stopAnimation()}
                        className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-accent/10 focus:outline-none"
                    >
                        <EyeIcon ref={viewIconRef} size={16} duration={1} color='currentColor' />
                        Ver
                    </Link>
                </MenuItem>

                <MenuItem>
                    <Link
                        href={`/budgets/${budget.id}/edit`}
                        onMouseEnter={() => editIconRef.current?.startAnimation()}
                        onMouseLeave={() => editIconRef.current?.stopAnimation()}
                        className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-accent/10 focus:outline-none"
                    >
                        <PencilIcon ref={editIconRef} size={16} duration={1} color="currentColor" />
                        Editar
                    </Link>
                </MenuItem>

                <div className="my-0.5 h-px bg-muted/20" />

                <MenuItem>
                    <button
                        type="button"
                        onMouseEnter={() => deleteIconRef.current?.startAnimation()}
                        onMouseLeave={() => deleteIconRef.current?.stopAnimation()}
                        className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-red-600 data-focus:bg-red-50 focus:outline-none"
                    >
                        <Trash2Icon ref={deleteIconRef} size={16} duration={1} color='#dc2626' />
                        Eliminar
                    </button>
                </MenuItem>
            </MenuItems>
        </Menu>
    )
}
