import { useEffect, useRef } from 'react'
import ReactMarkdown  from 'react-markdown'
import type { UIMessage } from 'ai'

type Props = {
    messages: UIMessage[]
    userName: string
}

const MARKERS = ['[EXPENSE_CREATED]', '[EXPENSE_DELETED]', '[EXPENSE_ERROR]', '[EXPENSE_AMBIGUOUS]']

export default function ChatMessages({ messages, userName }: Props) {
    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    return (
        <div className="max-h-56 overflow-y-auto flex flex-col gap-2 pr-1 mb-4">
            {messages.map((m) => (
                <div key={m.id} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <span className="text-[10px] font-semibold text-muted/70 mb-0.5 px-1">
                        {m.role === 'user' ? userName : 'Moneo AI'}
                    </span>

                    <div className="flex flex-col gap-1 max-w-[80%]">
                        {m.parts.map((part, i) => {
                            if (part.type !== 'text') return null

                            const text = MARKERS
                                .reduce((acc, marker) => acc.replaceAll(marker, ''), part.text)
                                .trim()

                            if (!text) return null

                            return (
                                <div
                                    key={i}
                                    className={`text-sm px-3 py-2 rounded-xl ${
                                        m.role === 'user'
                                            ? 'bg-ink text-white rounded-br-sm'
                                            : 'bg-surface border border-border-soft text-ink rounded-bl-sm'
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
