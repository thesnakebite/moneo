import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

type Props = {
    percentageUsed: number
    pathColor?: string
    trailColor?: string
    textColor?: string
    textSize?: string
}

export default function ProgressBar({
    percentageUsed,
    pathColor = '#AA7452',
    trailColor = '#c4b4b1',
    textColor = '#051822',
    textSize = '22px',
}: Props) {
    return (
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
    )
}
