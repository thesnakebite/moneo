import { createInertiaApp } from '@inertiajs/react'

createInertiaApp({
    title: title => `Moneo - ${title}`,
    pages: {
        path: './Pages',
        extension: '.tsx',
    }
})
