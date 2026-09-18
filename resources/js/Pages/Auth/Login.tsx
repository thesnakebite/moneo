import { Head, Link, useForm } from '@inertiajs/react'
import { ReactElement } from 'react'
import AuthLayout from '@/Layouts/AuthLayout'
import InputError from '@/Components/InputError'

export default function Login() {
    const { data, setData, post, errors, processing } = useForm({
        email: '',
        password: '',
        remember: false,
    })

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        post('/login')
    }

    return (
        <>
            <Head title="Iniciar sesión" />

            <form onSubmit={submit} className="mt-14 space-y-5" noValidate>
                <div className="flex flex-col gap-2">
                    <label className="font-bold text-sm sm:text-base" htmlFor="email">Email</label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="w-full border border-border-soft p-3 rounded-lg text-sm sm:text-base bg-ink/5 outline-none focus:border-accent focus:ring-0 placeholder:text-xs autofill:shadow-[0_0_0_1000px_var(--color-autofill)_inset] autofill:[-webkit-text-fill-color:var(--color-ink)]"
                        tabIndex={1}
                    />
                    {errors.email && <InputError>{errors.email}</InputError>}
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <label className="font-bold text-sm sm:text-base" htmlFor="password">Password</label>
                        <a href="#" className="text-accent-dark text-xs font-semibold" tabIndex={3}>¿Olvidaste tu Contraseña?</a>
                    </div>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password de Registro"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        className="w-full border border-border-soft p-3 rounded-lg text-sm sm:text-base bg-ink/5 outline-none focus:border-accent focus:ring-0 placeholder:text-xs autofill:shadow-[0_0_0_1000px_var(--color-autofill)_inset] autofill:[-webkit-text-fill-color:var(--color-ink)]"
                        tabIndex={2}
                    />
                    {errors.password && <InputError>{errors.password}</InputError>}
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked)}
                        className="appearance-none w-4 h-4 border border-border-soft rounded checked:bg-accent focus:outline-none focus:ring-1 focus:ring-muted focus:ring-offset-1 bg-transparent"
                        id="remember"
                        tabIndex={4}
                    />
                    <label htmlFor="remember" className="text-sm">Recuérdame</label>
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="bg-accent hover:bg-accent-dark disabled:opacity-40 w-full p-3 rounded-lg text-sm sm:text-base text-white font-bold transition-colors"
                >
                    {processing ? 'Entrando...' : 'Iniciar Sesión'}
                </button>
            </form>

            <p className="mt-6 text-center text-sm">
                ¿No tienes cuenta?{' '}
                <Link href="/register" className="font-bold text-accent hover:text-accent-dark">
                    Regístrate
                </Link>
            </p>
        </>
    )
}

Login.layout = (page: ReactElement) => (
    <AuthLayout image="/images/auth/login-cover.jpg">{page}</AuthLayout>
)
