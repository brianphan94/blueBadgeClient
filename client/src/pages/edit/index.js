import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'


import { Container, Card, CardBody, CardTitle, CardSubtitle, Col, CardFooter, CardImg, Input, InputGroupAddon, InputGroup, Button } from 'reactstrap';



const EditReview = (props) => {
    const [qurey, setQurey] = useState('');
    const [results, setResults] = useState({});
    const [userID, setUserID] = useState(props.userTitle); 
    console.log("User ID logged in:", userID);

    const fetchRev = () => {
        fetch(`http://localhost:4040/review/edit/${userID}`,
        {
            method: 'GET',
            headers: new Headers(
                {
                    'Content-Type': "application/json",
                    'Authorization': localStorage.token
                }
            )// close headers         
        } // close method and headers for fetch 
        )// close fetch
        .then(res => res.json())
        .then(json => {
            console.log(json.review)
            setResults(json.review)
            console.log("testing setState of results var",results);
        })// close .then
    }
    
    return (
        <div>
           <button onClick={fetchRev}>Look up your reviews</button>
           {
               results.map(result => {
                   return(
                       <div key={result.id}>
                           <h3>{result.reviewTitle}</h3>
                           <h3>{result.subReviewTitle}</h3>
                           <h3>{result.reviewBody}</h3>
                        </div>
                   )
               }

               )
           }
        </div>
    )

}

export default EditReview;