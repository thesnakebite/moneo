import { usePage } from "@inertiajs/react"

type Props = {
    className?: string
}

export default function ContactEmail({ className }: Props) {
    const { contactEmail } = usePage().props
    const [user, domain] = contactEmail.split('@')

    return (
        <a href={`mailto:${contactEmail}`} className={className}>
            {user}<wbr />@{domain}
        </a>
    )
}
