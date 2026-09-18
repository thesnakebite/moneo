import { Head, Link, useForm } from '@inertiajs/react'
import { ReactElement } from 'react'
import AuthLayout from '@/Layouts/AuthLayout'
import InputError from '@/Components/InputError'

export default function Register() {
    const { data, setData, post, errors, processing } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        post('/register')
    }

    return (
        <>
            <Head title="Registro" />

            <form onSubmit={submit} className="mt-14 space-y-5" noValidate>
                <div className="space-y-2">
                    <label className="font-bold block text-sm sm:text-base" htmlFor="name">Nombre</label>

                    <input
                        id="name"
                        type="text"
                        placeholder="Tu Nombre"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="w-full border border-border-soft p-3 rounded-lg text-sm sm:text-base bg-ink/5 outline-none focus:border-accent focus:ring-0 placeholder:text-xs autofill:shadow-[0_0_0_1000px_var(--color-autofill)_inset] autofill:[-webkit-text-fill-color:var(--color-ink)]"
                    />
                    {errors.name && <InputError>{errors.name}</InputError>}
                </div>

                <div className="space-y-2">
                    <label className="font-bold block text-sm sm:text-base" htmlFor="email">Email</label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="w-full border border-border-soft p-3 rounded-lg text-sm sm:text-base bg-ink/5 outline-none focus:border-accent focus:ring-0 placeholder:text-xs autofill:shadow-[0_0_0_1000px_var(--color-autofill)_inset] autofill:[-webkit-text-fill-color:var(--color-ink)]"
                    />
                    {errors.email && <InputError>{errors.email}</InputError>}
                </div>

                <div className="space-y-2">
                    <label className="font-bold block text-sm sm:text-base" htmlFor="password">Password</label>

                    <input
                        id="password"
                        type="password"
                        placeholder="Password de Registro"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        className="w-full border border-border-soft p-3 rounded-lg text-sm sm:text-base bg-ink/5 outline-none focus:border-accent focus:ring-0 placeholder:text-xs autofill:shadow-[0_0_0_1000px_var(--color-autofill)_inset] autofill:[-webkit-text-fill-color:var(--color-ink)]"
                    />
                    {errors.password && <InputError>{errors.password}</InputError>}
                </div>

                <div className="space-y-2">
                    <label className="font-bold block text-sm sm:text-base" htmlFor="password_confirmation">Repetir Password</label>

                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repite tu contraseña"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        className="w-full border border-border-soft p-3 rounded-lg text-sm sm:text-base bg-ink/5 outline-none focus:border-accent focus:ring-0 placeholder:text-xs autofill:shadow-[0_0_0_1000px_var(--color-autofill)_inset] autofill:[-webkit-text-fill-color:var(--color-ink)]"
                    />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="bg-accent hover:bg-accent-dark disabled:opacity-40 w-full p-3 rounded-lg text-sm sm:text-base text-white font-bold transition-colors"
                >
                    {processing ? 'Creando cuenta...' : 'Crear una cuenta'}
                </button>
            </form>

            <p className="mt-6 text-center text-sm">
                ¿Ya tienes cuenta?{' '}
                <Link href="/login" className="font-bold text-accent hover:text-accent-dark">
                    Iniciar sesión
                </Link>
            </p>
        </>
    )
}

Register.layout = (page: ReactElement) => (
    <AuthLayout image="/images/auth/register-cover.jpg">{page}</AuthLayout>
)
