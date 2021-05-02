import axios from "axios";

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const ADJUST_QUANTITY = "ADJUST_QUANTITY";

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
    if(product===null){
      const response= (await axios.get(`/api/cart/productsInCart/${userId}`)).data
      console.log('action creator response', response)
      dispatch({ type: ADD_TO_CART, payload: response })
    }
    else{
      await axios.post(`/api/cart`, { product, userId });
      const response = (await axios.get(`/api/cart/productsInCart/${userId}`))
        .data;
      dispatch({ type: ADD_TO_CART, payload: response });

    }
    // await axios.post(`/api/cart`, { product, userId });
    // const response = (await axios.get(`/api/cart/productsInCart/${userId}`))
    //   .data;
    // dispatch({ type: ADD_TO_CART, payload: response });
  };
};

export const removeFromCart = (product, userId) => {
  console.log('delete action creator',product, userId)
  return async (dispatch) => {
      const response= (await axios.delete(`/api/cart/productsInCart/${product.id}`, {data: { userId }})).data
      console.log('action creator response', response)
      dispatch({ type: REMOVE_FROM_CART, payload: response })
  }
};

export const adjustQuantity = (itemId, quantity) => {
  return {
    type: ADJUST_QUANTITY,
    payload: {
      id: itemId,
      quantity,
    },
  };
};

// export const addItemToCart = (currProductId) => async (dispatch) => {
//     const currProduct = (await axios.put(`/api/orders/cart/${currProductId}`)).data;
//     console.log('thunk curr product found', currProductId)
//     dispatch(addToCart(currProductId));
//   };
