import './Slidebar.css'
import { generateOrderList } from '../store/buildingVisitingOrderList/buildingVisitingOrderList';
import { useDispatch } from 'react-redux'

export default function Slidebar() {
    const dispatch = useDispatch();
   
    const generateRoute = () => {
        // debugger
        // dispatch(generateOrderList([]))
    }

    return (
        <div id='scrollbar'>
            <div className='scrollbar-button'  onClick={generateRoute}>
                Generate route
            </div>
        </div>
    )
}