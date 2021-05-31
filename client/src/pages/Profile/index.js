import './profile.scss';
import { useState, useEffect } from 'react';
import { Card, Container, Input, Button } from "reactstrap";

import UserLogo from '../../userlogo.svg';

const Profile = (props) => {

    const [search, setSearch] = useState()
    const [user, getUser] = useState([])

        const searchUsers = () => {

            let auth = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIxOTc5OTcxLCJleHAiOjE2MjIwNjYzNzF9.HKW1lorM4QIpCDXi0BZhLL_HB4hG3NtANFk34t0xYlU'

            fetch(`http://localhost:4040/review/search?query=${search}`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': auth
             }) 
            }).then((res) => res.json())
            .then((data) => getUser(data.userList))
        }

    return(

        <Container fluid className="gameContent"><h1>Profile Page</h1>
        <Input placeholder ='Search for a user' value={search} onChange={(e) => setSearch(e.target.value)}/>
        <Button type='text' color="warning" onClick={searchUsers}>Search</Button>
            {Object.keys(user).map(key => {
                {console.log(user[key])}
                <div className='user-container'>
                    <div className='user-info'>
                        
                        <img className='user-picture' src={UserLogo} alt="user logo" />
                    </div>
                    {/* {user[key].map(review => {
                       <Card>
                        <div className='review-info'>
                            <p className='review-title'>{review.reviewTitle}</p>
                            <p className='review-body'>{review.reviewBody}</p>
                            <p>{review.createdAt}</p>
                        </div>
                    </Card> 
                    })} */}
                    
                </div>
            })}
        </Container>

    )
}

export default Profile