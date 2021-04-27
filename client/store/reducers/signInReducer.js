import { SIGN_IN } from "../actionCreators/singleUser";

export const signInReducer = (state = {}, action) => {
    if (action.type === SIGN_IN) {
        return state;
    } else {
        return state;
    }
};
