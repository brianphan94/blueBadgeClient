import { Nav, NavItem, Button, Container } from 'reactstrap'
import { Route, Link, Switch } from 'react-router-dom'
import Profile from '../../pages/Profile/index'
import Home from '../../pages/home-page/index'
import Twitch from '../../pages/Games/twitch'

import './sidebar.scss'




const Sidebar = (props) => {

    //document.body.style = 'background: white'
    // const [collapsed, setCollapsed] = useState(true)
    // const toggleNavbar = () => setCollapsed(!collapsed)



    return (
        <div className="header">
            <Container fluid='lg' className="sideBarDiv">

                <Nav horizontal>
                    <NavItem>
                        <h1 className='toggler'>Btn.Mash</h1>
                    </NavItem>
                    <NavItem>
                        <Link to="/">Home</Link>
                    </NavItem>

                    <NavItem>
                        <Link to="/profile">Profile</Link>
                    </NavItem>

                    <NavItem>
                        <Link to="/games">Games</Link>
                    </NavItem>
                    <Button className="logout" onClick={props.clickLogout}>Logout</Button>
                </Nav>

            </Container>

            <div className="Route">
                <Switch>
                    <Route exact path="/"><Home token={props.token} /></Route>
                    <Route exact path="/profile" token={props.token}><Profile /></Route>
                    <Route exact path="/games"><Twitch /></Route>
                </Switch>
            </div>
        </div>







    )

}

export default Sidebar
