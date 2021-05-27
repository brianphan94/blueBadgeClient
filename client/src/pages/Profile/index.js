import './profile.scss';
import { useState, useEffect } from 'react';
import { Card, Container, Input, Button } from "reactstrap";

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
            .then((data) => getUser(data.reviews))
        }

    return(
        <Container className="homeContent"><h1>Profile Page</h1>
        <Input placeholder ='Search for a user' value={search} onChange={(e) => setSearch(e.target.value)} />
        <Button type='text' color="warning" onClick={searchUsers}>Search</Button>
        <Card>
            {user.map((user) => (
                <h2>{user.username}</h2>
            ))}
        </Card>
        {/* <Card>
            {reviews.length > 0 ? (
                reviews.map((review) => (
                    <div key={review.id} className='reviews'>
                        <div>
                            <h2 className='username'>{review.username}</h2>
                        </div>
                        <div>
                            <h3 className='review-title'>{review.reviewTitle}</h3>
                            <h4 className='review-body'>{review.reviewBody}</h4>
                        </div>
                    </div>
                ))
            ) : null}
        </Card> */}
        </Container>
    )
}

export default Profile