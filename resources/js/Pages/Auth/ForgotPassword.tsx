import { Head, Link, useForm, usePage } from '@inertiajs/react'
import { ReactElement, useEffect } from 'react'
import { toast, Toaster } from 'sonner'
import AuthLayout from '@/Layouts/AuthLayout'
import InputError from '@/Components/InputError'
import { route } from 'ziggy-js'

export default function ForgotPassword() {
    const { flash } = usePage().props

    const { data, setData, post, errors, processing } = useForm({
        email: '',
    })

    useEffect(() => {
        if (flash.success) toast.success(flash.success)
    }, [flash.success])

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        post(route('password.email'))
    }

    return (
        <>
            <Head title="Recuperar contraseña" />

            <div>
                <p className="text-lg font-bold text-ink">¿Olvidaste tu contraseña?</p>
                <p className="mt-2 text-sm text-muted">
                    Introduce tu email y te enviaremos un enlace para restablecerla.
                </p>
            </div>

            <form onSubmit={submit} className="mt-8 space-y-5">
                <div className="flex flex-col gap-2">
                    <label className="font-bold text-sm sm:text-base" htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="w-full border border-border-soft p-3 rounded-lg text-sm sm:text-base bg-ink/5 outline-none focus:border-accent focus:ring-0 placeholder:text-xs autofill:shadow-[0_0_0_1000px_var(--color-autofill)_inset] autofill:[-webkit-text-fill-color:var(--color-ink)]"
                    />
                    {errors.email && <InputError>{errors.email}</InputError>}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="bg-accent hover:bg-accent-dark disabled:opacity-40 w-full p-3 rounded-lg text-sm sm:text-base text-white font-bold transition-colors"
                >
                    {processing ? 'Enviando...' : 'Enviar enlace de recuperación'}
                </button>
            </form>

            <p className="mt-6 text-center text-sm">
                <Link href="/login" className="font-bold text-accent hover:text-accent-dark">
                    Volver a inicio de sesión
                </Link>
            </p>

            <Toaster position="bottom-center" />
        </>
    )
}

ForgotPassword.layout = (page: ReactElement) => (
    <AuthLayout image="/images/auth/forgot-password-cover.jpg">{page}</AuthLayout>
)
