import { TriangleAlertIcon, type TriangleAlertIconHandle } from "@animateicons/react/lucide";
import { useEffect, useRef, useState } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

type Props = {
    percentageUsed: number
    pathColor?: string
    trailColor?: string
    textColor?: string
    textSize?: string
    alertRing?: string
    alertIconSize?: number
}

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function ProgressBar({
    percentageUsed,
    pathColor = '#AA7452',
    trailColor = '#c4b4b1',
    textColor = '#051822',
    textSize = '22px',
    alertRing = 'ring-surface',
    alertIconSize = 20,
}: Props) {
    const alertIconRef = useRef<TriangleAlertIconHandle>(null)
    const isOver = percentageUsed >= 100
    const reducedMotion = prefersReducedMotion()

    const [displayedValue, setDisplayedValue] = useState(reducedMotion ? percentageUsed : 0)

    useEffect(() => {
        if (reducedMotion) {
            setDisplayedValue(percentageUsed)
            return
        }

        const timeout = setTimeout(() => setDisplayedValue(percentageUsed), 200)
        return () => clearTimeout(timeout)
    }, [percentageUsed, reducedMotion])

    useEffect(() => {
        if (!isOver) return

        const timeout = setTimeout(() => alertIconRef.current?.startAnimation(), reducedMotion ? 50 : 700)
        return () => clearTimeout(timeout)
    }, [isOver, reducedMotion])

    return (
        <div
            className="relative"
            onMouseEnter={() => alertIconRef.current?.startAnimation()}
            onMouseLeave={() => alertIconRef.current?.stopAnimation()}
        >
            <CircularProgressbar
                value={displayedValue}
                text={`${percentageUsed}%`}
                styles={buildStyles({
                    pathColor,
                    trailColor,
                    textColor,
                    textSize,
                    pathTransition: reducedMotion ? 'none' : undefined,
                })}
            />

            {isOver && (
                <span
                    role="img"
                    aria-label="Presupuesto superado"
                    className={`absolute -top-1 -right-1 flex w-[30%] aspect-square items-center justify-center rounded-full bg-red-600 text-white ring-2 ${alertRing}`}
                >
                    <TriangleAlertIcon
                        ref={alertIconRef}
                        size={alertIconSize}
                        duration={1}
                        color="currentColor"
                    />
                </span>
            )}
        </div>
    )
}
