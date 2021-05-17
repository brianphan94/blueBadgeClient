import Login from '../login'
import Register from '../register'

import './auth.scss'


const Auth = (props) => {
    
    
    
    return(
        <div>
            <div>
                <Login  updateToken={props.updateToken}/>
            </div>
            <div>
                <Register updateToken={props.updateToken} />
            </div>
        </div>
    )
}

export default Auth