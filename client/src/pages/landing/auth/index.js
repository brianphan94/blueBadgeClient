import Login from '../login'
import Register from '../register'



const Auth = (props) => {
    
    
   
    
    
    return(
        <div>
            <div>
                <Login  setUserTitle={props.setUserTitle} updateToken={props.updateToken}/>
               
                
            </div>
            <div>
                <Register setUserTitle={props.setUserTitle} updateToken={props.updateToken} />
            </div>
        </div>
    )
}

export default Auth