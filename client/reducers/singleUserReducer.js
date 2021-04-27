import { GET_USER } from "../actionCreators/allUsers";

export const singleUserReducer = (state = { user: {} }, action) => {
    if (action.type === GET_ALL_USERS) {
        return (state = { ...state, highlightedUser: action.payload });
    } else {
        return state;
    }
};
