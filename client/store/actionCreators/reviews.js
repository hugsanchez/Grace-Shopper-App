import axios from 'axios';

export const LOAD_ALL_REVIEWS = 'LOAD_ALL_REVIEWS';

export const loadReviews = (reviews) => {
    return {
        type:LOAD_ALL_REVIEWS,
        reviews
    }
}

export const thunkLoadReviews = () => {
    try{
        return async(dispatch) => {
            const {data: reviews} = await axios.get('/api/reviews');
            dispatch(loadReviews(reviews));
        };
    } catch(err){
        console.log(err)
    }
};
