import './home.scss'
import {Button} from 'reactstrap'

const Home = (props) => {

    //document.body.style = 'background: white'

    return(
        <div>
            <h1>
            User home page
            </h1>
            <Button onClick={props.clickLogout}>Logout</Button>
        </div>
    )
}

export default Home