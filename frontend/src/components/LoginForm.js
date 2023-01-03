import './LoginForm.css'

export default function LoginForm() {

    return (
        <div className='login-container'>
            <h1 style={{display: 'flex', justifyContent: 'center'}}>TRAVEL HUNT</h1>
            <input className='input'/>
            <input type='password' className='input'/>
            <button>Login</button>
        </div>
    )
}
