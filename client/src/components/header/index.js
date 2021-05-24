import { Nav } from 'reactstrap'
import './header.scss'

import Logo from './Logo.png'


const Header = () => {

    return (
        <div className="header">
            <Nav>
                <img src={Logo} alt="Logo"></img>
            </Nav>
        
        </div>
    )
}

export default Header