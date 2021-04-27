import { GET_ALL_USERS } from "../actionCreators/allUsers";

export const allUsersReducer = (state = [], action) => {
    if (action.type === GET_ALL_USERS) {
        return (state = [...action.payload]);
    } else {
        return state;
    }
};
