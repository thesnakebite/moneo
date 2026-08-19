import '@inertiajs/core'

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            flash: {
                success?: string
            },
            user: {
                name: string
            } | null
        }
    }
}
