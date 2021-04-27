import { GET_USER } from "../actionCreators/singleUser";
import { ADD_USER } from "../actionCreators/allUsers";

export const singleUserReducer = (state = {}, action) => {
    if (action.type === GET_USER) {
        return (state = action.payload);
    } else if (action.type === ADD_USER) {
        return (state = action.payload);
    } else {
        return state;
    }
};
