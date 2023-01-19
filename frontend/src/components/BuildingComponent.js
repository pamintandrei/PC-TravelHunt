import './BuildingComponent.css'
import {constants} from '../utils/constants'
import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from "react-redux";
import {routeService} from "../services/service";
import {setReviews} from "../store_features/orderSlice";




export default function BuildingComponent({buildingId}) {
    const [buildingReviews, setBuildingReviews] = useState(null)
    const [reviewText, setReviewText] = useState(null)
    const [nrOfStars, setNrOfStars] = useState(null)
    const allReviews = useSelector((state) => state.order.value.reviews)
    const dispatch = useDispatch()
    const [qr, setQr] = useState(null);

    useEffect(() => {
        const init = async () => {
            setBuildingReviews(getReviewsForBuilding(buildingId))
            try{
                let qr = require(`../assets/QRs/${buildingId}.jpeg`);
                if(qr)
                    setQr(qr)
            }catch(e){
                console.log(e)
            }
        }
        init();
    }, [])

    useEffect(() => {
        setBuildingReviews(getReviewsForBuilding(buildingId))
    }, [allReviews])

    const getReviewsForBuilding = (id) => {
        return allReviews.filter(review => review.buildingId === id)
    }

    const submitReview = async () => {
        if(nrOfStars < 1 || nrOfStars > 5) {
            alert("Number of stars must be between 1 and 5")
            setNrOfStars('')
        }
        if(!reviewText.length)
            alert("The review text can't be empty!")

        const review = await routeService.saveReview(reviewText, parseInt(nrOfStars), buildingId)
        const newBuildingReviews = [...buildingReviews]
        newBuildingReviews.push(review)
        setBuildingReviews(newBuildingReviews)
        const newReviews = [...allReviews]
        newReviews.push(review)
        dispatch(setReviews(newReviews))
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
                    {buildingReviews?.map((review) => (
                        <div style={{display: 'flex', borderBottom: '2px solid red'}} >
                            <span style={{flex: '1'}}>{review.user.username}</span>
                            <span style={{flex: '1'}}> {review.stars}/5 ⭐</span>
                            <span style={{flex: '1'}}> {review.reviewText}</span>
                        </div>

                    ))}
                </div>
                <div style={{display: 'flex', gap:'10px', width: '100%', height: '5%'}}>
                    <input style={{width: '70%'}} placeholder='Write a review...' value={reviewText} onInput={(ev) => setReviewText(ev.target.value)}/>
                    <input style={{width: '10%'}} placeholder='Stars' value={nrOfStars} onInput={(ev) => setNrOfStars(ev.target.value)}/>
                    <button style={{width: '20%', backgroundColor: '#b75c3f', border: '2px solid #7e3d2b',
                        borderRadius: '10px',
                        cursor: 'pointer'}} onClick={submitReview}> Submit </button>
                </div>
                {qr && <img src={qr} alt='building' width="150" height="150"/>}
            </div>

        </div>
    )
}