import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { Container, Card, CardBody, CardTitle, CardSubtitle, Col, CardFooter, CardImg, Input, InputGroupAddon, InputGroup, Button } from 'reactstrap';
const EditReview = (props) => {
    const [qurey, setQurey] = useState('');
    const [results, setResults] = useState({});
    const [userID, setUserID] = useState(props.userTitle); 
    const[myReview, setMyReview] = useState("");

    const [values, setValues] = useState({
        // username: "",
        NewReviewTitle: "", // name of the game game
        NewSubReviewTitle: "", // user's review title title 
        NewReviewBody: "",
    });

    const handleReviewTitleInputChange = (event) => {
        setValues({ ...values, NewReviewTitle: event.target.value })
    }

    const handleSubReviewTitleInputChange = (event) => {
        setValues({ ...values, NewSubReviewTitle: event.target.value })
    }

    const handleReviewBodyInputChange = (event) => {
        setValues({ ...values, NewReviewBody: event.target.value })
    }

    console.log("User ID logged in:", userID);
    const fetchRev = () => {
        fetch(`http://localhost:4040/review/edit/${userID}`, // fetch all reivews for logged in user
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

    // update review 

    function UpdateReview( ) {
    
        // fetch posts input data to database reviews table
        const handleSubmitForm = (event) => {
            event.preventDefault();
            fetch('http://localhost:4040/review/post', {
                method: 'PUT',
                headers: new Headers({
                    'Content-Type': "application/json",
                    'Authorization': localStorage.token
                }),
                body: JSON.stringify(
                    {
                        id: results.id,
                        username: props.userTitle, // taking value handed down from props value will be username that is currently logged in
                        reviewTitle: values.reviewtitle,
                        subReviewTitle: values.subreviewtitle, 
                        reviewBody: values.reviewbody
                    }
                )
    
            })
                .then(res => res.json())
                .then(json => console.log(json))
                .catch(err => console.log(err.message))
        }
    
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
                           <input
                                onChange={handleReviewTitleInputChange}
                                type="text" 
                                value={result.reviewTitle}
                                name="reviewtitle"
                                id="reviewtitle" 
                           />
                            
                            <h3>Your Review Title:</h3>
                           <input 
                                onChange={handleSubReviewTitleInputChange}
                                type="text" 
                                value={result.subReviewTitle}
                                name="subreviewtitle"
                                id="subreviewtitle" 
                           />
                           
                           <h3>Your Review:</h3>
                           <input 
                                onChange={handleReviewBodyInputChange}
                                type="text" 
                                value={result.reviewBody}
                                name="reviewbody"
                                id="reviewbody" 
                           /> 
                           
                           <br />
                           <button onClick={UpdateReview}>Update your Review</button>
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