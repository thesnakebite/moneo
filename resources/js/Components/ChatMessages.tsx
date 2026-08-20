import { Children, useEffect, useRef } from 'react'
import ReactMarkdown  from 'react-markdown'
import type { UIMessage } from 'ai'

type Props = {
    messages: UIMessage[]
    userName: string
}

export default function ChatMessages({ messages, userName }: Props) {
    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    return (
        <div className="max-h-56 overflow-y-auto flex flex-col gap-2 pr-1 mb-4">
            {messages.map((m) => (
                <div key={m.id} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <span className="text-[10px] font-semibold text-gray-400 mb-0.5 px-1">
                        {m.role === 'user' ? userName : 'Moneo AI'}
                    </span>

                    <div className="flex flex-col gap-1 max-w-[80%]">
                        {m.parts.map((part, i) => {
                            if (part.type !== 'text') return null

                            const text = part.text
                                .replace(/\[EXPENSE_CREATED\]/g, '')
                                .replace(/\[EXPENSE_DELETED\]/g, '')
                                .trim()

                            if (!text) return null

                            return (
                                <div
                                    key={i}
                                    className={`text-sm px-3 py-2 rounded-xl ${
                                        m.role === 'user'
                                            ? 'bg-gray-900 text-white rounded-br-sm'
                                            : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                                    }`}
                                >
                                    <ReactMarkdown
                                        components={{
                                            p: ({ children }) => <p className="m-0">{children}</p>,
                                        }}
                                    >
                                        {text}
                                    </ReactMarkdown>
                                </div>
                            )
                        })}
                    </div>
                </div>
            ))}
            <div ref={bottomRef} />
        </div>
    )
}
