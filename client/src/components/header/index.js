import {Nav, NavItem} from 'reactstrap'
import './header.scss'

import Logo from './Logo.png'


const Header = (props) => {

    return(
        <div className="header">
            <Nav>
            <img src={Logo}></img>
            </Nav>
        
        </div>
        
    )


}

export default Header