import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { Container, Card, CardBody, CardTitle, CardSubtitle, Col, CardFooter, CardImg, Input, InputGroupAddon, InputGroup, Button } from 'reactstrap';
const EditReview = (props) => {
    const [qurey, setQurey] = useState('');
    const [results, setResults] = useState({});
    const [userID, setUserID] = useState(props.userTitle); 
    const[myReview, setMyReview] = useState("");

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
        setMyReview(results.reviewBody); 
    }
    return (
        <div>
           <button onClick={fetchRev}>Look up your reviews</button>
           {  
            results.length > 0 ? 
               results.map(result => {
                   return(
                       <div className="reviewOutput" key={result.id}>
                           <h3>Game Title:</h3>
                           <input type="text" value={result.reviewTitle} />
                           <h3>Your Review Title:</h3>
                           <input type="text" value={result.subReviewTitle} />
                           <h3>Your Review: </h3>
                           <input type="text" value={result.reviewBody} /> 
                           <br />
                           <button onClick={fetchRev}>Update your Review</button>
                           <br />
                        </div>
                   )
               }
               ) : ""
           }
        </div>
    )
}
export default EditReview;