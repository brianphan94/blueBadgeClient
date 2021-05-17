import {useState} from 'react'

import {Col, Form, Input, Button, Label, FormGroup} from 'reactstrap'

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
       
        
        <Form onSubmit={auth}>
            <FormGroup>
            <Col md={12} className="email">
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
            <Button outline color="warning" size="lg" type="submit">Login</Button>
            </FormGroup>
        </Form>

       
    )
}

export default Login