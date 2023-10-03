import React, {useEffect, useState} from "react";
import axios from "axios";

const ReviewsPage = ({match}) => {

    const [reviews, setReviews] = useState([])
    const productId = match.params.productId;

    useEffect(() => {
        axios.get(`/api/reviews/${productId}`)
            .then((response) => {
                setReviews(response.data);
            })
            .catch((error) => {
                console.error('Error fetching reviews: ', error)
            })
    }, [productId])

    return (
        <div>
            <h1>Reviews for Product {productId}</h1>
            <ul>
                {
                    reviews.map((review) => (
                        <li key={review.id}>
                            <p>{review.text}</p>
                            <p>Rating: {review.rating}</p>

                            //MORE INFO ON THE REVIEWS PAGE
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
export default ReviewsPage