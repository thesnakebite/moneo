import { useState } from 'react'
import { router } from '@inertiajs/react'
import { route } from 'ziggy-js'
import { Subscription } from '@/types/subscription'

type Props = {
    endsAt: Subscription['endsAt']
}

export default function ResumeSubscription({ endsAt }: Props) {
    const [loading, setLoading] = useState(false)

    const handleResume = () => {
        setLoading(true)

        router.post(
            route('subscription.resume'),
            {},
            {
                onFinish: () => setLoading(false),
                preserveScroll: true,
            }
        )
    }

    return (
        <div className="max-w-2xl mx-auto mt-8">
            <div className="rounded-2xl border border-accent/40 bg-accent/10 p-6">
                <p className="text-lg/loose text-accent-dark text-center font-bold">
                    ¿Cambiaste de opinión?
                </p>
                <p className="text-sm text-muted text-center">
                    Aún puedes reactivar tu suscripción antes del{' '}
                    <span className="font-semibold text-ink">{endsAt}</span>{' '}
                    sin cargos adicionales.
                </p>

                <div className="flex justify-end items-center mt-4">
                    <button
                        type="button"
                        onClick={handleResume}
                        disabled={loading}
                        className="mt-2 bg-green-400/10 hover:bg-green-400/20 text-green-900 border border-green-800/20 px-4 py-2.5 rounded-lg text-sm font-bold disabled:opacity-40 transition-colors cursor-pointer"
                    >
                        {loading ? 'Reactivando...' : 'Reanudar suscripción'}
                    </button>
                </div>

            </div>
        </div>
    )
}
