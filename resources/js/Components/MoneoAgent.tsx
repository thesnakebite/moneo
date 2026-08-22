import { useRef, useState } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import ChatMessages from './ChatMessages'
import { toast } from 'sonner'
import { router } from '@inertiajs/react'

type Props = {
    budgetId: number,
    userName: string,
}

export default function MoneoAgent({ budgetId, userName }: Props) {
    const [input, setInput] = useState('')
    const [isUploadingReceipt, setIsUploadingReceipt] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const { sendMessage, messages, setMessages, status } = useChat({
        transport: new DefaultChatTransport({
            api: `/budgets/${budgetId}/chat`,
            headers: {
                'X-CSRF-TOKEN': document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? '',
            },
        }),
        onFinish: ({ message }) => {
            const addedExpense = message.parts.some((part) => {
                return part.type === 'tool-AddExpense' && 'state' in part && part.state === 'output-available'
            })

            const deletedExpense = message.parts.some((part) => {
                return part.type === 'tool-DeleteExpense' && 'state' in part && part.state === 'output-available'
            })

            if (addedExpense) {
                toast.success('Gasto añadido correctamente')
                router.reload({ only: ['budget', 'spent'] })
            }

            if (deletedExpense) {
                toast.success('Gasto eliminado correctamente')
                router.reload({ only: ['budget', 'spent'] })
            }
        },
    })

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploadingReceipt(true)

        setMessages(prev => [
            ...prev,
            {
                id: crypto.randomUUID(),
                role: 'user' as const,
                content: 'Ticket de compra subido',
                parts: [{type: 'text' as const, text: 'Ticket de compra subido 🧾'}]
            }
        ])

        try {
            const csrfToken = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? ''
            const formData = new FormData()
            formData.append('image', file)

            const response = await fetch(`/budgets/${budgetId}/scan-ticket`, {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                    'Accept': 'application/json',
                },
                credentials: 'same-origin',
                body: formData,
            })

            const data = await response.json()

            setMessages(prev => [
                ...prev,
                {
                    id: crypto.randomUUID(),
                    role: 'assistant' as const,
                    content: data.message,
                    parts: [{ type: 'text' as const, text: data.message }]
                }
            ])

            if (data.success) {
                toast.success('Gastos del ticket registrados')
                router.reload()
            }

        } catch (error) {
            console.error('Error al procesar el ticket: ' , error)

            setMessages(prev => [
            ...prev,
            {
                id: crypto.randomUUID(),
                role: 'assistant' as const,
                content: 'Error al procesar el ticket 🧾. Prueba de nuevo.',
                parts: [{type: 'text' as const, text: 'Error al procesar el ticket. Prueba de nuevo.'}]
            }
        ])
        } finally {
            setIsUploadingReceipt(false)
            if(fileInputRef.current) fileInputRef.current.value = ''
        }
    }

    const isLoading = status === 'submitted' || status === 'streaming' || isUploadingReceipt

    return (
        <section className="mt-10 rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-1">
                <div className="flex size-6 items-center justify-center rounded-md bg-gray-900">
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="size-3.5">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
                    </svg>
                </div>
                <h2 className="text-sm font-bold text-gray-900">Moneo AI</h2>
            </div>

            <p className="text-xs text-gray-500 mb-4">
                Pregunta sobre tu presupuesto, añade gastos por texto o sube un ticket.
            </p>

            <ChatMessages messages={messages} userName={userName} />

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (input.trim()) {
                        sendMessage({text: input})
                        setInput('')
                    }
                }}
                className="flex flex-col gap-3"
            >
                <div className="border border-gray-200 rounded-xl p-3">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={isLoading}
                        placeholder="Ej. ¿Cuánto me queda? o «Añade 40€ de gasolina»"
                        rows={2}
                        className="w-full resize-none text-xs outline-none placeholder:text-gray-400"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isLoading}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-colors ${
                            isUploadingReceipt
                                ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                                : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                        {isUploadingReceipt ? (
                            <svg className="animate-spin size-4" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="size-4">
                                <path d="M6 2h12a1 1 0 0 1 1 1v18l-2.5-1.5L14 21l-2-1.5L10 21l-2.5-1.5L5 21V3a1 1 0 0 1 1-1Z" strokeLinejoin="round" />
                                <path d="M8 7h8M8 11h8M8 15h5" strokeLinecap="round" />
                            </svg>
                        )}
                        {isUploadingReceipt ? 'Analizando' : 'Subir ticket'}
                    </button>

                    <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors ${
                            isLoading
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-gray-900 hover:bg-gray-800 text-white'
                        }`}
                    >
                        {status === 'streaming' && (
                            <svg className="animate-spin size-3.5" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                        )}

                        {status === 'streaming' ? 'Pensando...' : 'Enviar'}
                    </button>
                </div>

                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                />
            </form>
        </section>
    )
}
