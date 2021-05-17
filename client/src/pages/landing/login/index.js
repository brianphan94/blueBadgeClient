import {useState} from 'react'

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    let auth = (e) => {
        e.preventDefault()
        fetch('http://localhost:4040/user/login', {
            method: 'POST',
            headers: new Headers({
                'Content-type': 'application/json'
            }),
            body: JSON.stringify({
                user:{
                    email: email, 
                    password: password
                }
            })
        })
        .then(res => res.json())
        .then(json => {
            props.updateToken(json.token)
            console.log(json.token)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return(
        <div>
        <h1>Login</h1>
        <form onSubmit={auth}>
            <input type="email" aria-label="email" placeholder="example@example.com"
            value={email}
            onChange={(e) => {setEmail(e.target.value)}}/>
            <input type="password" aria-label="password" placeholer="Password" value={password} onChange={(e) => {setPassword(e.target.value)}}>
            </input>
            <button type="submit">Login</button>
        </form>

        </div>
    )
}

export default Login