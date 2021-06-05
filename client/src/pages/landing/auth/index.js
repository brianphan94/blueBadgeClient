import Login from '../login'
import Register from '../register'

const Auth = (props) => {

    return (
        <div>
            <div className="titleBox">
            <h3>Get Ready To... </h3>
            <h4>Btn.Mash!</h4>
            </div>
            <div>
                <Login setUserTitle={props.setUserTitle} updateToken={props.updateToken} />
            </div>
            <div>
                <Register setUserTitle={props.setUserTitle} updateToken={props.updateToken} />
            </div>
        </div>
    )
}

export default Auth
