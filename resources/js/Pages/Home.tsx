import { Head, Link } from '@inertiajs/react'
import { CreditCardIcon, KeySquareIcon, PiggyBankIcon, SparklesIcon } from '@animateicons/react/lucide'
import Footer from '@/Components/Footer'

export default function Home() {

    function SectionWave({ flip = false }: { flip?: boolean }) {
        return (
            <svg
                viewBox="0 0 1440 80"
                className={`w-full h-20 sm:h-20 ${flip ? 'rotate-180' : ''}`}
                preserveAspectRatio="none"
            >
                <path
                    d="M0,50 C360,120 1080,-20 1440,50 L1440,100 L0,100 Z"
                    className="fill-muted/5"
                />
            </svg>
        )
    }

    const features = [
        {
            icon: PiggyBankIcon,
            title: 'Presupuestos flexibles',
            description: 'Crea presupuestos generales o por meta, con o sin fecha límite.'
        },
        {
            icon: SparklesIcon,
            title: 'Asistente de AI',
            description: 'Pregunta por tus gastos, añade uno por chat, o escanea un ticket y deja que la IA lo registre por ti.',
        },
        {
            icon: CreditCardIcon,
            title: 'Suscripción sin sorpresas',
            description: 'Gestiona tu plan, ve tu historial de facturas, y cambia o cancela cuando quieras, sin letra pequeña.',
        },
        {
            icon: KeySquareIcon,
            title: 'Tu cuenta, protegida',
            description: 'Verificación de email, contraseñas seguras y control total sobre tus datos personales.',
        }
    ]

    const steps = [
        {
            number: '01',
            title: 'Regístrate',
            description: 'Crea tu cuenta gratis en menos de un minuto, sin necesitar tarjeta.',
        },
        {
            number: '02',
            title: 'Crea tu primer presupuesto',
            description: 'Ponle nombre, un importe, y si quieres, una fecha de inicio o de cierre.',
        },
        {
            number: '03',
            title: 'Deja que la IA te ayude',
            description: 'Pregúntale por tus gastos o escanea un ticket, y ella se encarga del resto.',
        },
    ]

    return (
        <>
            <Head title="Presupuestos con IA">
                <meta name="description" content="Crea presupuestos, registra gastos al instante y deja que la IA te ayude a mantener el control de tu dinero." />
            </Head>

            {/* Hero */}
            <section className="min-h-screen flex items-center px-6 lg:px-16">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <PiggyBankIcon size={68} duration={1} color="var(--color-accent)" />
                            <span className="text-7xl font-unique-medium text-muted">Moneo</span>
                        </div>

                        <h1 className="text-4xl sm:text-6xl font-bold text-ink leading-tight">
                            Controla tus gastos.<br />
                            Alcanza tus <span className="text-accent">metas.</span>
                        </h1>

                        <p className="mt-6 text-base text-muted max-w-lg">
                            Crea presupuestos, registra gastos al instante y deja que la IA te ayude a mantener el control, todo en un solo lugar.
                        </p>

                        <div className="mt-8 flex items-center gap-4">
                            <Link
                                href="/register"
                                className="bg-accent hover:bg-accent-dark text-white px-8 py-3.5 rounded-lg text-base font-bold transition-colors"
                            >
                                Crear cuenta gratis
                            </Link>
                            <Link
                                href="/login"
                                className="text-ink font-bold hover:text-accent transition-colors"
                            >
                                Iniciar sesión
                            </Link>
                        </div>
                    </div>

                    <div className="hidden lg:block">
                        {/* Mockup */}
                        <div className="rounded-2xl border border-border-soft bg-white shadow-xl overflow-hidden">
                            <div className="flex items-center gap-1.5 px-4 py-3 bg-muted/5 border-b border-border-soft">
                                <span className="size-2.5 rounded-full bg-red-400" />
                                <span className="size-2.5 rounded-full bg-amber-400" />
                                <span className="size-2.5 rounded-full bg-green-400" />
                            </div>
                            <div className="p-6 space-y-3">
                                <div className="relative overflow-hidden bg-linear-to-br from-ink via-ink to-muted rounded-xl p-4">
                                    <p className="text-xs text-surface/70">Viaje a Quatar</p>
                                    <p className="text-lg font-bold text-accent mt-1">€680 <span className="text-xs text-surface/60 font-normal">de €1.200</span></p>
                                </div>

                                <div className="relative overflow-hidden bg-linear-to-br from-ink via-ink to-muted rounded-xl p-4">
                                    <p className="text-xs text-surface/70">Gastos del hogar</p>
                                    <p className="text-lg font-bold text-accent mt-1">€320 <span className="text-xs text-surface/60 font-normal">de €500</span></p>
                                </div>

                                <div className="rounded-xl border border-accent/30 bg-accent/5 p-4">
                                    <p className="text-xs font-semibold text-accent">✨ Asistente IA</p>
                                    <p className="text-xs text-muted mt-1">
                                        Te quedan €320 este mes en "Gastos del hogar", vas por buen camino.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <SectionWave />

            {/* Features */}
            <section className="py-24 px-6 lg:px-16 bg-muted/5">
                <div className="max-w-7xl mx-auto">
                    <div className="max-w-2xl mb-16">
                        <p className="text-sm font-bold text-accent uppercase tracking-wide">Todo en un solo lugar</p>
                        <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-ink">
                            Lo que necesitas para tomar el control de tu dinero
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature) => (
                            <div key={feature.title} className="rounded-2xl border border-border-soft bg-white p-6">
                                <div className="flex size-12 items-center justify-center rounded-full bg-accent/15 mb-4">
                                    <feature.icon size={22} duration={1} color="var(--color-accent)" />
                                </div>
                                <h3 className="font-bold text-ink text-lg mb-2">{feature.title}</h3>
                                <p className="text-sm text-muted">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <SectionWave flip />

            {/* How it works */}
            <section className="py-24 px-6 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    <div className="max-w-2xl mb-16">
                        <p className="text-sm font-bold text-accent uppercase tracking-wide">Simple, de principio a fin</p>
                        <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-ink">
                            Empieza a organizarte en tres pasos
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
                        {steps.map((step) => (
                            <div key={step.number}>
                                <span className="text-5xl font-unique text-accent/20">{step.number}</span>
                                <h3 className="font-bold text-ink text-xl mt-2 mb-2">{step.title}</h3>
                                <p className="text-sm text-muted">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <SectionWave />

            {/* Plans */}
            <section className="py-24 px-6 lg:px-16 bg-muted/5">
                <div className="max-w-5xl mx-auto text-center">
                    <p className="text-sm font-bold text-accent uppercase tracking-wide">Elige tu plan</p>
                    <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-ink">
                        Empieza gratis, mejora cuando quieras
                    </h2>

                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
                        <div className="rounded-2xl border border-border-soft bg-white p-8 text-left">
                            <h3 className="font-bold text-lg text-ink">Mensual</h3>
                            <p className="mt-2">
                                <span className="text-3xl font-bold text-ink">4,99€</span>
                                <span className="text-sm text-muted">/mes</span>
                            </p>
                            <ul className="mt-4 space-y-2 text-sm text-muted">
                                <li>Asistente de IA ilimitado</li>
                                <li>Escaneo de tickets</li>
                                <li>Soporte prioritario</li>
                            </ul>
                            <Link
                                href="/register"
                                className="mt-6 block text-center border border-border-soft text-ink hover:bg-accent/10 px-4 py-2.5 rounded-lg text-sm font-bold transition-colors"
                            >
                                Empezar ahora
                            </Link>
                        </div>

                        <div className="relative rounded-2xl border-2 border-accent bg-white p-8 text-left">
                            <span className="absolute -top-3 left-8 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">
                                Más popular
                            </span>
                            <h3 className="font-bold text-lg text-ink">Anual</h3>
                            <p className="mt-2">
                                <span className="text-3xl font-bold text-ink">49,99€</span>
                                <span className="text-sm text-muted">/año</span>
                            </p>
                            <ul className="mt-4 space-y-2 text-sm text-muted">
                                <li>Todo lo del plan mensual</li>
                                <li>2 meses gratis</li>
                                <li>Acceso anticipado a nuevas funciones</li>
                            </ul>
                            <Link
                                href="/register"
                                className="mt-6 block text-center bg-accent hover:bg-accent-dark text-white px-4 py-2.5 rounded-lg text-sm font-bold transition-colors"
                            >
                                Empezar ahora
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA final */}
            <section className="py-24 px-6 lg:px-16">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-ink">
                        ¿Listo para tomar el control de tus finanzas?
                    </h2>
                    <p className="mt-4 text-muted">
                        Crea tu cuenta gratis y empieza a organizar tu primer presupuesto en minutos.
                    </p>
                    <Link
                        href="/register"
                        className="mt-8 inline-block bg-accent hover:bg-accent-dark text-white px-10 py-3.5 rounded-lg text-base font-bold transition-colors"
                    >
                        Crear cuenta gratis
                    </Link>
                </div>
            </section>

            <Footer />
        </>
    )
}
