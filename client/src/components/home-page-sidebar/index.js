import { Nav, NavItem, Button, Container } from 'reactstrap'
import {useState} from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import Profile from '../../pages/Profile/index'
import Home from '../../pages/home-page/index'
import Twitch from '../../pages/Games/twitch'
import GameCard from '../GameCard/gameReview'

import './sidebar.scss'




const Sidebar = (props) => {

    const [gameName, setGameName] = useState('')
    const [gamePic, setGamePic] = useState()

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
                    <Route exact path="/games"><Twitch setGameName={setGameName} setGamePic={setGamePic}/></Route>
                    <Route exact path="/games/:id"><GameCard gameName={gameName} gamePic={gamePic}/></Route>
                </Switch>
            </div>
        </div>
    )

}

export default Sidebar
