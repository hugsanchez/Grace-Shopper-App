import axios from "axios";

export const GET_USER = "GET_USER";

export const getUser = (user) => ({
    type: GET_USER,
    payload: user,
});

export const getUser = (id) => async (dispatch) => {
    try {
        const { data: user } = await axios.get(`/api/users/${id}`);
        dispatch(getUser(user));
    } catch (err) {
        console.error(err);
    }
};
