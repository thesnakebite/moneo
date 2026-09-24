import { Head, useForm } from "@inertiajs/react"
import { ReactElement } from "react"
import AppLayout from "@/Layouts/AppLayout"
import PageHeader from "@/Components/PageHeader"
import { KeySquareIcon } from "@animateicons/react/lucide"
import InputError from "@/Components/InputError"
import { route } from "ziggy-js"

export default function UpdatePassword() {
    const { data, setData, put, errors, processing, reset } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    })

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        put(route('settings.password.update'), {
            onSuccess: () => reset(),
        })
    }

    return (
        <>
            <Head title="Cambiar contraseña" />

            <PageHeader
                title="Cambiar contraseña"
                description="Actualizar tu contraseña para mantener tu cuenta segura."
                backHref="/settings/profile"
                backLabel="Volver a mi perfil"
                icon={<KeySquareIcon size={24} color="var(--color-accent)" />}
            />

            <div className="max-w-2xl mx-auto">
                <form onSubmit={submit} className="rounded-2xl border border-border-soft bg-muted/10 p-6 space-y-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="current_password" className="text-sm font-bold text-ink">Contraseña actual</label>
                        <input
                            id="current_password"
                            type="password"
                            placeholder="Tu contraseña actual"
                            value={data.current_password}
                            onChange={(e) => setData('current_password', e.target.value)}
                            className="w-full border border-border-soft bg-ink/5 placeholder:text-xs autofill:shadow-[0_0_0_1000px_var(--color-autofill)_inset] autofill:[-webkit-text-fill-color:var(--color-ink)] p-3 rounded-lg text-sm outline-none focus:border-accent focus:ring-0"
                        />
                        {errors.current_password && <InputError>{errors.current_password}</InputError>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-sm font-bold text-ink">Nueva contraseña</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="¿Cuál será tu nueva contraseña?"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full border border-border-soft bg-ink/5 placeholder:text-xs autofill:shadow-[0_0_0_1000px_var(--color-autofill)_inset] autofill:[-webkit-text-fill-color:var(--color-ink)] p-3 rounded-lg text-sm outline-none focus:border-accent focus:ring-0"
                        />
                        {errors.password && <InputError>{errors.password}</InputError>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="password_confirmation" className="text-sm font-bold text-ink">Repite la nueva contraseña</label>
                        <input
                            id="password_confirmation"
                            type="password"
                            placeholder="Escríbela una vez más"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            className="w-full border border-border-soft bg-ink/5 placeholder:text-xs autofill:shadow-[0_0_0_1000px_var(--color-autofill)_inset] autofill:[-webkit-text-fill-color:var(--color-ink)] p-3 rounded-lg text-sm outline-none focus:border-accent focus:ring-0"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-accent hover:bg-accent-dark disabled:opacity-40 text-white px-4 py-2.5 rounded-lg text-sm font-bold transition-colors"
                    >
                        {processing ? 'Guardando...' : 'Actualizar contraseña'}
                    </button>
                </form>
            </div>
        </>
    )
}

UpdatePassword.layout = (page: ReactElement) => <AppLayout>{page}</AppLayout>
