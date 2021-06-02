
import './home.scss'

import { useState, useEffect } from 'react';
import { Card, Container } from 'reactstrap';

import UserLogo from '../../userlogo.svg';

const Home = ({ token, userTitle, setGameReviews, gamePic }) => {

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
               
                
                console.log(data.review)
            }).catch(err => {
                console.log("hit: ", err)
            })
    }

    useEffect(() => {
        everyPost()

    }, [])



    return (
        <Container fluid className="homeContent">
            <div className='review-feed-box'>

                {userTitle ? <h1>Welcome {userTitle}</h1> : null}
                <Card>
                    {reviews?.length > 0 ? (
                        reviews?.reverse().map((review) => (
                            <li key={review?.id} className='review'>
                                <div className='review-header'>
                                    <img className='game-pic' src={gamePic} alt="Game Pic"/>
                                    <h2 className='game-name'>{review?.reviewTitle}</h2>
                                </div>
                                <div className='user-review'>
                                    <h4 className='reviewTitle'>{review?.subReviewTitle}</h4>
                                    <p className='review-body'>{review?.reviewBody}</p>
                                </div>
                                <div className='review-footer'>
                                    <img className='userlogo' src={UserLogo} alt="user logo" />
                                    <p>Review by: {review?.username}</p>
                                </div>

                            </li>
                        ))
                    ) : (
                        <h1>Loading...</h1>
                    )}
                </Card>
            </div>

            {/* <Button onClick={props.clickLogout}>Logout</Button> */}
        </Container>
    )
}



export default Home