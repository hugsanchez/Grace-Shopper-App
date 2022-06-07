import axios from "axios";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import StarRatingComponent from "react-star-rating-component";

const SingleReview = ({ currReview }) => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        const getUser = async () => {
            const { data: user } = await axios.get(
                `/api/users/${currReview.userId}`,
            );
            setUser(user);
        };
        getUser();
    }, []);

    return (
        <React.Fragment>
            <p className="review-detail">{currReview.detail}</p>
            <p className="review-author">Written By: {user.username}</p>
            <div>
                <StarRatingComponent
                    name="rating"
                    value={currReview.rating}
                    editing={false}
                />
            </div>
        </React.Fragment>
    );
};


export default connect(null)(SingleReview);
