import { Budget } from "@/types/budget"
import { Head } from "@inertiajs/react"

type Props = {
    budget: Budget
}

export default function Show({budget} : Props) {
    return (
        <>
            <Head title={`Presupuesto: ${budget.name}`} />

            <div className="flex flex-col items-center justify-center mx-auto mt-28">
                <div className="border border-gray-200 w-5xl p-10 space-y-10">
                    <h1 className="text-blue-400 text-xl">Presupuesto: {budget.name}</h1>

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
