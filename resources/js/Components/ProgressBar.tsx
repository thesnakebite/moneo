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
                pathColor: '#AA7452',
                trailColor: '#c4b4b1',
                textColor: '#051822',
                textSize: '22px',
            })}
        />
    )
}
