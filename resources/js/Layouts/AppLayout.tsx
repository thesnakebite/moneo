import { PropsWithChildren } from 'react'
import { Link, usePage } from '@inertiajs/react'
import UserDropdown from '@/Components/UserDropdown'

export default function AppLayout({ children }: PropsWithChildren) {
    const { user } = usePage().props

    return (
        <div className="min-h-screen flex flex-col">
            <header className="border-b border-border-soft">
                <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between py-1 px-6 lg:px-8">
                    <div className="flex lg:flex-1">
                        <Link href="/dashboard" className="-m-1.5 p-1.5">
                            <span className="sr-only">Moneo</span>
                            <span className="text-muted font-unique text-6xl">Moneo</span>
                        </Link>
                    </div>

                    <div className="flex lg:flex-1 lg:justify-end">
                        {user && <UserDropdown userName={user.name} />}
                    </div>
                </nav>
            </header>

            <main className="flex-1 p-6">{children}</main>
        </div>
    )
}
