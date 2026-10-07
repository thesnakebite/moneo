import { Head, useForm, usePage } from '@inertiajs/react'
import { ReactElement, useEffect, useRef } from 'react'
import AppLayout from '@/Layouts/AppLayout'
import InputError from '@/Components/InputError'
import { MailIcon } from '@animateicons/react/lucide'
import type { MailIconHandle } from "@animateicons/react/lucide"

const inputClasses =
    'w-full border border-border-soft bg-ink/5 p-3 rounded-lg text-sm outline-none focus:border-accent focus:ring-0 placeholder:text-xs autofill:shadow-[0_0_0_1000px_var(--color-autofill)_inset] autofill:[-webkit-text-fill-color:var(--color-ink)]'

export default function Contact() {
    const { user } = usePage().props
    const mailIconRef = useRef<MailIconHandle>(null)

    const { data, setData, post, errors, processing, reset } = useForm({
        name: user?.user?.name ?? '',
        email: user?.user?.email ?? '',
        message: '',
    })

    useEffect(() => {
        const timeout = setTimeout(() => mailIconRef.current?.startAnimation(), 300)
        return () => clearTimeout(timeout)
    }, [])

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        post('/contact', {
            preserveScroll: true,
            onSuccess: () => reset('message'),
        })
    }

    return (
        <>
            <Head title="Contacto" />

            <div className="max-w-5xl mx-auto py-6 grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
                <div className="lg:col-span-2 text-center lg:text-left">
                    <div
                        className="mx-auto lg:mx-0 flex size-28 items-center justify-center rounded-full bg-accent/15"
                        onMouseEnter={() => mailIconRef.current?.startAnimation()}
                        onMouseLeave={() => mailIconRef.current?.stopAnimation()}
                    >
                        <MailIcon ref={mailIconRef} size={56} duration={1} color="var(--color-accent)" />
                    </div>

                    <h1 className="mt-6 text-3xl font-bold text-ink">Hablemos</h1>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                        ¿Tienes una idea, una duda o has encontrado un fallo? Escríbeme y te respondo lo antes posible.
                    </p>

                    <dl className="mt-8 space-y-4 text-sm">
                        <div>
                            <dt className="text-[11px] font-semibold text-muted uppercase">Email</dt>
                            <dd className="mt-1">
                                <a href="mailto:soporte@moneo.es" className="font-semibold text-ink hover:text-accent transition-colors">
                                    soporte@moneo.es
                                </a>
                            </dd>
                        </div>
                        <div>
                            <dt className="text-[11px] font-semibold text-muted uppercase">Horario</dt>
                            <dd className="mt-1 font-semibold text-ink">Lunes a viernes, de 9:00 a 18:00</dd>
                        </div>
                    </dl>
                </div>

                <form
                    onSubmit={submit}
                    className="lg:col-span-3 rounded-2xl border border-border-soft bg-muted/10 p-6 space-y-5"
                    noValidate
                >
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-sm font-bold text-ink">Nombre</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Tu nombre"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className={inputClasses}
                        />
                        {errors.name && <InputError>{errors.name}</InputError>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm font-bold text-ink">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="tu@email.com"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className={inputClasses}
                        />
                        {errors.email && <InputError>{errors.email}</InputError>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="message" className="text-sm font-bold text-ink">Mensaje</label>
                        <textarea
                            id="message"
                            rows={6}
                            placeholder="Cuéntame en qué puedo ayudarte"
                            value={data.message}
                            onChange={(e) => setData('message', e.target.value)}
                            className={`${inputClasses} resize-y`}
                        />
                        {errors.message && <InputError>{errors.message}</InputError>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-accent hover:bg-accent-dark disabled:opacity-40 text-white px-4 py-3 rounded-lg text-sm font-bold transition-colors"
                    >
                        {processing ? 'Enviando...' : 'Enviar mensaje'}
                    </button>
                </form>
            </div>
        </>
    )
}

Contact.layout = (page: ReactElement) => <AppLayout>{page}</AppLayout>
