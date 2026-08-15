import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

type Props = {
    percentageUsed: number
}

export default function ProgressBar({ percentageUsed }: Props) {
    return (
        <CircularProgressbar
            value={percentageUsed}
            text={`${percentageUsed}%`}
            styles={buildStyles({
                pathColor: '#111827',
                trailColor: '#e5e7eb',
                textColor: '#111827',
                textSize: '22px',
            })}
        />
    )
}
