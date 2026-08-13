import { useExpenseModalStore } from '@/stores/expense-modal-store'
import { useForm } from '@inertiajs/react'
import Ziggy from '@/ziggy'
import { route } from 'ziggy-js'
import InputError from './InputError'

export default function ExpenseForm() {
    const budget = useExpenseModalStore(state => state.budget)
    const categories = useExpenseModalStore(state => state.categories)

    const { data, setData, post, errors } = useForm({
        name: '',
        amount: '',
        category: ''
    })

    if (!budget) return null

    const submit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route('budgets.expenses.store', budget.id))
    }

    return (
        <form onSubmit={submit} className="space-y-4">
            <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-bold text-gray-700">
                    Nombre
                </label>
                <input
                    id="name"
                    type="text"
                    placeholder="Ej. Cena, Gasolina, Entradas"
                    className="w-full border border-gray-300 p-3 rounded-lg text-sm"
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                />
                {errors.name && <InputError>{errors.name}</InputError>}
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-sm font-bold text-gray-700">
                    Cantidad
                </label>
                <input
                    id="amount"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0,00"
                    className="w-full border border-gray-300 p-3 rounded-lg text-sm"
                    value={data.amount}
                    onChange={e => setData('amount', e.target.value)}
                />
                {errors.amount && <InputError>{errors.amount}</InputError>}
            </div>

            {budget.type === 'general' && (
                <div className="flex flex-col gap-2">
                    <label htmlFor="category" className="text-sm font-bold text-gray-700">
                        Categoría
                    </label>
                    <select
                        id="category"
                        className="w-full border border-gray-300 p-3 rounded-lg text-sm"
                        value={data.category}
                        onChange={e => setData('category', e.target.value)}
                    >
                        <option value="">Selecciona una categoría</option>
                        {categories.map(category => <option key={category.value} value={category.value}>
                            {category.label}
                        </option>)}

                    </select>
                    {errors.category && <InputError>{errors.category}</InputError>}
                </div>
            )}

            <div className="flex justify-end gap-3 pt-2 mb-2">
                <button
                    type="submit"
                    className="bg-gray-900 hover:bg-gray-800 disabled:opacity-50 text-white px-4 py-2.5 w-full rounded-lg text-sm font-bold"
                >
                    Agregar Gasto
                </button>
            </div>
        </form>
    )
}
