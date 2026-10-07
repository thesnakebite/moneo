import { createInertiaApp } from '@inertiajs/react'

createInertiaApp({
    title: title => `Moneo - ${title}`,
    pages: {
        path: './Pages',
        extension: '.tsx',
    },
    defaults: {
        visitOptions: (href, options) => ({
            viewTransition: options.method === 'get' && !options.only?.length,
        })
    }
})
