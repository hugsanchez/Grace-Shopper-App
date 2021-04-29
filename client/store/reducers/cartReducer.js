import { ADD_TO_CART } from "../actionCreators/shoppingCart";
import REMOVE_FROM_CART from "../actionCreators/shoppingCart";
import ADJUST_QUANTITY from "../actionCreators/shoppingCart";

// const initialCart = {
//     item: null,
//     quantity: 0,
// };

const initialCart= {
    cart: []
}

export const cartReducer = (state = initialCart, action) => {
    if (action.type === ADD_TO_CART) {
        console.log('cart reducer', action.payload)
        // console.log('check add action reducer',action)
        // return { ...state, item: action.payload };
        const {cart}= state
        console.log('cart log',cart)
        return {...state, cart: [...cart, action.payload]}
    } else {
        return state;
    }
};
