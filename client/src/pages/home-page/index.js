
import './home.scss'

import { useState, useEffect } from 'react';
import { Card, Container } from 'reactstrap';

import UserLogo from '../../userlogo.svg';

const Home = ({ token, userTitle, setGameReviews }) => {

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
        <Container className="homeContent">
            <div className='review-feed-box'>

                {userTitle ? <h1>Welcome {userTitle}</h1> : null}
                <Card>
                    {reviews?.length > 0 ? (
                        reviews?.reverse().map((review) => (
                            <li key={review?.id} className='review'>
                                <h2>{review?.reviewTitle}</h2>
                                <h4>{review?.subReviewTitle}</h4>
                                <p className='review-body'>{review?.reviewBody}</p>
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