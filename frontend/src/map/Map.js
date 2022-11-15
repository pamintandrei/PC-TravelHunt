import './Map.css'
import Cluj_Map from '../assets/images/cluj_map.jpg'
import {useEffect} from 'react'
import axios from 'axios';
import Building from '../components/Building'
export default function Map() {
    const mockBuildings = [
        {id: 3, name: 'Cluj Arena', location: 'Aleea Stadionului, nr. 2'},
        {id: 4, name: 'Palatul Bánffy', location: 'str. Piața Unirii nr. 30'},
        {id: 5, name: 'Cluj Arena', location: 'Aleea Stadionului, nr. 2'},
        {id: 6, name: 'Palatul Bánffy', location: 'str. Piața Unirii nr. 30'},
        
    ]
    useEffect(() => {
        
    }, [])

    const generateRoute = () => {
        // axios.get('http://127.0.0.1:8000/buildings').then((response) => {
        //     response.header("Access-Control-Allow-Origin", "*");
        //     console.log(response)
        // }).catch((err) => {
        //     console.log(err)
        // })
    }

    return (
        <div id='map'>
            <img src={Cluj_Map} alt={'Cluj Map'} width={'100%'} height={'100%'} style={{position: 'relative', top: '0', left: '0'}} />
            
            {mockBuildings.map((building) => (
                <Building building={building}/>
            ))}
        </div>
    )
}