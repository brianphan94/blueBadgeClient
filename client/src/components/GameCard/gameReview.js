import './gamesReview.scss'

import { Button, Col, Container } from 'reactstrap'
import { useHistory } from 'react-router-dom'



const GameCard = (props) => {

    const history = useHistory()

    return (
        <Container fluid='md' className='homeContent'>
            <Col className="gameColumn" md={4}>
            <h2>{props.gameName}</h2>
            <img src={props.gamePic} alt="Game" width="380px" height="300px"></img>
            <Button color="warning" onClick={() => history.push('/games')}>Back to Games</Button>
            </Col>
        </Container>
    )
}

export default GameCard