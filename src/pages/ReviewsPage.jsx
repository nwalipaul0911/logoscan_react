import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ReviewsPage = () => {
  const url = import.meta.env.VITE_BACKEND_API_URL;
  const [reviews, setReviews] = useState([]);
  const imageId = useParams().imageId;

  useEffect(() => {
    const ReviewsAPIUrls = `${url}/api/reviews/?image_id=${imageId}`;
    axios
      .get(ReviewsAPIUrls)
      .then((response) => {
        setReviews(response.data.reviews);
      })
      .catch((error) => {
        console.error("Error fetching reviews: ", error);
      });
  }, [imageId]);

  return (
    <>
      <button className="btn btn-sm btn-secondary">
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      <div>
        <h1>Reviews for Image{imageId}</h1>
        <ul>
          {reviews.map((review, index) => (
            <li key={index}>
              <p>{review.username}</p>
              <p>{review.feedback}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default ReviewsPage;
