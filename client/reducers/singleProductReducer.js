import {SINGLE_PRODUCT} from "../actionCreators/singleProduct";

export const singleProductReducer = (state = [], action) => {
    if(action.type === SINGLE_PRODUCT) {
        return action.payload;
    } else {
        return state
    }
}