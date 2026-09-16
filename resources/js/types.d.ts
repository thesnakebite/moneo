import '@inertiajs/core'

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            flash: {
                success?: string
                error?: string
                subscribed?: boolean
            },
            user: {
                user: {
                    name: string
                    email: string
                    avatar_url: string | null
                } | null
                subscribed: boolean
                plan: string | null
            } | null
        }
    }
}
