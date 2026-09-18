import { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
    image?: string
}>

export default function AuthLayout({ children, image }: Props) {
    return (
        <div className="min-h-screen flex">
            {/* Left column */}
            <div
                className="hidden lg:flex lg:w-1/2 relative h-screen bg-cover bg-center"
                style={image ? { backgroundImage: `url('${image}')` } : undefined}
            >
                {/* Overlay logo/text */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

                <div className="relative z-10 flex flex-col justify-end p-10 text-white">
                    <span className="text-7xl font-unique text-accent">Moneo</span>
                    <p className="mt-2 text-sm text-surface">Gestiona tus gastos e ingresos en un único lugar.</p>
                </div>
            </div>

            {/* Right column */}
            <div className="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-10">
                <div className="w-full max-w-md">{children}</div>
            </div>
        </div>
    )
}
