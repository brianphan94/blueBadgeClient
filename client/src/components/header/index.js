import {Nav, NavItem} from 'reactstrap'
import './header.scss'

import Logo from './Logo.png'


const Header = (props) => {

    return(
        <div className="header">
            <Nav>
            <NavItem>
            <img src={Logo}></img>
            {/* <button  >Logout</button> */}
            </NavItem>
            </Nav>
        
        </div>
        
    )


}

export default Header