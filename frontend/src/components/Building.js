import './Building.css'
import {constants} from '../utils/constants'
import {useEffect, useState} from 'react'
import BuildingComponent from "./BuildingComponent";
import {useSelector} from "react-redux";

export default function Building({buildingId}) {
    const [buildingVisible, setBuildingVisible] = useState(false)
    const [enabledBuildingComponent, setEnabledBuildingComponent] = useState(false)
    const buildingVisitingOrderList = useSelector((state) => state.order.value.array)
    const [buildingOrder, setBuildingOrder] = useState(null);

    useEffect(() => {
        if(buildingVisitingOrderList.includes(buildingId)){
            setBuildingOrder(buildingVisitingOrderList.indexOf(buildingId))
        }
        else {
            setBuildingOrder(null)
        }
    }, [buildingVisitingOrderList])

    useEffect(() => {
        setBuildingOrder(null)
    }, [])

    return (
        <div className='container' style={{top: `${constants.buildingPositions[buildingId].top}px`, 
                                            left: `${constants.buildingPositions[buildingId].left}px`}}>
            <div className='building-button'  onClick={() => {
                setEnabledBuildingComponent(false)
                setBuildingVisible(!buildingVisible)
            }}>
                {buildingOrder != null && <div className='building-span'> {buildingOrder + 1} </div>}
            </div>
            {buildingVisible && 
                <div className='building-info-container'>
                    <img src={require(`../assets/images/${buildingId}.jpg`)} alt='building' width="100" height="100"
                            style={{borderRadius: '20px' }}/>
                    <div className='building-info' onClick={() => {
                        setBuildingVisible(!buildingVisible)
                        setEnabledBuildingComponent(!enabledBuildingComponent)
                    }}>
                        {constants.buildingPositions[buildingId].name}
                    </div>
                </div>
            }
            {enabledBuildingComponent && <BuildingComponent buildingId={buildingId}/>}
        </div>
    )
} 