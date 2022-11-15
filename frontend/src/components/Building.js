import Image1 from '../assets/images/1.jpg'
import './Building.css'
import {useState} from 'react'
export default function Building({building}) {
    let random1;
    let random2; 
    const [buildingVisible, setBuildingVisible] = useState(false)
    const [buildingVisitingOrder, setBuildingVisitingOrder] = useState([1,2])
    useState(() => {
        random1=Math.floor(Math.random() * 770);
        random2=Math.floor(Math.random() * 1480); 
    },[])

    return (
        <div className='container' style={{top: `${random1}px`, left: `${random2}px`}}>
            <div className='building-button'  onClick={() => setBuildingVisible(!buildingVisible)}>
               {buildingVisitingOrder.length > 0 && <span className='building-span'> {building.id} </span>}
            </div>
            {buildingVisible && 
                <img src={Image1} alt='building' width="100" height="100" style={{borderRadius: '500px', border: '3px solid black'}}/>
            }
        </div>
    )
} 