import { Head, useForm, Link, router, usePage } from "@inertiajs/react"
import { ReactElement, useRef, useState } from "react"
import { route } from 'ziggy-js'
import AppLayout from "@/Layouts/AppLayout"
import PageHeader from "@/Components/PageHeader"
import { UserCogIcon } from "@animateicons/react/lucide"
import InputError from "@/Components/InputError"

type Props = {
    profile : {
        name: string,
        email: string,
        avatar_url: string | null,
    }
}

export default function UpdateProfile({ profile }: Props) {
    const { errors: pageErrors, user } = usePage().props
    const subscribed = user?.subscribed ?? false
    const plan = user?.plan

    const fileInputRef = useRef<HTMLInputElement>(null)
    const [uploading, setUploading] = useState(false)

    const { data, setData, put, errors, processing } = useForm({
        name: profile.name,
        email: profile.email,
    })

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)

        const formData = new FormData()
        formData.append('avatar', file)

        router.post('/settings/avatar', formData, {
            forceFormData: true,
            onFinish: () => {
                setUploading(false)
                if (fileInputRef.current) fileInputRef.current.value = ''
            },
        })
    }

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        put(route('settings.profile.update'))
    }

    return (
        <>
            <Head title="Ajustes del perfil" />

            <PageHeader
                title="Ajustes de perfil"
                description="Actualiza tu información personal y gestiona tu cuenta."
                backHref="/dashboard"
                backLabel="Vuelve a dashboard"
                icon={<UserCogIcon size={22} color="var(--color-accent)" />}
            />

            <div className="max-w-2xl mx-auto space-y-6 mb-10">
                {/* Avatar */}
                <div className="rounded-2xl border border-border-soft bg-muted/10 p-6">
                    <p className="text-sm font-bold text-ink mb-4">Foto de perfil</p>
                    <div className="flex items-center gap-4">
                        {profile.avatar_url ? (
                            <img
                                src={profile.avatar_url}
                                alt={profile.name}
                                className="flex size-16 aspect-square rounded object-cover"
                            />
                        ) : (
                            <div className="flex size-16 items-center justify-center aspect-square rounded bg-accent/15 text-accent text-2xl font-bold">
                                {profile.name.charAt(0).toUpperCase()}
                            </div>
                        )}
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                            className="text-xs font-bold text-accent hover:text-accent-dark cursor-pointer transition-colors"
                        >
                            {uploading ? 'Subiendo...' : '¿Necesitas editar tu avatar?'}
                        </button>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleAvatarChange}
                        />
                    </div>
                    <div className="mt-2">
                        {pageErrors.avatar && <InputError>{pageErrors.avatar}</InputError>}
                    </div>
                </div>

                {/* Credentials profile */}
                <form
                    onSubmit={submit}
                    className="rounded-2xl border border-border-soft bg-muted/10 p-6 space-y-4"
                >
                    <p className="text-sm font-bold text-ink">Información personal</p>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-sm font-bold text-ink">Nombre</label>
                        <input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            type="text"
                            className="w-full border border-border-soft bg-ink/5 autofill:shadow-[0_0_0_1000px_var(--color-autofill)_inset] autofill:[-webkit-text-fill-color:var(--color-ink)] p-3 rounded-lg text-sm outline-none focus:border-accent focus:ring-0"
                        />
                        {errors.name && <InputError>{errors.name}</InputError>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm font-bold text-ink">Email</label>
                        <input
                            id="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            type="email"
                            className="w-full border border-border-soft bg-ink/5 autofill:shadow-[0_0_0_1000px_var(--color-autofill)_inset] autofill:[-webkit-text-fill-color:var(--color-ink)] p-3 rounded-lg text-sm outline-none focus:border-accent focus:ring-0"
                        />
                        {errors.email && <InputError>{errors.email}</InputError>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-accent hover:bg-accent-dark disabled:opacity-40 text-white px-4 py-2.5 rounded-lg text-sm font-bold transition-colors"
                    >
                        {processing ? 'Guardando...' : 'Guardar cambios'}
                    </button>
                </form>

                {/* Links */}
                <div className="rounded-2xl border border-border-soft bg-muted/10 p-6 space-y-3">
                    <Link href="/subscription" className="flex items-center justify-between text-sm font-bold text-ink hover:text-accent transition-colors">
                        Mi suscripción
                    </Link>
                    <Link href="#" className="flex items-center justify-between text-sm font-bold text-ink hover:text-accent transition-colors">
                        Cambiar contraseña
                    </Link>
                </div>

                {/* Danger */}
                <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
                    <p className="text-sm font-bold text-red-700 mb-1">Eliminar cuenta</p>
                        <p className="text-xs text-red-600/80 mb-3">
                            Si deseas borrar toda tu presencia en Moneo, haz clic en el botón de abajo.
                            Ten en cuenta que esta es una acción irreversible que eliminará tu cuenta
                            de Moneo y toda la actividad asociada a ella.
                        </p>
                        <Link
                            type="button"
                            href="/settings/account/delete"
                            className="text-sm font-bold bg-red-400 text-white hover:bg-red-500 px-4 py-2.5 rounded-lg transition-colors"
                        >
                            Eliminar mi cuenta
                        </Link>
                </div>
            </div>
        </>
    )
}

UpdateProfile.layout = (page:ReactElement) => <AppLayout>{page}</AppLayout>
