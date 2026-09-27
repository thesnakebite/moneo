import { Head, useForm } from '@inertiajs/react'
import React, { ReactElement, useRef } from 'react'
import AuthLayout from '@/Layouts/AuthLayout'
import { route } from 'ziggy-js'
import { MailIcon, type MailIconHandle } from "@animateicons/react/lucide"
import InputError from '@/Components/InputError'

type Props = {
    token: string
    email: string | null
}

export default function ResetPassword({ token, email }: Props) {
    const mailIconRef = useRef<MailIconHandle>(null)

    const { data, setData, post, errors, processing } = useForm({
        token: token,
        email: email ?? '',
        password: '',
        password_confirmation: '',
    })

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        post(route('password.reset.update'))
    }

    return (
        <>
            <Head title="Restablecer contraseña" />

            <div>
                <p className="text-lg font-bold text-ink">Restablece tu contraseña</p>
                <p className="mt-2 text-sm text-muted">
                    Introduce tu nueva contraseña para recuperar el acceso a tu cuenta.
                </p>
            </div>

            <form onSubmit={submit} className="mt-8 space-y-5">
                <div
                    className="flex items-center gap-3 rounded-xl border border-border-soft bg-surface p-4"
                    onMouseEnter={() => mailIconRef.current?.startAnimation()}
                    onMouseLeave={() => mailIconRef.current?.stopAnimation()}
                >
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent/15">
                        <MailIcon ref={mailIconRef} size={16} color="var(--color-accent)" />
                    </div>
                    <div>
                        <p className="text-xs text-muted">Restableciendo la contraseña de</p>
                        <p className="text-sm font-semibold text-ink">{data.email}</p>
                    </div>
                </div>
                {errors.email && <InputError>{errors.email}</InputError>}

                <div className="flex flex-col gap-2">
                    <label className="font-bold text-sm sm:text-base" htmlFor="password">Nueva contraseña</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Mínimo 8 caracteres"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        className="w-full border border-border-soft p-3 rounded-lg text-sm sm:text-base bg-ink/5 outline-none focus:border-accent focus:ring-0 placeholder:text-xs autofill:shadow-[0_0_0_1000px_var(--color-autofill)_inset] autofill:[-webkit-text-fill-color:var(--color-ink)]"
                    />
                    {errors.password && <InputError>{errors.password}</InputError>}
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-bold text-sm sm:text-base" htmlFor="password_confirmation">Repite la contraseña</label>
                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Confírmala"
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
                    {processing ? 'Restableciendo...' : 'Restablecer contraseña'}
                </button>
            </form>
        </>
    )
}

ResetPassword.layout = (page: ReactElement) => (
    <AuthLayout image='/images/auth/reset-password-cover.jpg'>{page}</AuthLayout>
)

