import './gamesReview.scss'

import { Button, Col, Container, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form, Card, FormText, CardTitle, CardSubtitle } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import APIURL from '../../helpers/environment'

const GameCard = (props) => {

    const history = useHistory()
    const [username, setUsername] = useState(`${props.userTitle}`)
    const [reviewTitle, setReviewTitle] = useState(`${props.gameName}`)
    const [subReviewTitle, setSubReviewTitle] = useState('')
    const [reviewBody, setReviewBody] = useState('')
    const [modal, setModal] = useState(false)
    let newArr = []

    const toggle = () => setModal(!modal)
    const closeBtn = <Button className="close" color="danger" onClick={toggle}>&times;</Button>

    const reviewGame = async (e) => {
        e.preventDefault()
        const res = await fetch(`${APIURL}/review/post`, {
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
        props.everyPost()
    }

    const deleteReview = (review) => {
        fetch(`${APIURL}/review/delete/${review.game.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
            .then(() => props.everyPost())
    }

    const display = () => {

        if (props.gameReviews) {
            let games = props.gameReviews
            games.forEach(game => {
                if (game.reviewTitle === props.gameName) {
                    newArr.push({ game })
                }
            })
        }

        return (
            <Col md={6} className="reviewColumn">
                <h2 className='reviewsHeader'>Reviews for <i>{props.gameName}</i></h2>
                <hr />
                    {newArr.length > 0 ? (
                        newArr.reverse().map((review) => (
                            <Card className="reviewCard" key={Math.random().toString(36).substr(2, 9)} >
                            <li  className='theReview'>
                                <CardTitle tag="h3">{review?.game?.reviewTitle}</CardTitle>
                                <hr />
                                <CardSubtitle tag="h5" className="text-muted">{review?.game?.subReviewTitle}</CardSubtitle>

                                <p className='reviewBody'>{review?.game?.reviewBody}</p>
                                <hr />
                                <div className='reviewFooter'>
                                    {review?.game?.username === props.userTitle ? <CardSubtitle tag="h6" className="text-danger"> Review by: You</CardSubtitle> : <CardSubtitle tag="h6" className="text-muted">Review by: {review?.game?.username}</CardSubtitle>}

                                    {props.userTitle === review?.game?.username ? <Button color="danger" className='deleteBtn' onClick={() => deleteReview(review)}>Delete</Button> : null}
                                </div>
                            </li>
                </Card>
                        ))
                    ) : (
                        <h3 className="noReviews">Be the first to leave a review!</h3>
                    )}
            </Col>
        )
    }

    return (
        <Container fluid='md' className='gameContent'>
            <Col className="gameColumn" md={5}>
                <h2>{props.gameName}</h2>
                <img src={props.gamePic} alt="Game"></img>
                <Button color="danger" onClick={toggle}>Leave a Review!</Button>
                <Button color="warning" onClick={() => history.push('/games')}>Back to Games!</Button>
            </Col>

            <Modal className="gameReview" isOpen={modal} toggle={toggle}>
                <Form onSubmit={reviewGame}>

                    <ModalHeader tag="h2" className="modalHeader" toggle={toggle} close={closeBtn}>{props.gameName}</ModalHeader>
                    <ModalBody>
                        <FormText>Username</FormText>
                        <Input className='reviewInput' type="select" required >
                            <option value={username} onChange={(e) => { setUsername(e.target.value) }}>{props.userTitle}</option>
                        </Input>
                        <FormText>Game</FormText>
                        <Input className='reviewInput' type="select" required aria-label="Game Title">
                            <option value={reviewTitle} onChange={(e) => { setReviewTitle(e.target.value) }}>{props.gameName}</option>
                        </Input>
                        <FormText>Title</FormText>
                        <Input className='reviewInput' type="text" required aria-label="User Title" value={subReviewTitle} onChange={(e) => setSubReviewTitle(e.target.value)} />
                        <FormText>Leave Your Review!</FormText>
                        <Input className='reviewInput' type="textarea" required aria-label="Review Body" placeholder="Leave your review, friend!" maxLength="2000" value={reviewBody} onChange={(e) => { setReviewBody(e.target.value) }} />
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" color="warning" className="post text-white">Post It!</Button>
                    </ModalFooter>

                </Form>
            </Modal>

            {display()}

        </Container>
    )
}

export default GameCard