
import './home.scss'

import { useState, useEffect } from 'react';
import { Card, Container } from 'reactstrap';

import UserLogo from '../../userlogo.svg';

const Home = ({token}) => {

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
                getReviews(data.review)
                console.log(data)
            }).catch(err => {
                console.log("hit: ", err)
            })
    }


    useEffect(() => {
        everyPost()
    }, [])


    return (
        <Container>
            <div className='review-feed-box'>
            <h1>Welcome</h1>
            <Card>
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <li key={review.id} className='review'>
                            <h2>{review.reviewTitle}</h2>
                            <p className='review-body'>{review.reviewBody}</p>
                        <div className='review-footer'>
                            <img className='userlogo' src={UserLogo} alt="user logo" />
                            <p>Review by: <span className='home-username'>{review.username}</span></p>
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