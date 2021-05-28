import './gamesReview.scss'

import { Button, Col, Container, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form, Card, FormText } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'



const GameCard = (props) => {

    const history = useHistory()
    const [username, setUsername] = useState(`${props.userTitle}`)
    const [reviewTitle, setReviewTitle] = useState(`${props.gameName}`)
    const [subReviewTitle, setSubReviewTitle] = useState('')
    const [reviewBody, setReviewBody] = useState('')
    const [modal, setModal] = useState(false)
     const [newArr, setNewArr] = useState([])


    const toggle = () => setModal(!modal)
    const closeBtn = <Button className="close" color="warning" onClick={toggle}>&times;</Button>
    

    const reviewGame = async (e) => {
        e.preventDefault()
        const res = await fetch('http://localhost:4040/review/post', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            }),
            body: JSON.stringify({
                username: username,
                reviewTitle: reviewTitle,
                subReviewTitle: subReviewTitle,
                reviewBody: reviewBody
            })
        })
        const json = await res.json()
        console.log(json)
        setReviewBody('')
        setSubReviewTitle('')
    }

    

    const display = () => {

        if(props.gameReviews){
        let games = props.gameReviews
        games.forEach(game => {
            if (game.reviewTitle === props.gameName) {
                newArr.push({ game })
            }
        })}
       
        return (
            <div>
                <Card>
                {newArr.length > 0 ? (
                    newArr.map((review) => (
                        <li key={review.game.id} className='review'>
                            <h2>{review.game.reviewTitle}</h2>
                            <h4>{review.game.subReviewTitle}</h4>
                            <p className='review-body'>{review.game.reviewBody}</p>
                            <div className='review-footer'>

                                <p>Review by: {review.game.username}</p>
                            </div>
                            
                        </li>
                    ))
                ) : (
                    null
                )}
            </Card>
            </div>
        )   
    }
   

        



    return (
        <Container fluid='md' className='homeContent'>
            <Col className="gameColumn" md={4}>
                <h2>{props.gameName}</h2>
                <img src={props.gamePic} alt="Game" width="380px" height="300px"></img>
                <Button color="danger" onClick={toggle}>Leave a Review!</Button>
                <Button color="warning" onClick={() => history.push('/games')}>Back to Games!</Button>
            </Col>

            <Modal className="gameReview" isOpen={modal} toggle={toggle}>
                <Form onSubmit={reviewGame}>

                    <ModalHeader toggle={toggle} close={closeBtn}>{props.gameName}</ModalHeader>
                    <ModalBody>
                        <FormText>Username</FormText>
                        <Input type="select" required >
                            <option value={username} onChange={(e) => { setUsername(e.target.value) }}>{props.userTitle}</option>
                        </Input>
                        <FormText>Game</FormText>
                        <Input type="select" required aria-label="Game Title">
                            <option value={reviewTitle} onChange={(e) => {setReviewTitle(e.target.value)}}>{props.gameName}</option>
                        </Input>
                        <FormText>Title</FormText>
                        <Input type="text" required aria-label="User Title" value={subReviewTitle} onChange={(e) => setSubReviewTitle(e.target.value)} />
                        <FormText>Leave Your Review!</FormText>
                        <Input type="textarea" required aria-label="Review Body" placeholder="Leave your review, friend!" maxLength="2000" value={reviewBody} onChange={(e) => { setReviewBody(e.target.value) }} />
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" color="warning">Post It!</Button>
                    </ModalFooter>

                </Form>
            </Modal>

            {display()}

        </Container>
    )
}


export default GameCard