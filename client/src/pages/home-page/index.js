//import React from 'react';
import './home.scss'
//import {Button} from 'reactstrap'
import { useState, useEffect } from 'react';
import { Card } from 'reactstrap';

import UserLogo from '../../userlogo.svg';

const Home = (props) => {

    const [reviews, getReviews] = useState([])

    const everyPost = () => {
        console.log("TOKEN: ", props.token);
        fetch(`http://localhost:4040/review/all`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
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
        <div>
            <h1>User home page</h1>
            <div className='review-feed-box'>
            <Card>
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <li className='review'>
                            <h2>{review.reviewTitle}</h2>
                            <p className='review-body'>{review.reviewBody}</p>
                            <div className='review-footer'>
                                <img className='userlogo' src={UserLogo} />
                                <p>Review by: {review.username}</p>
                            </div>
                            
                        </li>
                    ))
                ) : (
                    <h1>Loading...</h1>
                )}
            </Card>
        </div>
            {/* <Button onClick={props.clickLogout}>Logout</Button> */}
        </div>
    )
}



export default Home