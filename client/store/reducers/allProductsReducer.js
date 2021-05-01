import { ALL_PRODUCTS } from "../actionCreators/allProducts";
import { UPDATE_PRODUCT } from "../actionCreators/singleProduct";

export const allProductsReducer = (state = [], action) => {
    if (action.type === ALL_PRODUCTS) {
        return action.payload;
    }
    if (action.type === UPDATE_PRODUCT) {
        state = state.map((product) =>
            product.id !== action.payload.id ? product : action.payload,
        );
    } else {
        return state;
    }
};
