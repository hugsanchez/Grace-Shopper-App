import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { combineReducers } from "redux";

import { allProductsReducer } from "../reducers/allProductsReducer";
import { singleProductReducer } from "../reducers/singleProductReducer";
import { allUsersReducer } from "../reducers/allUsersReducer";
import { singleUserReducer } from "../reducers/singleUsersReducer";

const primaryReducer = combineReducers({
    allProducts: allProductsReducer,
    singleProduct: singleProductReducer,
    allUsers: allUsersReducer,
    singleUser: singleUserReducer,
});

const store = createStore(primaryReducer, applyMiddleware(thunk));

export default store;
