import './LoginForm.css'
import {useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {setCurrentUsername} from "../store_features/orderSlice";

export default function LoginForm(props) {
    const dispatch = useDispatch();
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)

    const login = () => {
        props.setLoggedIn(true);
        dispatch(setCurrentUsername(username))
    }

    return (
        <div className='login-container'>
            <h1 style={{display: 'flex', justifyContent: 'center'}}>TRAVEL HUNT</h1>
            <input className='input' placeholder='Enter username...'
                   value={username}
                   onInput={(ev) => setUsername(ev.target.value)}/>
            <input type='password' className='input' placeholder='Enter password...'
                   value={password}
                   onInput={(ev) => setPassword(ev.target.value)}/>
            <button className='input' onClick={login}>Login</button>
        </div>
    )
}
