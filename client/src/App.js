import React from 'react';
import { useState } from 'react';

function Review() {

  const [values, setValues] = useState({
    username: "",
    reviewtitle: "",
    reviewbody: "", 
}); 

const handleFirstNameInputChange = (event) => {
    setValues({...values, username: event.target.value})
}

const handleReviewTitleInputChange = (event) => {
    setValues({...values, reviewtitle: event.target.value })
}

const handleReviewBodyInputChange = (event) => {
    setValues({...values, reviewbody: event.target.value })
}

const handleSubmitForm = (event) => {
    event.preventDefault();
    fetch('http://localhost:4040/review/post', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': "application/json"
        }),
        body: JSON.stringify({
            review: {
                username: values.username,
                reviewTitle: values.reviewtitle, 
                reviewBody: values.reviewbody
            }
        })
        .then(res => res.json())
        .then(json => {console.log(json)})
        .catch(err => console.log(err))      
    })
}
    return (
        <div>
            <h1>Reviews</h1>
            <form onSubmit={handleSubmitForm} > 
                <p>Username:</p>
                <input
                    onChange={handleFirstNameInputChange}
                    value={values.username} 
                    type="text" 
                    name="username"  
                    id="username"  
                    placeholder="user name"
                />
                {console.log(values.username)}
                
                <p>Review title:</p>
                <input
                    onChange={handleReviewTitleInputChange}
                    value={values.reviewtitle}
                    type="text" 
                    name="reviewtitle"  
                    id="reviewtitle" 
                    placeholder="review title" 
                />
                {console.log(values.reviewtitle)}

                <p>Write your review:</p>
                <input
                    onChange={handleReviewBodyInputChange}
                    values={values.reviewbody}
                    type="text" 
                    name="reviewbody"  
                    id="reviewbody" 
                    placeholder="Write a review" 
                />
                {console.log(values.reviewbody)}

                <button type="submit" name="reviewsubmit" id="reviewsubmit">Post Review</button>
            </form>
        </div>
    );
}
export default Review; 