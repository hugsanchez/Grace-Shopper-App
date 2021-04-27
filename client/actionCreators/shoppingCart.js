import axios from "axios";

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const ADJUST_QUANTITY ="ADJUST_QUANTITY";

export const addToCart= (itemId)=>{
    console.log('this is working action creator')
    return{
        type: ADD_TO_CART,
        payload: itemId
    }
}

export const removeFromCart= (itemId)=>{
    return{
        type: REMOVE_FROM_CART,
        payload:{
            id: itemId
        }
    }
}

export const adjustQuantity= (itemId, quantity)=>{
    return{
        type: ADJUST_QUANTITY,
        payload:{
            id: itemId,
            quantity
        }
    }
}


export const addItemToCart = (currProductId) => async (dispatch) => {
    const currProduct = (await axios.put(`/api/orders/cart/${currProductId}`)).data;
    dispatch(addToCart(currProductId));
  };



