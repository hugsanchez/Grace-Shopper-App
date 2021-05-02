import axios from "axios";

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const INCREASE_QUANTITY = "INCREASE_QUANTITY";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";

// export const addToCart= (currProductId)=>{
//     console.log('this is working action creator', currProductId)
//     return{
//         type: ADD_TO_CART,
//         payload: currProductId
//     }
// }

// API {
//     products: [ { id: #, quantity: # }, { id: another #, quantity: # }, ...],
//     userId: #,
// }

export const addItemToCart = (product, userId) => {
  return async (dispatch) => {
    if (product === null) {
      const response = (await axios.get(`/api/cart/productsInCart/${userId}`))
        .data;
      dispatch({ type: ADD_TO_CART, payload: response });
    } else {
      await axios.post(`/api/cart`, { product, userId });
      const response = (await axios.get(`/api/cart/productsInCart/${userId}`))
        .data;
      dispatch({ type: ADD_TO_CART, payload: response });
    }
  };
};

export const removeFromCart = (product, userId) => {
  return async (dispatch) => {
    const response = (
      await axios.delete(`/api/cart/productsInCart/${product.productId}`, {
        data: { userId },
      })
    ).data;
    dispatch({ type: REMOVE_FROM_CART, payload: response });
  };
};

export const increaseQuantity = (product, userId) => {
  return async (dispatch) => {
    const response = (
      await axios.put(`/api/cart/productsInCart/${product.productId}`, {
        data: { userId },
      })
    ).data;
    console.log("response in reducer", response);
    dispatch({ type: INCREASE_QUANTITY, payload: response });
  };
};

// export const addItemToCart = (currProductId) => async (dispatch) => {
//     const currProduct = (await axios.put(`/api/orders/cart/${currProductId}`)).data;
//     console.log('thunk curr product found', currProductId)
//     dispatch(addToCart(currProductId));
//   };
