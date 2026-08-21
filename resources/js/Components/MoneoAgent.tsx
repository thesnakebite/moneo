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
    const fileInputRef = useRef<HTMLInputElement>(null)

    const { sendMessage, messages, setMessages } = useChat({
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
            if(fileInputRef.current) fileInputRef.current.value = ''
        }
    }

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
                        placeholder="Ej. ¿Cuánto me queda? o «Añade 40€ de gasolina»"
                        rows={2}
                        className="w-full resize-none text-xs outline-none placeholder:text-gray-400"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50"
                        title="Sube la foto de un ticket para que la analicemos"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="size-4">
                            <path d="M6 2h12a1 1 0 0 1 1 1v18l-2.5-1.5L14 21l-2-1.5L10 21l-2.5-1.5L5 21V3a1 1 0 0 1 1-1Z" strokeLinejoin="round" />
                            <path d="M8 7h8M8 11h8M8 15h5" strokeLinecap="round" />
                        </svg>
                        Subir ticket
                    </button>

                    <button
                        type="submit"
                        disabled={!input.trim()}
                        className="bg-gray-900 hover:bg-gray-800 disabled:opacity-40 text-white px-4 py-2 rounded-lg text-sm font-bold"
                    >
                        Consultar
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
