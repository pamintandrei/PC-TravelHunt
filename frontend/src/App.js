import Header from "./header/Header";
import './App.css'
import Slidebar from "./slidebar/Slidebar";
import Map from "./map/Map";
import { useEffect, useState } from 'react';
import LoginForm from "./components/LoginForm";

function App() {
    const [token, setToken] = useState(null)

    useEffect(() => {
        const token = window.localStorage.getItem('token')
        if(token){
            setToken(token)
        }
    }, [token])

    return (
        <div style={{width:'100%'}}>
            {token ?
                <>
                    <Header/>
                    <div style={{display: 'flex'}}>
                        <Slidebar setToken={setToken}/>
                        <Map/>
                    </div>
                </>
                : <LoginForm setToken={setToken}/>
            }

        </div>
      );
}

export default App;
