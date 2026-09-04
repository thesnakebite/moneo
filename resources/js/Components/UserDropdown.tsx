import { useRef } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon, CreditCardIcon, KeySquareIcon, LogOutIcon } from "@animateicons/react/lucide"
import type { CreditCardIconHandle, KeySquareIconHandle, LogOutIconHandle } from "@animateicons/react/lucide"
import { Settings02Icon, Settings02IconHandle } from "@animateicons/react/huge"
import { Link } from '@inertiajs/react'

type Props = {
    userName: string
    subscribed: boolean
}

export default function UserDropdown({ userName, subscribed }: Props) {
    const billingIconRef = useRef<CreditCardIconHandle>(null)
    const settingIconRef = useRef<Settings02IconHandle>(null)
    const passwordIconRef = useRef<KeySquareIconHandle>(null)
    const logoutIconRef = useRef<LogOutIconHandle>(null)

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
                <ChevronDownIcon size={16} duration={1} color="var(--color-accent)" />
            </MenuButton>

            <MenuItems
                anchor="bottom end"
                transition
                className="w-48 rounded-xl bg-surface shadow-lg outline-1 outline-border-soft/30 py-2 z-10 transition duration-100 ease-out data-closed:scale-95 data-closed:opacity-0"
            >
                <MenuItem>
                    <Link
                        href={subscribed ? '/subscription' : '/billing'}
                        onMouseEnter={() => billingIconRef.current?.startAnimation()}
                        onMouseLeave={() => billingIconRef.current?.stopAnimation()}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-ink data-focus:bg-accent/10"
                    >
                        <CreditCardIcon ref={billingIconRef} size={18} duration={1} color='currentColor' />
                        {subscribed ? 'Mi suscripción' : 'Hazte PRO'}
                    </Link>
                </MenuItem>

                <MenuItem>
                    <a
                        href="#"
                        onMouseEnter={() => settingIconRef.current?.startAnimation()}
                        onMouseLeave={() => settingIconRef.current?.stopAnimation()}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-ink data-focus:bg-accent/10"
                    >
                        <Settings02Icon ref={settingIconRef} size={18} duration={1} color='currentColor' />
                        Ajustes
                    </a>
                </MenuItem>

                <MenuItem>
                    <a
                        href="#"
                        onMouseEnter={() => passwordIconRef.current?.startAnimation()}
                        onMouseLeave={() => passwordIconRef.current?.stopAnimation()}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-ink data-focus:bg-accent/10"
                    >
                        <KeySquareIcon ref={passwordIconRef} size={18} duration={1} color='currentColor'/>
                        Cambiar contraseña
                    </a>
                </MenuItem>

                <div className="my-0.5 h-px bg-muted/20" />

                <MenuItem>
                    <form action="/logout" method="POST">
                        <input type="hidden" name="_token" value={document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? ''} />
                        <button
                            type="submit"
                            onMouseEnter={() => logoutIconRef.current?.startAnimation()}
                            onMouseLeave={() => logoutIconRef.current?.stopAnimation()}
                            className="group w-full flex items-center gap-3 px-4 py-2 text-sm text-ink hover:bg-red-50 hover:text-red-600 data-focus:bg-red-50 data-focus:text-red-600"
                        >
                            <LogOutIcon ref={logoutIconRef} size={18} duration={1} color='currentColor' />
                            Cerrar sesión
                        </button>
                    </form>
                </MenuItem>
            </MenuItems>
        </Menu>
    )
}
