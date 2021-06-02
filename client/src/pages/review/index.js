import React from 'react';
import { useState } from 'react';



function Review(props) {

    const [values, setValues] = useState({
        username: "",
        reviewTitle: "", // name of the game game
        subReviewTitle: "", // user's review title title 
        reviewBody: "",
    });

    // event handlers 
    const handleFirstNameInputChange = (event) => {
        setValues({ ...values, username: event.target.value })
    }

    const handleReviewTitleInputChange = (event) => {
        setValues({ ...values, reviewtitle: event.target.value })
    }

    const handleSubReviewTitleInputChange = (event) => {
        setValues({ ...values, subreviewtitle: event.target.value })
    }

    const handleReviewBodyInputChange = (event) => {
        setValues({ ...values, reviewbody: event.target.value })
    }

    // fetch posts input data to database reviews table
    const handleSubmitForm = (event) => {
        event.preventDefault();
        fetch('http://localhost:4040/review/post', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': "application/json",
                'Authorization': localStorage.token
            }),
            body: JSON.stringify(
                {
                    username: values.username,
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

    // clears review filds when "clear" is clicked
    const clearForm = (event) => {
        event.preventDefault();

        document.getElementById("reviewbody").value = "";
        setValues({
            ...values,
            username: "",
            reviewtitle: "",
            subreviewtitle: "",
            reviewbody: "",
        })
    }

    return (
        <div>
            <h1>Post a Review</h1>
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

                <p>Game title:</p>
                <input
                    onChange={handleReviewTitleInputChange}
                    value={values.reviewtitle}
                    type="text"
                    name="reviewtitle"
                    id="reviewtitle"
                    placeholder="name of game?"
                />

                <p>Review title:</p>
                <input
                    onChange={handleSubReviewTitleInputChange}
                    value={values.subreviewtitle}
                    type="text"
                    name="subreviewtitle"
                    id="subreviewtitle"
                    placeholder="Give your review a title"
                />  

                <p>Write your review:</p>
                <textarea
                    onChange={handleReviewBodyInputChange}
                    values={values.reviewbody}
                    type="textarea"
                    name="reviewbody"
                    id="reviewbody"
                    placeholder="Write a review"
                >

                </textarea>
                <br />

                <button name="reviewsubmit" id="reviewsubmit">Post Review</button>
                <button name="reviewclear" id="reviewclear" onClick={clearForm}>Clear</button>
            </form>
        </div>
    );
}
export default Review;