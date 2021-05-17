import {useState} from 'react'
import {Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroupm, Button, FormGroup} from 'reactstrap'
//import '../auth/auth.scss'

const Register = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [modal, setModal] = useState(false)
    const [unmountOnClose, setUnmountOnClose] = useState(true)

    const toggle = () => setModal(!modal)
    const closeBtn = <Button className="close" onClick={toggle}>&times;</Button>

    // const changeUnmountOnClose = (e) => {
    //     let value = e.target.value;
    //     setUnmountOnClose(JSON.parse(value))
    
    // }
    

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
        <button onClick={toggle}>Don't have an account? Sign up here!</button>
            <Modal isOpen={modal} toggle={toggle} unmountOnClose={unmountOnClose}>
            <Form onSubmit={authTwo}>
                <ModalHeader toggle={toggle} close={closeBtn}>Create an Account</ModalHeader>
                <ModalBody>
                    <input type="email" aria-label="email" placeholder="example@example.com"
                    value={email}
                    onChange={(e) => {setEmail(e.target.value)}}
                    >
                    </input>
                    <input type="password" aria-label="password" placeholer="Password" value={password} onChange={(e) => {setPassword(e.target.value)}}
                    >
                    </input>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" onClick={toggle}>Sign Up</Button>
                </ModalFooter>

            </Form>
          
            </Modal>
            
            
            
        

        </div>
    )

}

export default Register