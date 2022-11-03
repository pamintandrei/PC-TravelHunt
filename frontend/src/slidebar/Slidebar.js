import './Slidebar.css'

export default function Slidebar() {
    return (
        <div id='scrollbar'>
            <ul>
                <li>
                    <a href="#">
                        <i className="fa fa-home fa-lg"></i>
                        <span className="nav-text">Home</span>
                    </a>
                </li>

                <li>
                    <a href="#">
                        <i className="fa fa-user fa-lg"/>
                        <span className="nav-text">Login</span>
                    </a>
                </li>
            </ul>
        </div>
    )
}