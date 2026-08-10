import AmountDisplay from "@/Components/AmountDisplay"
import { Budget } from "@/types/budget"
import { Head } from "@inertiajs/react"

type Props = {
    budget: Budget
}

export default function Show({budget} : Props) {
    return (
        <>
            <Head title={`Presupuesto: ${budget.name}`} />

            <div className="max-w-2xl mx-auto mt-16 px-4">
                <div className="border border-gray-200 rounded-2xl p-8 sm:p-10 space-y-8">
                    <h1 className="text-gray-900 text-2xl font-bold">Presupuesto: {budget.name}</h1>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <AmountDisplay label="Presupuesto" amount={Number(budget.amount)} />
                        <AmountDisplay label="Gastado" amount={0}/>
                        <AmountDisplay label="Restante" amount={0} />
                    </div>

                    <a
                        href="/dashboard"
                        className="mt-12 bg-gray-900 text-white px-2 sm:px-4 py-1.5 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold"
                    >
                        Volver al dashboard
                    </a>
                </div>

            </div>
        </>
    )
}
