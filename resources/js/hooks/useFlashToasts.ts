import { useEffect } from 'react'
import { router, usePage } from '@inertiajs/react'
import { toast } from 'sonner'

export function useFlashToasts() {
    const { flash } = usePage().props

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success, flash.undo ? {
                duration: 6000,
                action: {
                    label: 'Deshacer',
                    onClick: () => router.patch(flash.undo!, {}, { preserveScroll: true }),
                },
            } : undefined)
        }

        if (flash.error) {
            toast.error(flash.error)
        }
    }, [flash])
}
