import axios from "axios";

export const GET_USER = "GET_USER";
export const SIGN_IN = "SIGN_IN";
export const LOG_OUT = "LOG_OUT";
export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_PROFILE = "UPDATE_PROFILE";

export const getUser = (user) => ({
    type: GET_USER,
    payload: user,
});

export const updateUser = (user) => ({
    type: UPDATE_USER,
    user,
});

export const updateProfile = (user) => ({
    type: UPDATE_PROFILE,
    user,
});

// signs in a user
export const signIn = (user) => ({
    type: SIGN_IN,
    user,
});

// Remove a user from the redux store for signing in
export const logOut = () => ({
    type: LOG_OUT,
});

// Simply just gets information about any user
export const getSingleUser = (id) => async (dispatch) => {
    try {
        const { data: user } = await axios.get(`/api/users/${id}`);
        dispatch(getUser(user));
    } catch (err) {
        console.error(err);
    }
};

// Uses the clients token to attempt access at a user's data
export const attemptTokenLogin = () => async (dispatch) => {
    try {
        const token = window.localStorage.getItem("token");

        if (token) {
            const { data: user } = await axios.get("/api/auth", {
                headers: {
                    authorization: token,
                },
            });

            if (user) {
                dispatch(signIn(user));
            }
        }
    } catch (err) {
        console.error(err);
    }
};

// Logs out (only a thunk bc we might add to it)
export const logOutUser = () => async (dispatch) => {
    try {
        window.localStorage.removeItem("token");
        dispatch(logOut());
    } catch (err) {
        console.error(err);
    }
};

export const updateUserThunk = (payload) => async (dispatch) => {
    try {
        const { id, firstName, lastName, username, email } = payload;
        const { data: user } = await axios.put(`/api/users/${id}`, {
            id,
            firstName,
            lastName,
            username,
            email,
        });

        dispatch(updateUser(user));
    } catch (err) {
        console.error(err);
    }
};

export const updateProfileThunk = (payload) => async (dispatch) => {
    try {
        const { id, firstName, lastName, username, email } = payload;
        const { data: user } = await axios.put(`/api/users/${id}`, {
            id,
            firstName,
            lastName,
            username,
            email,
        });

        dispatch(updateProfile(user));
    } catch (err) {
        console.error(err);
    }
};

export const updateUser_adminAccess = (payload) => async (dispatch) => {
    try {
        const token = window.localStorage.getItem("token");
        const { data: user } = await axios.put(
            `/api/admins/users/${payload.id}`,
            { ...payload },
            {
                headers: {
                    authorization: token,
                },
            },
        );

        dispatch(updateUser(user));
    } catch (err) {
        console.error(err);
    }
};
