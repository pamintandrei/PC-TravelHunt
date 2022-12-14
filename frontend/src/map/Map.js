import './Map.css'
import Cluj_Map from '../assets/images/cluj_map.jpg'
import {useEffect, useState} from 'react'
import axios from 'axios';
import Building from '../components/Building'
import { useSelector } from 'react-redux';
import { service } from '../service/service';

export default function Map() {
    const [buildingIdsInOrder, setBuildingsIdsInOrder] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]) // ex: [5,3,8,2]
    const buildingVisitingOrderList = useSelector((state) => state.order.value)

    useEffect(() => {
        // let response=service.get("http://127.0.0.1:8000/route?username=mihainan")
        // var array = JSON.parse(response)
        // console.log(response)
        // setBuildingsIdsInOrder(array)
        //{
        //             headers: {
        //                 method: 'GET',
        //                 headers: {
        //                     "Access-Control-Allow-Origin": "*"
        //                 },
        //             }
        //         }
        fetch('http://127.0.0.1:8000/route?username=mihainan').then(response => console.log(response))
            .then(response => console.log(response))

    }, [])


    return (
        <div id='map'>
            <img src={Cluj_Map} alt={'Cluj Map'} width={'100%'} height={'100%'} style={{position: 'relative', top: '0', left: '0'}} />
            {buildingIdsInOrder.map((buildingId, index) => (
                <Building key={buildingId} buildingId={buildingId} buildingOrder={buildingVisitingOrderList[index]}/>
            ))}
        </div>
    )
}


