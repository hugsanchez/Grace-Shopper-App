import { SIGN_IN, LOG_OUT } from "../actionCreators/singleUser";

export const signInReducer = (state = {}, action) => {
    if (action.type === SIGN_IN) {
        return (state = { ...action.user });
    } else if (action.type === LOG_OUT) {
        return (state = {});
    } else {
        return state;
    }
};
