import Header from "./header/Header";
import './App.css'
import Slidebar from "./slidebar/Slidebar";
import Map from "./map/Map";

function App() {
  return (
    <div style={{width: '100%'}}>
        <Header/>
        <div style={{display: 'flex'}}>
            <Slidebar/>
            <Map/>
        </div>
    </div>
  );
}

export default App;
