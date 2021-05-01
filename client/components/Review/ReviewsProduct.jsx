import axios from 'axios';
import React from 'react';
import {connect} from 'react-redux';
import SingleReview from './SingleReview.jsx'

const ReviewsPerProduct = ({specificReviews}) => {
 
    return(
        <div>
            <ul>
                {specificReviews.length ? specificReviews.map((currReview, revIdx) => {
                    return (
                        <div key={revIdx}>
                            <SingleReview currReview={currReview}/>
                        </div>
                    )
                }) : 'Currently No Reviews'}
            </ul>
          
        </div>
    )
}

const mapStateToProps = (state,otherProps) => {
    return{
        state,
        otherProps,
        specificReviews: state.reviews.filter(review => review.productId === otherProps.singleProductId)
    }
}

export default connect(mapStateToProps, null)(ReviewsPerProduct);