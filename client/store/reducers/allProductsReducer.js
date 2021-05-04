import { ALL_PRODUCTS } from "../actionCreators/allProducts";
import {
    UPDATE_PRODUCT,
    CREATE_PRODUCT,
} from "../actionCreators/singleProduct";

export const allProductsReducer = (state = [], action) => {
    if (action.type === ALL_PRODUCTS) {
        return action.payload;
    }
    if (action.type === UPDATE_PRODUCT) {
        return state.map((product) =>
            product.id !== action.payload.id ? product : action.payload,
        );
    } else if (action.type === CREATE_PRODUCT) {
        return (state = [...state, action.payload]);
    } else {
        return state;
    }
};
