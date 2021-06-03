import './profile.scss';
import { useState, useEffect } from 'react';
import { Card, CardTitle, CardSubtitle, Container, Input, Button } from "reactstrap";

import UserLogo from '../../userlogo.svg';

const Profile = (props) => {

    const [search, setSearch] = useState('')
    //const [user, getUser] = useState([])
    let user = []
    
    const searchUsers = () => {
        //!this is the same method that I used to get the game reviews matching the game title to show up. If you go into the sidebar you can see that I passed the game reviews in as a prop. 
            
            if(props.gameReviews){
                let reviews = props.gameReviews
                reviews.forEach(gameReview => {
                    if (gameReview.username === search){
                        user.push({gameReview})
                        //console.log(user)
                    }
                })
            }

            return(
                <div className="user-container">
                    <div className="user-info">
                     <img className='user-picture' src={UserLogo} alt="user logo" />
                     </div>
                <Card >
                <div className="review-info">
                    {user.length > 0 ? (
                        user.map((review) => (
                            <li key={Math.random().toString(36).substr(2, 9)} className='review'>
                                <p className="review-title" tag="h3">{review?.gameReview.reviewTitle}</p>
                                <hr />
                                <p className='review-title' tag="h5" className="text-muted">{review?.gameReview?.subReviewTitle}</p>

                                <p className='review-body'>{review?.gameReview?.reviewBody}</p>

                                <p>{review?.gameReview?.createdAt}</p>
                                <hr />
                                <div className='review-footer'>


                                    <CardSubtitle tag="h6" className="text-muted">Review by: {review?.gameReview?.username}</CardSubtitle>
                                </div>

                            </li>
                        ))
                        ) : (
                            <h3 className="noReviews">No Reviews by this user!</h3>
                            )}
                            </div>
                </Card>
                </div>
            )

           // let auth = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIxOTc5OTcxLCJleHAiOjE2MjIwNjYzNzF9.HKW1lorM4QIpCDXi0BZhLL_HB4hG3NtANFk34t0xYlU'

            // fetch(`http://localhost:4040/review/search?query=${props.userTitle}`, {
            //     method: 'GET',
            //     headers: new Headers({
            //         'Content-Type': 'application/json',
            //         'Authorization': props.token
            //  }) 
            // }).then((res) => res.json())
            // .then((data) => getUser(data.userList))
        }

   

    return(

        <Container fluid className="gameContent"><h1>Profile Page</h1>
        <Input placeholder ='Search for a user' value={search} onChange={(e) => setSearch(e.target.value)}/>
        {/* <Button type='text' color="warning" onClick={searchUsers}>Search</Button> */}
        {searchUsers()}
            {/* {Object.keys(user).map(key => {
                {console.log(user[key])}
                <div className='user-container'>
                    <div className='user-info'>
                        
                        <img className='user-picture' src={UserLogo} alt="user logo" />
                    </div> */}
                    {/* {user[key].map(review => {
                       <Card>
                        <div className='review-info'>
                            <p className='review-title'>{review.reviewTitle}</p>
                            <p className='review-body'>{review.reviewBody}</p>
                            <p>{review.createdAt}</p>
                        </div>
                    </Card> 
                    })} */}
                    
               {/* </div> */}
          {/* })} */}
        </Container>

     )
}

export default Profile
