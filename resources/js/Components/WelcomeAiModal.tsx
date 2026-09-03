import { usePage } from "@inertiajs/react"
import { useEffect, useRef, useState } from "react"
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { SparklesIcon, type SparklesIconHandle } from '@animateicons/react/lucide'


export default function WelcomeProModal() {
    const { flash } = usePage().props
    const [showWelcome, setShowWelcome] = useState(false)
    const [animationKey, setAnimationKey] = useState(0)
    const sparklesRef = useRef<SparklesIconHandle>(null)

    useEffect(() => {
        if (flash.subscribed) {
            setShowWelcome(true)
        }
    }, [flash.subscribed])

    useEffect(() => {
        if (showWelcome) {
            setAnimationKey((prev) => prev + 1)
            const timeout = setTimeout(() => sparklesRef.current?.startAnimation(), 50)

            return () => clearTimeout(timeout)
        }
    }, [showWelcome])

    return (
        <Dialog open={showWelcome} onClose={() => setShowWelcome(false)} className="relative z-50">
            <DialogBackdrop transition className="fixed inset-0 bg-ink/40 duration-200 ease-out data-closed:opacity-0" />

            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel transition className="w-full max-w-md rounded-2xl bg-surface p-8 text-center shadow-xl duration-200 ease-out data-closed:scale-95 data-closed:opacity-0">
                    <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-accent/15 mb-4">
                        <SparklesIcon key={animationKey} ref={sparklesRef} size={28} color="var(--color-accent)" />
                    </div>

                    <DialogTitle className="text-xl font-bold text-ink">
                        ¡Bienvenido a Moneo Pro!
                    </DialogTitle>

                    <p className="mt-2 text-sm text-muted">
                        Tu suscripción ya está activa. Ahora tienes acceso al asistente de IA y al escaneo de tickets en todos tus presupuestos.
                    </p>

                    <button
                        type="button"
                        onClick={() => setShowWelcome(false)}
                        className="mt-6 bg-accent hover:bg-accent-dark text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-colors"
                    >
                        Empezar
                    </button>
                </DialogPanel>
            </div>
        </Dialog>
    )
}
