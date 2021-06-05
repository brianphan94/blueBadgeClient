
import './home.scss'

import { useState, useEffect } from 'react';
import { Card, Container } from 'reactstrap';

import UserLogo from '../../userlogo.svg';
import Logo from './controller.svg';


const Home = ({ token, userTitle, setGameReviews, gamePicArray }) => {

    const [reviews, getReviews] = useState([])

    useEffect(() => {
        if (localStorage.getItem("reviews")) {
            let retrieved = localStorage.getItem('reviews')
            getReviews(JSON.parse(retrieved))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('reviews', JSON.stringify(reviews))
    }, [reviews])

    const everyPost = () => {
        fetch(`http://localhost:4040/review/all`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': token
            })
        }).then((res) => res.json())
            .then((data) => {
                getReviews(data.review)

                setGameReviews(data.review)

            }).catch(err => {
                console.log("hit: ", err)
            })
    }


    const deleteReview = (review) => {
        fetch(`http://localhost:4040/review/delete/${review.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': token
            })
        })
            .then(() => everyPost())
    }

    useEffect(() => {
        everyPost()


    }, [])

    return (
        <Container fluid className="homeContent">
            <div className='review-feed-box'>

<<<<<<< HEAD
                {userTitle ? <h1>Welcome, {userTitle}</h1> : null}
=======
                {reviews?.length > 0 ? (
                    reviews?.map((review) => (
                        <Card className="card" key={Math.random().toString(36).substr(2, 9)}>
                            <li className='review'>
                                <h2>{review?.reviewTitle}</h2>
                                <h4>{review?.subReviewTitle}</h4>
                                <p className='review-body'>{review?.reviewBody}</p>
                {userTitle ? <h1>Welcome {userTitle}</h1> : null}
>>>>>>> 85f702f9dd527a1bdbd8d71ed115a85f7fbe9e80
                <hr />
                <Card>
                    {reviews?.length > 0 ? (
                        reviews?.reverse().map((review) => (
                            <li key={review?.id} className='review'>
                                <div className='review-header'>
                                    <img className='logo' src={Logo} alt="logo"/>
                                    <img className='game-pic' src={gamePicArray} alt="Game Pic"/>
                                    <h2 className='game-name'>{review?.reviewTitle}</h2>
                                </div>
                                <hr />
                                <div className='user-review'>
                                    <h4 className='reviewTitle'>{review?.subReviewTitle}</h4>
                                    <p className='review-body'>{review?.reviewBody}</p>
                                </div>
                                <hr />
                                <div className='review-footer'>
                                    <img className='userlogo' src={UserLogo} alt="user logo" />
                                    <p>Review by: {review?.username}</p>
                                </div>
                            </li>
                        </Card>
                    ))
                ) : (
                    <h1>Loading...</h1>
                )}
            </div>
        </Container>
    )
}

export default Home