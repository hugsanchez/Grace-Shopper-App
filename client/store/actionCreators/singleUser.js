import axios from "axios";

export const GET_USER = "GET_USER";
export const SIGN_IN = "SIGN_IN";

export const getUser = (user) => ({
    type: GET_USER,
    payload: user,
});

export const signIn = ({ username, password }) => ({
    type: SIGN_IN,
    username,
    password,
});

export const getSingleUser = (id) => async (dispatch) => {
    try {
        const { data: user } = await axios.get(`/api/users/${id}`);
        dispatch(getUser(user));
    } catch (err) {
        console.error(err);
    }
};

export const attemptTokenLogin = () => async (dispatch) => {
    try {
        const token = window.localStorage.getItem("token");

        if (token) {
            const response = await axios.get("/api/auth", {
                headers: {
                    authorization: token,
                },
            }).data;

            // dispatch(signIn({ response, hi: "hi" }));

            // testing
            // window.localStorage.removeItem("token");
        }
    } catch (err) {
        console.error(err);
    }
};

export const logOut = () => async (dispatch) => {
    try {
        window.localStorage.removeItem("token");
    } catch (err) {
        console.error(err);
    }
};
