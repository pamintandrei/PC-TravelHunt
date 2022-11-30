import './Map.css'
import Cluj_Map from '../assets/images/cluj_map.jpg'
import {useEffect, useState} from 'react'
import axios from 'axios';
import Building from '../components/Building'
import { useSelector } from 'react-redux';

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

export default function Map() {
    const [buildingIdsInOrder, setBuildingsIdsInOrder] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]) // ex: [5,3,8,2]
    const buildingVisitingOrderList = useSelector((state) => state.order.value)
    


    useEffect(() => {
        // let response=httpGet("http://127.0.0.1:8000/route?username=mihainan")
        // var array = JSON.parse(response)
        // setBuildingsIdsInOrder(array)

    }, [])


    return (
        <div id='map'>
            <img src={Cluj_Map} alt={'Cluj Map'} width={'100%'} height={'100%'} style={{position: 'relative', top: '0', left: '0'}} />
            {buildingIdsInOrder.map((buildingId, index) => (
                <Building key={buildingId} buildingId={buildingId} buildingOrder={buildingVisitingOrderList[index + 1]}/>
            ))}
        </div>
    )
}


