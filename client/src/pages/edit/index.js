import React from 'react';
import { useState } from 'react';



function EditReview(props) {

    const [values, setValues] = useState({
        username: "",
        reviewTitle: "", // name of the game game
        subReviewTitle: "", // user's review title title 
        reviewBody: "",
    });


    // fetch posts input data to database reviews table
    const handleSubmitForm = (event) => {
        event.preventDefault();
        fetch('http://localhost:4040/review/edit/props.userTitle', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': "application/json",
                'Authorization': localStorage.token
            })

        })
            .then(res => res.json())
            .then(json => console.log(json))
            .catch(err => console.log(err.message))
    }

    return (
        <div>
            <h1>Edit Your Reviews</h1>
            <form onSubmit={handleSubmitForm} >

                <button name="getreviews" id="getreviews">Get your reviews</button>
                <button name="reviewclear" id="reviewclear">Clear</button>
            </form>
        </div>
    );
}
export default EditReview;