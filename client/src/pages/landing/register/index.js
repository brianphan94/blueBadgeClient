import {useState} from 'react'

const Register = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    let authTwo = (e) => {
        e.preventDefault()
        fetch('http://localhost:4040/user/register',{
            method:'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                user:{
                    email: email,
                    password:password
                }
            })
        }).then(res => res.json())
          .then(json => {
                props.updateToken(json.token)
                console.log(json.token)
          })
    }

    return (
        <div>
        <h1>Sign Up</h1>
        <form onSubmit={authTwo}>
            <input type="email" aria-label="email" placeholder="example@example.com"
            value={email}
            onChange={(e) => {setEmail(e.target.value)}}>
            </input>
            <input type="password" aria-label="password" placeholer="Password" value={password} onChange={(e) => {setPassword(e.target.value)}}>
            </input>
            <button type="submit">Sign Up</button>
        </form>

        </div>
    )

}

export default Register