import AppLayout from "@/Layouts/AppLayout"
import { Head, Link, useForm } from "@inertiajs/react"
import { ReactElement } from "react"
import InputError from "@/Components/InputError"
import { Field, Label, Description, Input, Radio, RadioGroup } from "@headlessui/react"
import { CheckCircleIcon } from '@heroicons/react/24/solid'


export default function Create()
{
    const typeOptions = [
    { value: 'general', label: 'General', description: 'Con categorías por gasto' },
    { value: 'goal', label: 'Proyecto', description: 'Sin categorías' },
]

    const { data, setData, post, errors, processing } = useForm({
        name: '',
        amount: '',
        type: '',
        starts_at: '',
        ends_at: '',
    })

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        post('/budgets/store')
    }

    return (
        <>
        <Head title="Crear presupuesto" />

        <div className="max-w-2xl mx-auto">
            <div className="flex items-start justify-between mb-10">
                <div>
                    <h1 className="text-2xl font-bold text-ink">Crear presupuesto</h1>
                    <p className="text-sm text-muted mt-1">
                        Crear un presupuesto es sencillo: añade un nombre y cantidad.
                    </p>
                </div>

                <Link
                    href="/dashboard"
                    className="bg-ink text-white hover:bg-muted text-center px-4 py-2.5 rounded-lg text-sm font-bold transition-colors"
                >
                    Volver a presupuestos
                </Link>
            </div>

            <form
                onSubmit={submit}
                className="space-y-4"
            >
                <Field>
                    <Label htmlFor="name" className="text-sm font-bold text-ink">Nombre</Label>
                    <input
                        id="name"
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="Ej. Boda 💍, Reforma 🪏, Viaje ✈️, Compra 🛒"
                        className="w-full border border-border-soft bg-transparent p-3 rounded-lg text-sm outline-none focus:border-accent placeholder:text-xs focus:ring-0 autofill:shadow-[0_0_0_1000px_var(--color-surface)_inset] autofill:[-webkit-text-fill-color:var(--color-ink)]"
                    />
                    <div className="mt-1">
                        {errors.name && <InputError>{errors.name}</InputError>}
                    </div>
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
                        placeholder="0.00 💶"
                        className="w-full border border-border-soft bg-transparent p-3 rounded-lg text-sm outline-none focus:border-accent placeholder:text-xs focus:ring-0 autofill:shadow-[0_0_0_1000px_var(--color-surface)_inset] autofill:[-webkit-text-fill-color:var(--color-ink)]"
                    />
                    <div className="mt-1">
                        {errors.amount && <InputError>{errors.amount}</InputError>}
                    </div>
                </Field>

                <Field>
                    <Label htmlFor="type" className="text-sm font-bold text-ink">Tipo de presupuesto</Label>
                    <RadioGroup value={data.type} onChange={(value) => setData('type', value)} className="grid grid-cols-2 gap-3">
                        {typeOptions.map((option) => (
                            <Field key={option.value}>
                                <Radio
                                    value={option.value}
                                    className="group relative flex cursor-pointer rounded-lg border border-border-soft bg-transparent p-3 focus:outline-none data-checked:border-accent data-checked:bg-accent/10"
                                >
                                    <div className="flex w-full items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-ink">{option.label}</span>
                                            <span className="text-xs text-muted">{option.description}</span>
                                        </div>

                                        <CheckCircleIcon className="size-6 fill-accent opacity-0 transition group-data-checked:opacity-100" />
                                    </div>
                                </Radio>
                            </Field>
                        ))}
                    </RadioGroup>
                    <div className="mt-1">
                        {errors.type && <InputError>{errors.type}</InputError>}
                    </div>
                </Field>

                <div className="grid grid-cols-2 gap-4">
                    <Field>
                        <Label className="text-sm font-bold text-ink">Fecha de inicio</Label>
                        <Description className="text-xs text-accent">Opcional</Description>
                        <Input
                            type="date"
                            value={data.starts_at}
                            onChange={(e) => setData('starts_at', e.target.value)}
                            className="mt-2 w-full border border-border-soft bg-transparent p-3 rounded-lg text-sm outline-none focus:border-accent focus:ring-0 [&::-webkit-calendar-picker-indicator]:opacity-60 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
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
                            className="mt-2 w-full border border-border-soft bg-transparent p-3 rounded-lg text-sm outline-none focus:border-accent focus:ring-0 [&::-webkit-calendar-picker-indicator]:opacity-60 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                        />
                        {errors.ends_at && <InputError>{errors.ends_at}</InputError>}
                    </Field>
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="bg-accent hover:bg-accent-dark disabled:opacity-40 text-white w-full p-3 rounded-lg text-sm font-bold cursor-pointer transition-colors"
                >
                    {processing ? 'Creando...' : 'Crear presupuesto'}
                </button>
            </form>
        </div>
        </>
    )
}

Create.layout = (page:ReactElement) => <AppLayout>{page}</AppLayout>
