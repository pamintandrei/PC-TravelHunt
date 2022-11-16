import './Map.css'
import Cluj_Map from '../assets/images/cluj_map.jpg'
import {useEffect, useState} from 'react'
import axios from 'axios';
import Building from '../components/Building'
import { useSelector } from 'react-redux';


export default function Map() {
    const [buildingIdsInOrder, setBuildingsIdsInOrder] = useState([]) // ex: [5,3,8,2]
    // const buildingVisitingOrderList = useSelector((state) => state.buildingVisitingOrderList)
    const [buildingVisitingOrderList, setBuildingVisitingOrderList] = useState([])
    // const mockBuildings = [
    //     {id: 3, name: 'Cluj Arena', location: 'Aleea Stadionului, nr. 2'},
    //     {id: 4, name: 'Palatul Bánffy', location: 'str. Piața Unirii nr. 30'},
    //     {id: 5, name: 'Cluj Arena', location: 'Aleea Stadionului, nr. 2'},
    //     {id: 6, name: 'Palatul Bánffy', location: 'str. Piața Unirii nr. 30'},
    // ]

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/route?username=mihainan').then((response) => {
            setBuildingsIdsInOrder(response)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    const generateRoute = () => {
        setBuildingVisitingOrderList([...Array(5).keys()])
    }

    return (
        <div id='map'>
            <img src={Cluj_Map} alt={'Cluj Map'} width={'100%'} height={'100%'} style={{position: 'relative', top: '0', left: '0'}} />
            <button style= {{position: 'absolute', top: '0', left: '0', padding: '40px 40px'}} onClick={generateRoute}>
                Generate route
            </button>
            {buildingIdsInOrder?.map((buildingId, index) => (
                <Building buildingId={buildingId} buildingOrder={buildingVisitingOrderList[index + 1]}/>
            ))}
        </div>
    )
}


