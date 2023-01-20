import './LoginForm.css'
import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {setCurrentUsername} from "../store_features/orderSlice";
import {routeService} from "../services/service";
import Cluj_Map from "../assets/images/cluj_map.jpg";

export default function LoginForm({setToken}) {
    const dispatch = useDispatch();
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [incorrectCredentials, setIncorrectCredentials] = useState(false)

    const login = async () => {
        const login = await routeService.login(username, password);
        if(login){
            window.localStorage.setItem('token', login)
            window.localStorage.setItem('username', username)
            setToken(login)
            dispatch(setCurrentUsername(username))
        }
        else {
            setIncorrectCredentials(true)
            const timeout = setTimeout(() => {
                setIncorrectCredentials(false);
            }, 3000);

            return () => clearTimeout(timeout);
        }

    }

    return (
        <div className='login-container'>
            <img src={require(`../assets/images/logo.jpg`)} alt='logo' width="200" height="150"
                 style={{borderRadius: '20px', display: 'flex', justifyContent: 'center' }}/>
            {incorrectCredentials &&
                <h3 style={{color: 'red', display: 'flex', justifyContent: 'center'}}>Incorrect credentials!</h3>
            }
            <input className='input' placeholder='Enter username...'
                   value={username}
                   onInput={(ev) => setUsername(ev.target.value)}/>
            <input type='password' className='input' placeholder='Enter password...'
                   value={password}
                   onInput={(ev) => setPassword(ev.target.value)}/>
            <button className='submit-button' onClick={login}>Login</button>
        </div>
    )
}
