export type PlanType = 'monthly' | 'yearly'

export type Subscription = {
    plan: PlanType
    onGracePeriod: boolean
    endsAt: string | null
}
