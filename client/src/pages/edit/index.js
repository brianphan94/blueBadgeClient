import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { Container, Card, CardBody, CardTitle, CardSubtitle, Col, CardFooter, CardImg, Input, InputGroupAddon, InputGroup, Button } from 'reactstrap';
import './edit.scss'; 

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
    
        // fetch posts input data to database reviews table
        const UpdateReview = (event, id) => {
            event.preventDefault();
            console.log("checking id in update", id, props.userTitle, values.NewReviewTitle, values.NewSubReviewTitle,values.NewReviewBody)
            fetch(`http://localhost:4040/review/update/${id}`, {
                method: 'PUT',
                headers: new Headers({
                    'Content-Type': "application/json",
                    'Authorization': localStorage.token
                }),
                body: JSON.stringify(
                    {
                        username: props.userTitle, // taking value handed down from props value will be username that is currently logged in
                        reviewTitle: values.NewReviewTitle,
                        subReviewTitle: values.NewSubReviewTitle, 
                        reviewBody: values.NewReviewBody
                    }
                )
    
            })
                .then(res => res.json())
                .then(json => console.log(json))
                .catch(err => console.log(err.message))
        }
    
    


    return (
        <div>
           <button onClick={fetchRev}>Look up your reviews</button>
           {  
            results.length > 0 ? 
               results.map(result => {
                   return(
                       <div className="reviewOutput" key={result.id}>
                           <h5>Game Title:</h5>
                           <input
                                onChange={handleReviewTitleInputChange}
                                type="text" 
                                defaultValue={result.reviewTitle}
                                name="reviewtitle"
                                id="reviewtitle" 
                           />
                            
                            <h5>Your Review Title:</h5>
                           <input 
                                onChange={handleSubReviewTitleInputChange}
                                type="text" 
                                defaultValue={result.subReviewTitle}
                                name="subreviewtitle"
                                id="subreviewtitle" 
                           />
                           
                           <h5>Your Review:</h5>
                           <input 
                                onChange={handleReviewBodyInputChange}
                                type="text" 
                                defaultValue={result.reviewBody}
                                name="reviewbody"
                                id="reviewbody" 
                           /> 
                           
                           <br />
                           <button onClick={(event) => UpdateReview(event, result.id)} >Update your Review</button>
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