import { Nav, NavItem, Button, Container, NavbarToggler, Collapse, Col, Row } from 'reactstrap'
import { useState } from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import Profile from '../../pages/Profile/index'
import Home from '../../pages/home-page/index'
import Twitch from '../../pages/Games/twitch'
import GameCard from '../GameCard/gameReview'

import './sidebar.scss'




const Sidebar = (props) => {

    const [gameName, setGameName] = useState('')
    const [gamePic, setGamePic] = useState()
    const [collapsed, setCollapsed] = useState(true)

    const toggleNavbar = () => setCollapsed(!collapsed)

    return (
        <div className="header">
            <Container fluid='lg' className="sideBarDiv">
                
                <NavbarToggler onClick={toggleNavbar} className="mr-12 toggler">Btn.Mash</NavbarToggler>
                    <Col md={12}>
                <Collapse isOpen={!collapsed}>
                        <Nav>
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
                </Collapse>
                    </Col>

            </Container>

            <div className="Route">
                <Switch>
                    <Route exact path="/"><Home userTitle={props.userTitle} token={props.token} /></Route>
                    <Route exact path="/profile" token={props.token}><Profile /></Route>
                    <Route exact path="/games"><Twitch setGameName={setGameName} setGamePic={setGamePic} token={props.token} /></Route>
                    <Route exact path="/games/:id"><GameCard gameName={gameName} gamePic={gamePic} token={props.token} userTitle={props.userTitle}/></Route>
                </Switch>
            </div>
        </div>
    )

}

export default Sidebar
