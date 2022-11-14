import Image1 from '../assets/images/1.jpg'
export default function Building({building}) {
    var random1=Math.floor(Math.random() * 520);
    var random2=Math.floor(Math.random() * 1300); 
    // style={{position: 'relative', zIndex: '5', top: `${random1}px`, bottom: `${random2}px`}}
    return (
        <div style={{display: 'flex', flexDirection: 'column', width:'100px', height:'100px', position: 'absolute', top: `${random1}px`, left: `${random2}px`}}>
            <div style={{display: 'flex', justifyContent: 'center'}}>
               <span style={{background: 'red', color:'black', padding: '0 5px'}}> {building.id} </span>
            </div>
            <img src={Image1} alt='building' width="100" height="100" />
        </div>
    )
} 