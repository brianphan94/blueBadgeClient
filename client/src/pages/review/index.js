import React from 'react';
import { useEffect, useState } from 'react';
import { values } from 'sequelize/types/lib/operators';

// const [username, setUsername] = useState(''); 
// const  [reviewtitle, setReviewtitle] = useState('');
// const [reviewbody, setReviewbody] = useState(''); 

const [values, setValues] = useState({
    username: "",
    lastname: "",
    email: "", 
}); 

const handleFirstNameInputChange = (event) => {
    setValues({...values, username: event.target.value})
}

const handleReviewTitleInputChange = (event) => {
    setValues({...values, reviewtitle: event.target.value })
}

const handleReviewBodyInputChange = (event) => {
    setValues({...values, reviewtitle: event.target.value })
}

const handleSubmitForm = (event) => {
    event.preventDefualt();
    fetch('http://localhost:4040/review/post', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': "application/jason"
        }),
        body: JSON.stringify({
            review: {
                username: username,
                reviewTitle: reviewtitle, 
                reviewBody: reviewbody
            }
        })
        .then(res => res.json())
        .then(json => {json.reviewbody})
    })

}

function Review() {
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
                
                <p>Review title:</p>
                <input
                    onChange={handleReviewTitleInputChange}
                    value={values.reviewtitle}
                    type="text" 
                    name="reviewtitle"  
                    id="reviewtitle" 
                    placeholder="review title" 
                />

                <p>Write your review:</p>
                <input
                    onChange={handleReviewBodyInputChange}
                    values={values.reviewbody}
                    type="text" 
                    name="reviewbody"  
                    id="reviewbody" 
                    placeholder="Write a review" 
                />

                <button name="reviewsubmit" id="reviewsubmit">Post Review</button>
            </form>
        </div>
    );
}
export default Review; 