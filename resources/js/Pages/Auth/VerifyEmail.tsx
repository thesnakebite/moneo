import { Head, Link, router, usePage } from '@inertiajs/react'
import { useState } from 'react'
import { route } from 'ziggy-js'

export default function VerifyEmail() {
    const { flash } = usePage().props
    const [sending, setSending] = useState(false)

    const resend = () => {
        setSending(true)

        router.post(route('verification-send'), {}, {
            onFinish: () => setSending(false),
        })
    }

    return (
        <>
            <Head title="Confirma tu cuenta" />

            <div className="min-h-screen flex">
                <div
                    className="hidden lg:flex lg:w-1/2 relative h-screen bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/auth/verify-email.jpg')" }}
                >
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="relative z-10 flex flex-col justify-end p-10 text-white">
                        <span className="text-7xl font-unique text-accent">Moneo</span>
                        <p className="mt-2 text-sm text-surface">Gestiona tus gastos e ingresos en un único lugar.</p>
                    </div>
                </div>

                <div className="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-10">
                    <div className="w-full max-w-md space-y-6">
                        <div>
                            <p className="text-lg font-bold text-ink">Tu cuenta fue creada con éxito</p>
                            <p className="mt-2 text-sm text-muted">
                                Ahora solo debes confirmar tu cuenta. Hemos enviado un enlace de verificación a tu correo.
                            </p>
                        </div>

                        {flash.success && (
                            <p className="px-2 py-2 border-l-8 border-green-500 bg-green-50 text-center text-sm text-green-700">
                                {flash.success}
                            </p>
                        )}

                        <button
                            type="button"
                            onClick={resend}
                            disabled={sending}
                            className="w-full p-3 rounded-lg text-sm font-bold bg-accent hover:bg-accent-dark disabled:opacity-40 text-white transition-colors"
                        >
                            {sending ? 'Enviando...' : 'Reenviar email de verificación'}
                        </button>

                        <Link
                            href="/login"
                            className="block text-center text-sm font-bold border border-border-soft hover:bg-accent/10 w-full p-3 rounded-lg transition-colors"
                        >
                            Volver a inicio de sesión
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
