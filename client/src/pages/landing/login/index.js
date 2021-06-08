import {useState} from 'react'
import {useHistory} from 'react-router-dom'

import {Col, Form, Input, Button, Label, FormGroup, Alert} from 'reactstrap'
import APIURL from '../../../helpers/environment'

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const history = useHistory()
  
    let auth = (e) => {
        e.preventDefault()
        fetch(`${APIURL}/user/login`, {
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
            props.setUserTitle(json.user.username)
            props.updateToken(json.token) 
            history.push('/')
            
        })
        .catch(err => {
            setError(true)
            console.log(err)
        })
      
    }
 
    return(
        <Form onSubmit={auth}>
            <FormGroup>
            <Col md={12} className="email">
            {error ? <Alert color="danger">Email or password is incorrect!</Alert>:null}
            {error && !email && !password ? setError(false) : null}
            <Label> Email</Label> 
            <Input type="email" aria-label="email" placeholder="example@example.com"
            value={email}
            required
            onChange={(e) => {setEmail(e.target.value)}}/>
            </Col>
            <Col md={12} className="password">
            <Label>Password</Label>
            <Input type="password" aria-label="password" placeholer="Password" value={password} required onChange={(e) => {setPassword(e.target.value)}}>
            </Input>
            </Col>
            <Button className="login" outline color="warning" size="lg" type="submit">Login</Button>

            </FormGroup>
        </Form>    
    )
}

export default Login
