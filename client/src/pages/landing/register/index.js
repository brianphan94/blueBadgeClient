import {useState} from 'react'
import {Modal, ModalHeader, ModalBody, ModalFooter, Form, Button} from 'reactstrap'


const Register = (props) => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [modal, setModal] = useState(false)

    const toggle = () => setModal(!modal)
    const closeBtn = <Button className="close" onClick={toggle}>&times;</Button>
    
    
       

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
                    username: username,
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
            <Modal isOpen={modal} toggle={toggle} >
            <Form onSubmit={authTwo}>
                <ModalHeader toggle={toggle} close={closeBtn}>Create an Account</ModalHeader>
                <ModalBody>
                    <input type="email" aria-label="email" placeholder="example@example.com"
                    required
                    value={email}
                    onChange={(e) => {setEmail(e.target.value)}}
                    >
                    </input>
                    <input type="text" aria-label="username" placeholder="username here!"
                    value={username} onChange={(e) => {setUsername(e.target.value)}}></input>

                    <input type="password" aria-label="password"
                    required 
                    placeholer="Password" value={password} onChange={(e) => {setPassword(e.target.value)}}
                    >
                    </input>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit">Sign Up</Button>
                </ModalFooter>

            </Form>
          
            </Modal>
            
            
            
        

        </div>
    )

}

export default Register