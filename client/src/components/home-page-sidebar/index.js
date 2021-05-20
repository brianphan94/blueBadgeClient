import { Container, Nav, NavItem, Navbar, Collapse, NavbarToggler, NavbarBrand } from 'reactstrap'
import { useState } from 'react'

import './sidebar.scss'




const Sidebar = (props) => {

    //document.body.style = 'background: white'
    const [collapsed, setCollapsed] = useState(true)
    const toggleNavbar = () => setCollapsed(!collapsed)

    return (
        <Container>
            <div className="sideBarDiv">
                <NavbarBrand> App Title
            </NavbarBrand>
                <Navbar className="side-bar" light>
                    <NavbarToggler onClick={toggleNavbar} />
                    <Collapse isOpen={!collapsed} navbar>
                        <Nav vertical>
                            <NavItem>
                                Profile
                            </NavItem>
                            <hr />
                            <NavItem> Item 2</NavItem>
                            <hr />
                            <NavItem> Item 3</NavItem>
                            <hr />
                            <NavItem> Item 4</NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                
            </div>
        </Container>





    )

}

export default Sidebar
