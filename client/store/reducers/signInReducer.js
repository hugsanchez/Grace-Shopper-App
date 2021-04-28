import { SIGN_IN, LOG_OUT } from "../actionCreators/singleUser";

const initialState = { user: null, isSignedIn: false };

export const signInReducer = (state = initialState, action) => {
    if (action.type === SIGN_IN) {
        return (state = { user: action.user, isSignedIn: true });
    } else if (action.type === LOG_OUT) {
        return (state = initialState);
    } else {
        return state;
    }
};
