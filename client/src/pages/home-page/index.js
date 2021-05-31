
import './home.scss'

import { useState, useEffect } from 'react';
import { Card, Container } from 'reactstrap';

import UserLogo from '../../userlogo.svg';



const Home = ({ token, userTitle, setGameReviews }) => {

    const [reviews, getReviews] = useState([])



    const everyPost = () => {
        fetch(`http://localhost:4040/review/all`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': token
            })
        }).then((res) => res.json())
            .then((data) => {
                setGameReviews(data.review)
                getReviews(data.review)
            }).catch(err => {
                console.log("hit: ", err)
            })
    }


    useEffect(() => {
        everyPost()
    }, [])



    return (
        <Container className="homeContent">
                {userTitle ? <h1>Welcome {userTitle}</h1> : null}
            <div className='review-feed-box'>

                {reviews?.length > 0 ? (
                    reviews?.map((review) => (
                      
                            <Card className="card" key={Math.random().toString(36).substr(2, 9)}>
                                <li className='review'>
                                    <h2>{review?.reviewTitle}</h2>
                                    <h4>{review?.subReviewTitle}</h4>
                                    <p className='review-body'>{review?.reviewBody}</p>
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