import Header from "./header/Header";
import './App.css'
import Slidebar from "./slidebar/Slidebar";
import Map from "./map/Map";
import { useState } from 'react';
import LoginForm from "./components/LoginForm";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    return (
        <div style={{width:'100%'}}>
            {loggedIn ?
                <>
                    <Header/>
                    <div style={{display: 'flex'}}>
                        <Slidebar/>
                        <Map/>
                    </div>
                </>
                : <LoginForm setLoggedIn={setLoggedIn}/>
            }

        </div>
      );
}

export default App;
