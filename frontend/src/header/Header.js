import './Header.css'

export default function Header() {
    return (
        <div id="header" className="overlay">
            <img src={require(`../assets/images/logo.jpg`)} alt='logo' width="200" height="150"
                 style={{borderRadius: '20px' }}/>
        </div>

    )
}