import './BuildingComponent.css'
import {constants} from '../utils/constants'
import {useEffect, useState} from 'react'
import { service } from '../service/service';


export default function BuildingComponent({buildingId}) {
    const [buildingReviews, setBuildingReviews] = useState([{reviewText: 'este frumoasa', stars: 4, user: {username: 'Mihai'}},
        {reviewText: 'nu imi place', stars: 2, user: {username: 'Andrei'}},
        {reviewText: 'mi-a placut foarte mult ', stars: 5, user: {username: 'Ion'}},
        {reviewText: 'nu mi-a placut deloc ', stars: 1, user: {username: 'Alexandra'}}])

    const [buildingReviews2, setBuildingReviews2] = useState([{reviewText: 'review test', stars: 5, user: {username: 'Cami'}},
        {reviewText: 'review text test 3', stars: 1.5, user: {username: 'Ionut'}}])


    useEffect(() => {
        const init = async () => {
            console.log(buildingId)
            //getReviewsForBuilding(buildingId)
        }
        init();
    }, [])



    const getReviewsForBuilding = (buildingId) => {
        // let response=service.get("http://127.0.0.1:8000/route?username=mihainan")
        // var array = JSON.parse(response)
        // setBuildingsIdsInOrder(array)
    }

    return (
        <div className='building-component'>
            <div className='building-component-container'>
                <h2>{constants.buildingPositions[buildingId].name}</h2>
                <img src={require(`../assets/images/${buildingId}.jpg`)} alt='building' width="600" height="320"
                     style={{borderRadius: '20px' }}/>
                <div style={{letterSpacing: '1px'}}>
                    {constants.buildingPositions[buildingId].description}
                </div>
                <div className='building-reviews'>
                    {buildingId === 14 ? buildingReviews?.map((review) => (
                        <div style={{display: 'flex', borderBottom: '2px solid red'}} >
                            <span style={{flex: '1'}}>{review.user.username}</span>
                            <span style={{flex: '1'}}> {review.stars}/5 ⭐</span>
                            <span style={{flex: '1'}}> {review.reviewText}</span>
                        </div>
                    )) :
                        buildingReviews2?.map((review) => (
                            <div style={{display: 'flex', borderBottom: '2px solid red'}} >
                                <span style={{flex: '1'}}>{review.user.username}</span>
                                <span style={{flex: '1'}}> {review.stars}/5 ⭐</span>
                                <span style={{flex: '1'}}> {review.reviewText}</span>
                            </div>
                        ))
                    }
                </div>
            </div>

        </div>
    )
}