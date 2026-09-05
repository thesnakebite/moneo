type StatusLabel = {
    text: string
    description: string
    date: string | null
    color: 'green' | 'yellow' | 'amber' | 'orange' | 'red' | 'gray'
}

export type PlanType = 'monthly' | 'yearly'

export type Subscription = {
    plan: PlanType
    onGracePeriod: boolean
    endsAt: string | null
    status_label: StatusLabel
}
