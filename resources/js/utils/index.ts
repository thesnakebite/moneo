type DateFormat = 'long' | 'short'

export function formatDate(date: string, format: DateFormat = 'long') {
    return new Intl.DateTimeFormat('es-ES', {
        day: 'numeric',
        month: format,
        year: 'numeric',
    }).format(new Date(date))
}

export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR',
        useGrouping: 'always',
    }).format(amount)
}
