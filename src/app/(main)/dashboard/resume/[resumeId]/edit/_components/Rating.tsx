import { Rating as ReactRating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

const Rating = ({ value, onChange }: { value: number, onChange: (val: number) => void }) => {
    return (
        <ReactRating style={{ maxWidth: 120 }} value={Math.floor(value)} onChange={(val: number) => { onChange(val) }} />
    )
}

export default Rating