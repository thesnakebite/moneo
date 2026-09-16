import { Head, router, usePage } from '@inertiajs/react'
import { useState } from 'react'
import { route } from 'ziggy-js'
import { MailIcon } from '@animateicons/react/lucide'

export default function VerifyEmail() {
    const { user } = usePage().props
    const [sending, setSending] = useState(false)

    const resend = () => {
        setSending(true)

        router.post(route('verification-send'), {}, {
            onFinish: () => setSending(false),
        })
    }

    return (
        <>
            <Head title="Confirma tu email" />

            <div className="min-h-screen flex items-center justify-center p-6">
                <div className="max-w-md w-full rounded-2xl border border-border-soft bg-muted/10 p-8 text-center">
                    <MailIcon size={32} color="var(--color-accent)" className="mx-auto mb-4" />

                    <h1 className="text-lg font-bold text-ink mb-2">Confirma tu email</h1>

                    <p className="text-sm text-muted mb-6">
                        Hemos enviado un enlace de verificación a{' '}
                        <span className="font-semibold text-ink">{user?.user?.email}</span>.
                        Haz clic en él para confirmar tu cuenta.
                    </p>

                    <button
                        type="button"
                        onClick={resend}
                        disabled={sending}
                        className="bg-accent hover:bg-accent-dark disabled:opacity-40 text-white px-4 py-2.5 rounded-lg text-sm font-bold transition-colors w-full"
                    >
                        {sending ? 'Enviando...' : 'Reenviar email de verificación'}
                    </button>
                </div>
            </div>
        </>
    )
}
