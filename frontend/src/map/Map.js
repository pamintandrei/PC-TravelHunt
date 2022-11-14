import './Map.css'
import Cluj_Map from '../assets/images/cluj_map.jpg'

export default function Map() {
    return (
        <div id='map'>
            <img src={Cluj_Map} alt={'Cluj Map'} width={'100%'} height={'100%'}/>
        </div>
    )
}