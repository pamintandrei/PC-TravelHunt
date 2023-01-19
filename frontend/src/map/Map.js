import './Map.css'
import Cluj_Map from '../assets/images/cluj_map.jpg'
import Building from '../components/Building'
import {routeService} from "../services/service";
import {useEffect, useState} from 'react'
import {useDispatch} from "react-redux";
import {setReviews} from "../store_features/orderSlice";

export default function Map() {
    const buildingIdsInOrder = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
    const dispatch = useDispatch();

    const getReviews = async () => {
        const reviews = await routeService.getAllReviews();
        dispatch(setReviews(reviews))
    }

    useEffect(() => {
        const token = window.localStorage.getItem('token')
        getReviews(token)
    }, [])

    return (
        <div id='map'>
            <img src={Cluj_Map} alt={'Cluj Map'} width={'100%'} height={'100%'} style={{position: 'relative', top: '0', left: '0'}} />
            {buildingIdsInOrder.map((buildingId, ) => (
                <Building key={buildingId} buildingId={buildingId}/>
            ))}
        </div>
    )
}


