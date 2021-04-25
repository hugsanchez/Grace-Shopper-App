import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { combineReducers } from "redux";
import { allProductsReducer } from "../reducers/allProductsReducer";

const primaryReducer = combineReducers({
  allProducts: allProductsReducer,
});

const store = createStore(primaryReducer, applyMiddleware(thunk));

export default store;
