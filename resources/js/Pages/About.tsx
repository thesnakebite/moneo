import { ReactElement } from 'react'
import AppLayout from '@/Layouts/AppLayout'
import PageHeader from '@/Components/PageHeader'
import { PiggyBankIcon } from '@animateicons/react/lucide'

const stack = [
    { name: 'Laravel', color: '#FF2D20' },
    { name: 'Inertia.js', color: '#9553E9' },
    { name: 'React', color: '#61DAFB' },
    { name: 'TypeScript', color: '#3178C6' },
    { name: 'Tailwind CSS', color: '#06B6D4' },
    { name: 'PostgreSQL', color: '#336791' },
    { name: 'Stripe', color: '#635BFF' },
    { name: 'Laravel AI SDK', color: '#FF2D20' },
]

const principles = [
    {
        title: 'Tus datos son tuyos',
        description: 'Moneo no vende datos ni los usa con fines publicitarios. Puedes borrar tu cuenta cuando quieras.',
    },
    {
        title: 'Sencillez ante todo',
        description: 'Presupuestos claros, gastos al instante y avisos solo cuando aportan algo.',
    },
    {
        title: 'Un proyecto vivo',
        description: 'Moneo está en desarrollo. Cada mejora nace de probar, equivocarse y volver a intentarlo.',
    },
]

export default function About() {
    return (
        <>
            <PageHeader
                title="Quiénes somos"
                description="La historia detrás de Moneo."
                backHref="/dashboard"
                backLabel="Volver al dashboard"
                icon={<PiggyBankIcon size={34} color="var(--color-accent)" />}
            />

            <div className="max-w-2xl mx-auto space-y-10 pb-10">
                <section className="space-y-3">
                    <h2 className="text-lg font-bold text-ink">La historia</h2>
                    <p className="text-sm leading-relaxed text-muted">
                        Moneo nace como un proyecto de estudio: una forma de aprender construyendo algo real.
                        La idea era sencilla, una herramienta para organizar presupuestos y gastos sin
                        complicaciones, y poco a poco fue creciendo con escaneo de tickets, un asistente de IA
                        y suscripciones.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-lg font-bold text-ink">Quién hay detrás</h2>
                    <p className="text-sm leading-relaxed text-muted">
                        Soy thesnakebite, desarrollador web especializado en Laravel. Moneo es mi laboratorio
                        para practicar, probar ideas nuevas y llevarlas de principio a fin.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-lg font-bold text-ink">Con qué está construido</h2>
                    <ul className="flex flex-wrap gap-2">
                        {stack.map((tech) => (
                            <li
                                key={tech.name}
                                className="flex items-center gap-1.5 text-xs font-semibold text-ink bg-muted/10 border border-border-soft rounded-full px-3 py-1"
                            >
                                <span
                                    className="size-2 rounded-full"
                                    style={{ backgroundColor: tech.color }}
                                    aria-hidden="true"
                                />
                                {tech.name}
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="space-y-3">
                    <h2 className="text-lg font-bold text-ink">Principios</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {principles.map((principle) => (
                            <div key={principle.title} className="rounded-2xl border border-border-soft bg-muted/10 p-5">
                                <h3 className="text-sm font-bold text-ink">{principle.title}</h3>
                                <p className="text-xs leading-relaxed text-muted mt-2">{principle.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="rounded-2xl border border-accent/30 bg-accent/5 p-6 text-center">
                    <h2 className="text-lg font-bold text-ink">¿Tienes una idea o has encontrado un fallo?</h2>
                    <p className="text-sm text-muted mt-2">Me encantará leerte.</p>
                    <a
                        href="mailto:soporte@moneo.es"
                        className="mt-4 inline-block bg-accent hover:bg-accent-dark text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-colors"
                    >
                        Escríbeme
                    </a>
                </section>
            </div>
        </>
    )
}

About.layout = (page: ReactElement) => <AppLayout>{page}</AppLayout>
