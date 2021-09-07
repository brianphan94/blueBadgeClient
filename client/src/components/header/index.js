import { Nav } from 'reactstrap'
import './header.scss'

import Logo from './Logo.png'


const Header = () => {

    return (
        <div className="header">
            {localStorage.getItem('token') ? null : <Nav>
                <img src={Logo} alt="Logo"></img>
            </Nav> }
        
        </div>
    )
}

export default Header