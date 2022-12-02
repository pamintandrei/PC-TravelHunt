import './Building.css'
import {constants} from '../utils/constants'
import {useEffect, useState} from 'react'

export default function Building({buildingId, buildingOrder}) {
    const [buildingVisible, setBuildingVisible] = useState(false)

    //TODO nr. 9
    useEffect(() => {
        // debugger;
    }, [buildingVisible])

    return (
        <div className='container' style={{top: `${constants.buildingPositions[buildingId].top}px`, 
                                            left: `${constants.buildingPositions[buildingId].left}px`}}>
            <div className='building-button'  onClick={() => setBuildingVisible(!buildingVisible)}>
                {buildingOrder && <div className='building-span'> {buildingOrder} </div>}
            </div>
            {buildingVisible && 
                <div className='building-info-container'>
                    <img src={require(`../assets/images/${buildingId}.jpg`)} alt='building' width="100" height="100"
                            style={{borderRadius: '20px' }}/>
                    <div className='building-info'>
                        {constants.buildingPositions[buildingId].name}
                    </div>
                </div>
            }
        </div>
    )
} 