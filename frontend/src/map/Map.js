import './Map.css'
import Cluj_Map from '../assets/images/cluj_map.jpg'
import {useEffect, useState} from 'react'
import axios from 'axios';
import Building from '../components/Building'
import { useSelector } from 'react-redux';


export default function Map() {
    const [buildingIdsInOrder, setBuildingsIdsInOrder] = useState([3,7,9,15,18,19]) // ex: [5,3,8,2]
    const buildingVisitingOrderList = useSelector((state) => state.order.value)
    //const [buildingVisitingOrderList, setBuildingVisitingOrderList] = useState([])


    useEffect(() => {
        // axios.get('http://127.0.0.1:8000/route?username=mihainan').then((response) => {
        //     setBuildingsIdsInOrder(response)
        // }).catch((err) => {
        //     console.log(err)
        // })
    }, [])


    return (
        <div id='map'>
            <img src={Cluj_Map} alt={'Cluj Map'} width={'100%'} height={'100%'} style={{position: 'relative', top: '0', left: '0'}} />
            {buildingIdsInOrder?.map((buildingId, index) => (
                <Building buildingId={buildingId} buildingOrder={buildingVisitingOrderList[index + 1]}/>
            ))}
        </div>
    )
}


