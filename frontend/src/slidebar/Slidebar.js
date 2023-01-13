import './Slidebar.css'
import {useDispatch, useSelector} from 'react-redux'
import { generateRoute, resetRoute } from '../store_features/orderSlice';

export default function Slidebar() {
    const dispatch = useDispatch();

    const generate = () => {
        dispatch(generateRoute())
    }

    const reset = () => {
        dispatch(resetRoute())
    }

    return (
        <div id='scrollbar'>
            <div className='scrollbar-button'  onClick={generate}>
                Generate route
            </div>
            <div className='scrollbar-button'  onClick={reset}>
                Reset route
            </div>
        </div>
    )
}