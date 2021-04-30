import { ADD_TO_CART } from "../actionCreators/shoppingCart";
import REMOVE_FROM_CART from "../actionCreators/shoppingCart";
import ADJUST_QUANTITY from "../actionCreators/shoppingCart";

// const initialCart = {
//     item: null,
//     quantity: 0,
// };

const initialCart = {
  cart: [],
  total: 0
};

export const cartReducer = (state = initialCart, action) => {
  if (action.type === ADD_TO_CART) {
    const { cart , total} = state;
    let productIsInCart= false
    for(let product of cart){
      if(product.id===action.payload.id){
        productIsInCart= true
        product['quantity']++
      }
    }
    if(!productIsInCart) {
      action.payload.quantity=1
      return { ...state, cart: [...cart, action.payload], total: total+ action.payload.price }
    }
    else return { ...state, cart: [...cart], total: total+ action.payload.price }

  } else {
    return state;
  }
};
