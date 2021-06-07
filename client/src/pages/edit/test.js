function UpdateReview( ) {

    const [values, setValues] = useState({
        // username: "",
        NewReviewTitle: "", // name of the game game
        NewSubReviewTitle: "", // user's review title title 
        NewReviewBody: "",
    });

    // const handleReviewTitleInputChange = (event) => {
    //     setValues({ ...values, reviewtitle: event.target.value })
    // }

    // const handleSubReviewTitleInputChange = (event) => {
    //     setValues({ ...values, subreviewtitle: event.target.value })
    // }

    // const handleReviewBodyInputChange = (event) => {
    //     setValues({ ...values, reviewbody: event.target.value })
    // }

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

}
