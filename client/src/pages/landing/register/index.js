import './register.scss'

import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, Button, Input, FormText, Alert } from 'reactstrap'
import APIURL from '../../../helpers/environment'

const Register = (props) => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [modal, setModal] = useState(false)
    const history = useHistory()

    useEffect(() => {
        setError(false)
        setEmail('')
        setUsername('')
        setPassword('')
    }, [modal])

    const toggle = () => {
        setModal(!modal)
    }

    const closeBtn = <Button color="danger" className="close" onClick={toggle}>&times;</Button>

    let authTwo = (e) => {
        e.preventDefault()
        fetch(`${APIURL}/user/register`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                user: {
                    email: email,
                    username: username,
                    password: password
                }
            })
        }).then(res => res.json())
            .then(json => {
                props.setUserTitle(json.user.username)
                props.updateToken(json.token)
                history.push('/')

            })
            .catch(err => {
                console.log(err)
                setError(true)
            })
    }

    return (
        <div className="modalDiv">
            <button onClick={toggle}>Don't have an account? Sign up here!</button>
            <Modal className="modalBox" isOpen={modal}>
                <Form className="modalForm" onSubmit={authTwo}>
                    <ModalHeader toggle={toggle} close={closeBtn}>
                        <h3> Create an Account </h3>
                    </ModalHeader>
                    <ModalBody>
                        {error ? <Alert color="danger">Username or email already exist</Alert> : null}
                        <FormText>Enter Email</FormText>
                        <Input type="email" aria-label="email" placeholder="example@example.com"
                            required
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}>
                        </Input>
                        <FormText>Enter Username</FormText>
                        <Input type="text" aria-label="username" placeholder="Make it cool!"
                            value={username} onChange={(e) => { setUsername(e.target.value) }}></Input>
                        <FormText>Enter Password (5 or more characters, please!)</FormText>
                        <Input type="password" aria-label="password"
                            required minLength="5"
                            placeholer="Password" value={password} onChange={(e) => { setPassword(e.target.value) }}>
                        </Input>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" color="warning">Sign Up</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </div>
    )

}

export default Register
