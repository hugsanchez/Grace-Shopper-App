import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { combineReducers } from "redux";
import { allProductsReducer } from "../reducers/allProductsReducer";
import { singleProductReducer } from "../reducers/singleProductReducer"; 
import {cartReducer} from "../reducers/cartReducer"

const primaryReducer = combineReducers({
  allProducts: allProductsReducer,
  singleProduct: singleProductReducer,
  cart: cartReducer
});

const store = createStore(primaryReducer, applyMiddleware(thunk));

export default store;
