import { Head, Link, router } from "@inertiajs/react"
import AppLayout from '@/Layouts/AppLayout'
import PageHeader from '@/Components/PageHeader'
import { ReactElement, useState } from 'react'
import { Radio, RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { route } from 'ziggy-js'
import { TrashIcon } from '@animateicons/react/lucide'

type Props = {
    subscribed: boolean
    plan: 'monthly' | 'yearly' | null
}

const reasons = [
    'Ya no necesito la app',
    'Encontré una alternativa mejor',
    'Es demasiado complicada de usar',
    'Es demasiado caro',
    'Problemas técnicos',
    'Otro motivo',
]

export default function DeleteAccount ({ subscribed, plan }: Props) {
    const [reason, setReason] = useState<string | null>(null)
    const [processing, setProcessing] = useState(false)

    const handleDelete = () => {
        setProcessing(true)

        router.delete(route('settings.account.destroy'), {
            data: { reason },
            onSuccess: () => {
                window.location.href = '/login'
            },
            onFinish: () => setProcessing(false),
        })
    }


    return (
        <>
            <Head title="Eliminar cuenta" />

            <PageHeader
                title='Eliminar cuenta'
                description='Esta acción es permanente y no se puede deshacer.'
                backHref='/settings/profile'
                backLabel='Volver a mi perfil'
                icon={<TrashIcon size={24} color="var(--color-accent)" />}
            />

            <div className="max-w-2xl mx-auto space-y-6 mb-10">
                {subscribed ? (
                    <div className="rounded-2xl border border-amber-300 bg-amber-50 p-6">
                        <p className="text-sm font-bold text-amber-800 mb-1">
                            No puedes eliminar tu cuenta mientras tengas una suscripción activa
                        </p>
                        <p className="text-sm text-amber-700">
                            Al suscribirte, aceptaste el compromiso de facturación de tu plan {plan === 'yearly' ? 'anual' : 'mensual'}.
                            Para eliminar tu cuenta, primero debes cancelar tu suscripción desde{' '}
                            <Link href="/subscription" className="underline font-semibold">Mi suscripción</Link>.
                            Una vez finalice tu periodo actual, podrás eliminar tu cuenta con normalidad.
                        </p>
                    </div>
                ) : (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-6 space-y-6">
                        <div>
                            <p className="text-sm font-bold text-red-700 mb-1">Vas a eliminar tu cuenta</p>
                            <p className="text-sm text-red-600/80">
                                Se eliminarán todos tus presupuestos, gastos y datos asociados a tu cuenta de forma permanente. Esta acción no se puede deshacer.
                            </p>
                        </div>

                        <div>
                            <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-3">
                                ¿Nos cuentas por qué te vas? (opcional)
                            </p>

                            <RadioGroup value={reason} onChange={setReason} aria-label="Motivo de baja" className="space-y-2">
                                {reasons.map((r) => (
                                    <Radio
                                        key={r}
                                        value={r}
                                        className="group relative flex cursor-pointer rounded-lg border border-border-soft bg-surface px-4 py-3 text-sm text-ink transition focus:outline-none data-checked:border-accent data-checked:bg-accent/10"
                                    >
                                        <div className="flex w-full items-center justify-between">
                                            <span>{r}</span>
                                            <CheckCircleIcon className="size-5 text-accent opacity-0 transition group-data-checked:opacity-100" />
                                        </div>
                                    </Radio>
                                ))}
                            </RadioGroup>
                        </div>

                        <div className="flex justify-end gap-3 border-t border-red-200 pt-4">
                            <Link
                                href="/settings/profile"
                                className="px-4 py-2.5 text-sm font-bold text-ink hover:bg-accent/10 rounded-lg transition-colors"
                            >
                                Cancelar
                            </Link>

                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={processing}
                                className="bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white px-4 py-2.5 rounded-lg text-sm font-bold transition-colors"
                            >
                                {processing ? 'Eliminando...' : 'Eliminar mi cuenta'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

DeleteAccount.layout = (page: ReactElement) => <AppLayout>{page}</AppLayout>
