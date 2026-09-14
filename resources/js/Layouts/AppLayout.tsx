import { Link, usePage } from '@inertiajs/react'
import { PropsWithChildren, useEffect } from 'react'
import UserDropdown from '@/Components/UserDropdown'
import Footer from '@/Components/Footer'
import { toast, Toaster } from 'sonner'

export default function AppLayout({ children }: PropsWithChildren) {
    const { user } = usePage().props
    const { flash } = usePage().props

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success)
        }
        if (flash.error) {
            toast.error(flash.error)
        }
    }, [flash.success])

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
                        {user?.user && <UserDropdown userName={user.user.name} subscribed={user.subscribed} />}
                    </div>
                </nav>
            </header>

            <main className="flex-1 p-6">{children}</main>

            <Footer />
            <Toaster position="bottom-center" />
        </div>
    )
}
