import { SIGN_IN, LOG_OUT, UPDATE_USER } from "../actionCreators/singleUser";

const initialState = { user: null, isSignedIn: false };

export const signInReducer = (state = initialState, action) => {
    if (action.type === SIGN_IN) {
        return (state = { user: action.user, isSignedIn: true });
    } else if (action.type === LOG_OUT) {
        return (state = initialState);
    } else if (action.type === UPDATE_USER) {
        return (state = { ...state, user: action.user });
    } else {
        return state;
    }
};
