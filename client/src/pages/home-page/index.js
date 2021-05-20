import './home.scss'
import Sidebar from '../../components/home-page-sidebar'
import { Button, Container, Col } from 'reactstrap'

const Home = (props) => {




    return (


        <Container fluid className="content">
            <Container fluid className="homeContent">
                <Sidebar />
                <Col xs={7} md={10}>
                    <h1>User home page</h1>
                    <Button onClick={props.clickLogout}>Logout</Button>
                </Col>
            </Container>
        </Container>




    )
}

export default Home