import {
    GET_CATEGORIES,
    GET_CATEGORY,
    ADD_CATEGORY,
    UPDATE_CATEGORY,
    DELETE_CATEGORY,
} from "../actionCreators/categories";

export const categoriesReducer = (state = [], action) => {
    if (action.type === GET_CATEGORIES) {
        return (state = action.categories);
    } else {
        return state;
    }
};
