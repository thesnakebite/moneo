import { TriangleAlertIcon, type TriangleAlertIconHandle } from "@animateicons/react/lucide";
import { useEffect, useRef } from "react";
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

    useEffect(() => {
        if (!isOver) return

        const timeout = setTimeout(() => alertIconRef.current?.startAnimation(), 50)
        return () => clearTimeout(timeout)
    }, [isOver])

    return (
        <div
            className="relative"
            onMouseEnter={() => alertIconRef.current?.startAnimation()}
            onMouseLeave={() => alertIconRef.current?.stopAnimation()}
        >
            <CircularProgressbar
                value={percentageUsed}
                text={`${percentageUsed}%`}
                styles={buildStyles({
                    pathColor,
                    trailColor,
                    textColor,
                    textSize,
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
