import './Slidebar.css'
import {useDispatch, useSelector} from 'react-redux'
import { setRoute, resetRoute } from '../store_features/orderSlice';
import {routeService} from "../services/service";
import { useEffect } from 'react';

export default function Slidebar({setToken}) {
    const dispatch = useDispatch();

    const generate = async () => {
        const username = window.localStorage.getItem('username')

        const array = await routeService.generateRoute(username);
        dispatch(setRoute(array))
    }

    const reset = () => {
        dispatch(resetRoute())
    }

    const logout = () => {
        window.localStorage.clear();
        setToken(null)
    }

    return (
        <div id='scrollbar'>
            <div className='scrollbar-button'  onClick={generate}>
                Generate route
            </div>
            <div className='scrollbar-button'  onClick={reset}>
                Reset route
            </div>
            <div className='scrollbar-button'  onClick={logout}>
                Logout
            </div>
        </div>
    )
}