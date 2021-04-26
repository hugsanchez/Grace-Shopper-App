import axios from "axios";

export const SINGLE_PRODUCT = "SINGLE PRODUCT";

export const getProduct = (product) => ({
    type: SINGLE_PRODUCT,
    payload: product,
});

export const getSingleProduct = (id) => async (dispatch) => {
    const singleProduct = await axios.get(`/api/products/${id}`);
    dispatch(getProduct(singleProduct.data));
}