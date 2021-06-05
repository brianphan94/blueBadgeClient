import './profile.scss';
import { useState } from 'react';
import { CardSubtitle, Container, Input } from "reactstrap";

import UserLogo from '../../userlogo.svg';

const Profile = (props, gamePicArray) => {

    const [search, setSearch] = useState('')

    let user = []
    const searchUsers = () => {

        if (props.gameReviews) {
            let reviews = props.gameReviews
            reviews.forEach(gameReview => {
                if (gameReview.username === search) {
                    user.push({ gameReview })

                }
            })
        }

        return (
            <div className="user-container">
                <div className="user-info">
                    <h1>{search}</h1>
                    <img className='user-picture' src={UserLogo} alt="user logo" />
                </div>
                <div className="review-info">
                    {user.length > 0 ? (
                        user.reverse().map((review) => (
                            <li key={Math.random().toString(36).substr(2, 9)} className='review'>
                                <img className='gamepic' src={gamePicArray} alt="Game Pic" />
                                <p className="game-name" tag="h3">{review?.gameReview.reviewTitle}</p>
                                <hr />
                                <div className='user-review'>
                                    <p className='reviewTitle' tag="h5" >{review?.gameReview?.subReviewTitle}</p>

                                    <p className='review-body'>{review?.gameReview?.reviewBody}</p>
                                </div>

                                {/*  */}
                                <hr />
                                <div className='review-footer'>


                                    <CardSubtitle tag="h6" className="text-muted">Review by: {review?.gameReview?.username}</CardSubtitle>
                                    <CardSubtitle tag="h6" className="text-muted">{review?.gameReview?.createdAt}</CardSubtitle>
                                </div>

                            </li>
                        ))
                    ) : (
                        <h3 className="noReviews">No Reviews by this user!</h3>
                    )}
                </div>
            </div>
        )
    }

    return (

        <Container fluid className="gameContent"><h1>Profile Page</h1>
            <hr />
            <Input placeholder='Search for a user' value={search} onChange={(e) => setSearch(e.target.value)} />

            {searchUsers()}

        </Container>

    )
}

export default Profile
