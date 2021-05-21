import './home.scss'

import { Container, Col } from 'reactstrap'
import { useState, useEffect } from 'react'

const Home = (props) => {

    const [reviews, getReviews] = useState([])

    let everyPost = () => {
        fetch("http://localhost:4040/review/all", {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            }),
        }).then(res => res.json())
            .then(data => {
                getReviews(data.review)
                console.log(data)
            })
    }

    useEffect(() => {
        everyPost()
    }, [])




    return (


        
            <Container className="homeContent">
                <Col>
                    <h1>User home page</h1>
                </Col>
            </Container>
      




    )
}

export default Home