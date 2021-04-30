import {
  SINGLE_PRODUCT,
  UPDATE_PRODUCT,
} from "../actionCreators/singleProduct";

export const singleProductReducer = (state = [], action) => {
  if (action.type === SINGLE_PRODUCT) {
    return action.payload;
  }
  if (action.type === UPDATE_PRODUCT) {
    return action.payload;
  } else {
    return state;
  }
};
