type StatusLabel = {
    text: string
    description: string
    date: string | null
    color: 'green' | 'yellow' | 'amber' | 'orange' | 'red' | 'gray'
}

export type PlanType = 'monthly' | 'yearly'

export type SubscriptionAmount = {
    amount: number
    currency: string
}

export type Subscription = {
    plan: PlanType
    onGracePeriod: boolean
    endsAt: string | null
    status_label: StatusLabel
    price: SubscriptionAmount | null
    currentPeriodEnd: string | null
}

export type PaymentMethod = {
    brand: string
    last4: string
}

export type Invoice = {
    id: string
    date: string
    total: string
    status: string
    description: string | null
}
