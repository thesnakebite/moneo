import { useExpenseModalStore } from '@/stores/expense-modal-store'
import { useForm } from '@inertiajs/react'
import Ziggy from '@/ziggy'
import { route } from 'ziggy-js'
import InputError from './InputError'
import { EXPENSE_NAME_MAX_LENGTH } from '@/utils/expense'

export default function ExpenseForm() {
    const budget = useExpenseModalStore(state => state.budget)
    const expense = useExpenseModalStore(state => state.expense)
    const categories = useExpenseModalStore(state => state.categories)
    const closeModal = useExpenseModalStore(state => state.closeModal)

    const isEditing = !!expense

    const { data, setData, post, put, errors, reset, processing} = useForm({
        name: expense?.name ?? '',
        amount: expense?.amount ?? '',
        category: expense?.category ?? ''
    })

    if (!budget) return null

    const submit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(isEditing && expense) {
            put(route('budgets.expenses.update', [budget.id, expense.id]), {
                onSuccess: () => {
                    reset()
                    closeModal()
                },
                preserveScroll: true,
            })
            return
        }

        post(route('budgets.expenses.store', budget.id), {
            onSuccess: () => {
                reset()
                closeModal()
            },
            preserveScroll: true,
        })
    }

    const fieldClassName = 'w-full border border-border-soft bg-transparent p-3 rounded-lg text-sm text-ink outline-none focus:border-accent focus:ring-0 placeholder:text-xs autofill:shadow-[0_0_0_1000px_var(--color-surface)_inset] autofill:[-webkit-text-fill-color:var(--color-ink)]'
    const labelClassName = 'text-sm font-bold text-ink'

    return (
        <form onSubmit={submit} className="space-y-4">
            <div className="flex flex-col gap-2">
                <label htmlFor="name" className={labelClassName}>
                    Nombre
                </label>
                <input
                    id="name"
                    type="text"
                    placeholder="Ej. Cena, Gasolina, Entradas"
                    maxLength={EXPENSE_NAME_MAX_LENGTH}
                    className={fieldClassName}
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                />
                {errors.name && <InputError>{errors.name}</InputError>}
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className={labelClassName}>
                    Cantidad
                </label>
                <input
                    id="amount"
                    type="number"
                    min="0.01"
                    step="0.01"
                    placeholder="0,00"
                    className={fieldClassName}
                    value={data.amount}
                    onChange={e => setData('amount', e.target.value)}
                />
                {errors.amount && <InputError>{errors.amount}</InputError>}
            </div>

            {budget.type === 'general' && (
                <div className="flex flex-col gap-2">
                    <label htmlFor="category" className={labelClassName}>
                        Categoría
                    </label>
                    <select
                        id="category"
                        className={fieldClassName}
                        value={data.category}
                        onChange={e => setData('category', e.target.value)}
                    >
                        <option value="">Selecciona una categoría</option>
                        {categories.map(category => (
                            <option key={category.value} value={category.value}>
                                {category.label}
                            </option>
                        ))}
                    </select>
                    {errors.category && <InputError>{errors.category}</InputError>}
                </div>
            )}

            <div className="pt-2 mb-2">
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-ink hover:bg-ink/90 text-white px-4 py-2.5 rounded-lg text-sm font-bold transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {processing ? 'Guardando…' : isEditing ? 'Guardar cambios' : 'Agregar gasto'}
                </button>
            </div>
        </form>
    )
}
