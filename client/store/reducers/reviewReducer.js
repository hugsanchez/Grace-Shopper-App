import {LOAD_ALL_REVIEWS} from '../actionCreators/reviews';

export const reviewReducer = (state = [], action) => {
    if(action.type === LOAD_ALL_REVIEWS){
        state = [...state, ...action.reviews]
    }
    return state
}