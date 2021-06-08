import React from 'react';
import { useState } from 'react';
import './review.scss'



function Review(props) {

    const [values, setValues] = useState({
        // username: "",
        reviewTitle: "", // name of the game game
        subReviewTitle: "", // user's review title title 
        reviewBody: "",
    });

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

    // clears review filds when "clear" is clicked
    const clearForm = (event) => {
        event.preventDefault();

        document.getElementById("reviewbody").value = "";
        setValues({
            ...values,
            // username: "",
            reviewtitle: "",
            subreviewtitle: "",
            reviewbody: "",
        })
    }

    return (
        <div className="reviewOutput">
            <h1>Post a Review</h1>
            <form onSubmit={handleSubmitForm} >

                <h5>Game title:</h5>
                <input
                    onChange={handleReviewTitleInputChange}
                    value={values.reviewtitle}
                    type="text"
                    name="reviewtitle"
                    id="reviewtitle"
                    placeholder="Name of game?"
                />

                <h5>Review title:</h5>
                <input
                    onChange={handleSubReviewTitleInputChange}
                    value={values.subreviewtitle}
                    type="text"
                    name="subreviewtitle"
                    id="subreviewtitle"
                    placeholder="Give your review a title"
                />  

                <h5>Write your review:</h5>
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