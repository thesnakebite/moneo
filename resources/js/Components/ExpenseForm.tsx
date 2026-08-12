import { useForm } from '@inertiajs/react'

export default function ExpenseForm() {

    return (
        <form className="space-y-4">
            <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-bold text-gray-700">
                    Nombre
                </label>
                <input
                    id="name"
                    type="text"
                    placeholder="Ej. Cena, Gasolina, Entradas"
                    className="w-full border border-gray-300 p-3 rounded-lg text-sm"
                />
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
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="category" className="text-sm font-bold text-gray-700">
                    Categoría
                </label>
                <select
                    id="category"
                    className="w-full border border-gray-300 p-3 rounded-lg text-sm"
                >
                    <option value="">Selecciona una categoría</option>
                    <option></option>
                </select>

            </div>

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
