import { formatCurrency } from "@/utils"

type Props = {
    label: string
    amount: number
}

export default function AmountDisplay({ label, amount }: Props) {
    return (
        <div className="flex flex-col gap-1">
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">{ label }</p>
            <p className="font-bold text-gray-900">{ formatCurrency((amount)) }</p>
        </div>
    )
}
