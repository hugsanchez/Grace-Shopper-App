import { ALL_PRODUCTS } from "../actionCreators/allProducts";

export const allProductsReducer = (state = [], action) => {
    if (action.type === ALL_PRODUCTS) {
        return action.payload;
    } else {
        return state;
    }
};
