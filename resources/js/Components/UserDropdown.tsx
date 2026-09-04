import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { Cog6ToothIcon, KeyIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline'


type Props = {
    userName: string
    subscribed: boolean
}

export default function UserDropdown({ userName, subscribed }: Props) {
    return (
        <Menu>
            <MenuButton className="flex items-center gap-1.5 text-sm font-semibold text-muted outline-none hover:text-ink transition-colors">
                <div className="relative">
                    <div className="flex size-7 items-center justify-center rounded-full bg-border-soft text-ink text-xs font-bold">
                        {userName.charAt(0).toUpperCase()}
                    </div>

                    {subscribed && (
                        <span className="absolute -bottom-1.5 -right-2 text-[8px] font-bold text-white bg-accent px-1.5 py-0.5 rounded-full ring-2 ring-surface leading-none whitespace-nowrap">
                            PRO
                        </span>
                    )}
                </div>
                <ChevronDownIcon className="size-4 text-border-soft" />
            </MenuButton>

            <MenuItems
                anchor="bottom end"
                transition
                className="w-48 rounded-xl bg-surface shadow-lg outline-1 outline-border-soft/30 py-2 z-10 transition duration-100 ease-out data-closed:scale-95 data-closed:opacity-0"
            >
                <MenuItem>
                    <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-ink data-focus:bg-accent/10">
                        <Cog6ToothIcon className="size-4 text-muted" />
                        Ajustes
                    </a>
                </MenuItem>

                <MenuItem>
                    <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-ink data-focus:bg-accent/10">
                        <KeyIcon className="size-4 text-muted" />
                        Cambiar contraseña
                    </a>
                </MenuItem>

                <MenuItem>
                    <form action="/logout" method="POST">
                        <input type="hidden" name="_token" value={document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? ''} />
                        <button type="submit" className="group w-full flex items-center gap-3 px-4 py-2 text-sm text-ink hover:bg-red-50 hover:text-red-600 data-focus:bg-red-50 data-focus:text-red-600">
                            <ArrowRightStartOnRectangleIcon className="size-4 text-muted group-hover:text-red-500" />
                            Cerrar sesión
                        </button>
                    </form>
                </MenuItem>
            </MenuItems>
        </Menu>
    )
}
