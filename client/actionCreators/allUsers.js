import axios from "axios";

export const GET_ALL_USERS = "GET_ALL_USERS";

export const getUsers = (users) => ({
    type: GET_ALL_USERS,
    payload: users,
});

export const getAllUsers = () => async (dispatch) => {
    try {
        const { data: allUsers } = await axios.get("/api/users");
        dispatch(getUsers(allUsers));
    } catch (err) {
        console.error(err);
    }
};
