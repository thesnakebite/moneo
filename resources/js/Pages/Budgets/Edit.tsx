import { Head, Link, useForm } from '@inertiajs/react'
import { ReactElement } from 'react'
import { Field, Label, Description, Input } from '@headlessui/react'
import AppLayout from '@/Layouts/AppLayout'
import InputError from '@/Components/InputError'
import { Budget } from '@/types/budget'
import PageHeader from '@/Components/PageHeader'
import { PencilIcon } from '@animateicons/react/lucide'

type Props = {
    budget: Budget
}

export default function Edit({ budget }: Props) {
    const { data, setData, put, errors, processing } = useForm({
        name: budget.name,
        amount: budget.amount,
        starts_at: budget.starts_at ?? '',
        ends_at: budget.ends_at ?? '',
    })

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        put(`/budgets/${budget.id}`)
    }

    return (
        <>
            <Head title={`Editar ${budget.name}`} />

            <PageHeader
                title='Editar presupuesto'
                description='Realiza los ajustes necesarios de tu presupuesto.'
                icon={<PencilIcon size={18} color="var(--color-accent)" />}
            />

            <div className="max-w-2xl mx-auto">
                {/* <div className="flex items-start justify-between mb-10">
                    <div>
                        <h1 className="text-2xl font-bold text-ink">Editar presupuesto</h1>
                        <p className="text-sm text-muted mt-1">
                            Realiza los ajustes necesarios de tu presupuesto.
                        </p>
                    </div>

                    <Link
                        href="/dashboard"
                        className="border border-border-soft text-ink hover:bg-accent/10 hover:border-accent/40 text-center px-4 py-2.5 rounded-lg text-sm font-bold transition-colors"
                    >
                        Volver a presupuestos
                    </Link>
                </div> */}

                <form onSubmit={submit} className="space-y-4">
                    <Field>
                        <Label htmlFor="name" className="text-sm font-bold text-ink">Nombre</Label>
                        <input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full border border-border-soft bg-transparent p-3 rounded-lg text-sm outline-none focus:border-accent placeholder:text-xs focus:ring-0 autofill:shadow-[0_0_0_1000px_var(--color-surface)_inset] autofill:[-webkit-text-fill-color:var(--color-ink)]"
                        />
                        {errors.name && <InputError>{errors.name}</InputError>}
                    </Field>

                    <Field>
                        <Label htmlFor="amount" className="text-sm font-bold text-ink">Cantidad</Label>
                        <input
                            id="amount"
                            type="number"
                            min="0"
                            step="0.01"
                            value={data.amount}
                            onChange={(e) => setData('amount', e.target.value)}
                            className="w-full border border-border-soft bg-transparent p-3 rounded-lg text-sm outline-none focus:border-accent placeholder:text-xs focus:ring-0 autofill:shadow-[0_0_0_1000px_var(--color-surface)_inset] autofill:[-webkit-text-fill-color:var(--color-ink)]"
                        />
                        {errors.amount && <InputError>{errors.amount}</InputError>}
                    </Field>

                    <div className="grid grid-cols-2 gap-4">
                        <Field>
                            <Label className="text-sm font-bold text-ink">Fecha de inicio</Label>
                            <Description className="text-xs text-accent">Opcional</Description>
                            <Input
                                type="date"
                                value={data.starts_at}
                                onChange={(e) => setData('starts_at', e.target.value)}
                                className="mt-2 w-full border border-border-soft bg-transparent p-3 rounded-lg text-sm outline-none focus:border-accent focus:ring-0 scheme-light [&::-webkit-calendar-picker-indicator]:opacity-60 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                            />
                            {errors.starts_at && <InputError>{errors.starts_at}</InputError>}
                        </Field>

                        <Field>
                            <Label className="text-sm font-bold text-ink">Fecha de fin</Label>
                            <Description className="text-xs text-accent">Opcional</Description>
                            <Input
                                type="date"
                                value={data.ends_at}
                                onChange={(e) => setData('ends_at', e.target.value)}
                                className="mt-2 w-full border border-border-soft bg-transparent p-3 rounded-lg text-sm outline-none focus:border-accent focus:ring-0 scheme-light [&::-webkit-calendar-picker-indicator]:opacity-60 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                            />
                            {errors.ends_at && <InputError>{errors.ends_at}</InputError>}
                        </Field>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-accent hover:bg-accent-dark disabled:opacity-40 text-white w-full p-3 rounded-lg text-sm font-bold cursor-pointer transition-colors"
                    >
                        {processing ? 'Guardando...' : 'Guardar cambios'}
                    </button>
                </form>
            </div>
        </>
    )
}

Edit.layout = (page: ReactElement) => <AppLayout>{page}</AppLayout>
