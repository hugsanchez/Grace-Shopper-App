import { GET_ALL_USERS, ADD_USER } from "../actionCreators/allUsers";

export const allUsersReducer = (state = [], action) => {
    // if (action.type === GET_ALL_USERS) {
    //     return (state = [...action.payload]);
    if (action.type === ADD_USER) {
        return (state = [...state, action.payload]);
    } else {
        return state;
    }
};
