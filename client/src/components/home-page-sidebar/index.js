import { Nav, NavItem, Navbar, Collapse, Button, NavbarToggler, Container } from 'reactstrap'
import { useState } from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import Profile from '../../pages/Profile/index'
import Home from '../../pages/home-page/index'

import './sidebar.scss'




const Sidebar = (props) => {

    //document.body.style = 'background: white'
    const [collapsed, setCollapsed] = useState(true)
    const toggleNavbar = () => setCollapsed(!collapsed)



    return (
        <div>
            <Container fluid="md" className="sideBarDiv">
                <Navbar className="side-bar" light>
                    <NavbarToggler outline color="warning" onClick={toggleNavbar}></NavbarToggler>
                    <Collapse isOpen={!collapsed} navbar>
                        <Nav horizontal>
                            <NavItem>
                                <Link to="/">Home</Link>
                            </NavItem>

                            <NavItem>
                                <Link to="/profile">Profile</Link>
                            </NavItem>
                            <Button className="logout" onClick={props.clickLogout}>Logout</Button>
                        </Nav>
                    </Collapse>
                </Navbar>
            </Container>

            <div className="Route">
                <Switch>
                    <Route exact path="/"><Home token={props.token} /></Route>
                    <Route exact path="/profile" token={props.token}><Profile /></Route>
                </Switch>
            </div>
        </div>







    )

}

export default Sidebar
