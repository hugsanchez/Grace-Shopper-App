import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

import { allProductsReducer } from "./reducers/allProductsReducer";

import { singleProductReducer } from "./reducers/singleProductReducer";
import { allUsersReducer } from "./reducers/allUsersReducer";
import { singleUserReducer } from "./reducers/singleUserReducer";
import { cartReducer } from "./reducers/cartReducer";

// Combiend Reducer
const primaryReducer = combineReducers({
    allProducts: allProductsReducer,
    singleProduct: singleProductReducer,
    allUsers: allUsersReducer,
    singleUser: singleUserReducer,
    cart: cartReducer,
});

// Redux Middleware
const middleware = applyMiddleware(thunk, createLogger({ collapsed: true }));

// Redux Store
const store = createStore(primaryReducer, middleware);
export default store;
