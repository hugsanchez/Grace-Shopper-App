import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReviewsPerProduct from './ReviewsProduct.jsx'
import {thunkAddReview} from '../../store/actionCreators/reviews'

class ReviewForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            detail: '',
            productId: this.props.singleProductId,
            userId: this.props.userId,
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(evt){
        const review = {}
        review[evt.target.name] = evt.target.value
        this.setState(review)
    }
    handleSubmit(evt) {
        evt.preventDefault();
        this.props.addReview({...this.state})
    }
    render(){
        const {reviewsPerProduct} = this.props;
        const {detail} = this.state;
        const{handleChange, handleSubmit} = this;

        return(
            <div>
                <h1>REVIEW FORM</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='detail'>Thoughts?</label>
                    <input name='detail' onChange={handleChange} value={detail} required />

                    <button type='submit'>Post Review</button>
                </form>
                <div>
                <h2>Reviews:</h2>
                    <ul>
                         {reviewsPerProduct.length ? reviewsPerProduct.map((currReview, revIdx) => {
                            return (
                                <div key={revIdx}>
                                    <ReviewsPerProduct currReview={currReview}/>
                                </div>
                            )
                         }) : 'Currently No Reviews'}
                    </ul>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, otherProps) => {
    return{
        state,
        reviewsPerProduct: state.reviews.filter(review => review.productId === otherProps.singleProductId)
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        addReview: (review) => dispatch(thunkAddReview(review))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm);