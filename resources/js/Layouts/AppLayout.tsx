import { Link, usePage } from '@inertiajs/react'
import { PropsWithChildren } from 'react'
import UserDropdown from '@/Components/UserDropdown'
import Footer from '@/Components/Footer'
import { Toaster } from 'sonner'
import { useFlashToasts } from '@/hooks/useFlashToasts'

export default function AppLayout({ children }: PropsWithChildren) {
    const { user } = usePage().props

    useFlashToasts()

    return (
        <div className="min-h-screen flex flex-col">
            <header className="border-b border-border-soft [view-transition-name:app-header]">
                <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between py-1 px-6 lg:px-8">
                    <div className="flex lg:flex-1">
                        <Link href="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">Moneo</span>
                            <span className="text-muted font-unique text-6xl">Moneo</span>
                        </Link>
                    </div>

                    <div className="flex lg:flex-1 lg:justify-end">
                        {user?.user && <UserDropdown userName={user.user.name} avatarUrl={user.user.avatar_url} subscribed={user.subscribed} />}
                    </div>
                </nav>
            </header>

            <main className="flex-1 px-3 sm:px-6 py-6">{children}</main>

            <Footer />
            <Toaster position="bottom-center" />
        </div>
    )
}
