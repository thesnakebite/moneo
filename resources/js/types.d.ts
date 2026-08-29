import '@inertiajs/core'

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            flash: {
                success?: string
            },
            user: {
                user: {
                    name: string
                }
                subscribed: boolean
                plan: string | null
            } | null
        }
    }
}
