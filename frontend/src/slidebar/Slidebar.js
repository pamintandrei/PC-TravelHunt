import './Slidebar.css'
import routeService from '../services/routeService'
import axios from 'axios';

export default function Slidebar() {
    const config = {
        headers:{
          'Access-Control-Allow-Origin': '*',
        }
      };
    const generateRoute = () => {
        return axios.get('http://127.0.0.1:8000/route?username=mihainan', config).then((response) => {
            console.log(response)
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <div id='scrollbar'>
            <div className='scrollbar-button' onClick={generateRoute}>
                Generate route
            </div>
        </div>
    )
}