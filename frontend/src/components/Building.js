import './Building.css'
import {useState} from 'react'

export default function Building({buildingId, buildingOrder}) {
    let random1,random2;
    const [buildingVisible, setBuildingVisible] = useState(false)

    useState(() => {
        random1=Math.floor(Math.random() * 770);
        random2=Math.floor(Math.random() * 1480); 
    },[])


    return (
        <div className='container' style={{top: `${random1}px`, left: `${random2}px`}}>
            <div className='building-button'  onClick={() => setBuildingVisible(!buildingVisible)}>
               {buildingOrder && <span className='building-span'> {buildingOrder} </span>}
            </div>
            {buildingVisible && 
                <img src={require(`../assets/images/${buildingId}.jpg`)} alt='building' width="100" height="100" style={{borderRadius: '500px', border: '3px solid black'}}/>
            }
        </div>
    )
} 