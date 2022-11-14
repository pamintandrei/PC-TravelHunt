import './Slidebar.css'

export default function Slidebar() {
    return (
        <div id='scrollbar'>
            <div className='scrollbar-button'>
                Profile
            </div>
            <div className='scrollbar-button'>
                Your list of tourism attractions
            </div>
            <div className='scrollbar-button'>
                Calculate shortest route
            </div>

        </div>
    )
}