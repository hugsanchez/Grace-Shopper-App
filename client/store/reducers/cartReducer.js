import { ADD_TO_CART } from "../actionCreators/shoppingCart";
import REMOVE_FROM_CART from "../actionCreators/shoppingCart";
import ADJUST_QUANTITY from "../actionCreators/shoppingCart";

// const initialCart = {
//     item: null,
//     quantity: 0,
// };

const initialCart = {
  cart: [],
  total: 0,
};

export const cartReducer = (state = initialCart, action) => {
  if (action.type === ADD_TO_CART) {
    let tempTotal = 0;
    action.payload.forEach((product) => {
      tempTotal += product.price * product.quantity;
    });
    return { ...state, cart: [...state.cart, action.payload] };
    // console.log("cart", cart);
    // let productIsInCart = false;
    // let tempObj = {};
    // for (let product of cart) {
    //   let currentIdx = product.productId;
    //   if (tempObj[currentIdx] !== 0) {
    //     productIsInCart = true;
    //     tempObj[currentIdx] = tempObj[currentIdx] + 1;
    //   } else {
    //     tempObj[currentIdx] = 1;
    //   }
    // }
    // if (!productIsInCart) {
    //   action.payload.quantity = 1;
    //   return {
    //     ...state,
    //     cart: [...cart, action.payload],
    //     total: total + action.payload.price,
    //   };
    //} else
    // return { ...state, cart: [...cart], total: total + action.payload.price };

    // return {
    //   ...state,
    //   cart: [...state.cart, ...action.payload],
    //   total: tempTotal,
    // };
    // } else {
    //   return state;
    // }
  }
  return state;
};
