import './BuildingComponent.css'
import {constants} from '../utils/constants'

export default function BuildingComponent({buildingId}) {
    return (
        <div className='building-component'>
            <div className='building-component-container'>
                <h2>{constants.buildingPositions[buildingId].name}</h2>
                <img src={require(`../assets/images/${buildingId}.jpg`)} alt='building' width="450" height="300"
                     style={{borderRadius: '20px' }}/>
                <div>
                    {constants.buildingPositions[buildingId].description}
                </div>
            </div>

        </div>
    )
}