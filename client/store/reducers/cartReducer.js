import { ADD_TO_CART } from "../actionCreators/shoppingCart";
import REMOVE_FROM_CART from "../actionCreators/shoppingCart";
import ADJUST_QUANTITY from "../actionCreators/shoppingCart";

const initialCart = {
    itemId: null,
    quantity: 0,
};

export const cartReducer = (state = initialCart, action) => {
    if (action.type === ADD_TO_CART) {
        // console.log('check add action reducer',action)
        return { ...state, itemId: action.payload };
    } else {
        return state;
    }
};
