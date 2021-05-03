import axios from "axios";

export const SINGLE_PRODUCT = "SINGLE PRODUCT";
export const UPDATE_PRODUCT = "UPDATE PRODUCT";

export const getProduct = (product) => ({
    type: SINGLE_PRODUCT,
    payload: product,
});

export const updateProduct = (product) => ({
    type: UPDATE_PRODUCT,
    payload: product,
});

export const getSingleProduct = (id) => async (dispatch) => {
    const singleProduct = await axios.get(`/api/products/${id}`);
    dispatch(getProduct(singleProduct.data));
};

export const updateSingleProduct = (product) => async (dispatch) => {
    const singleProduct = await axios.put(`/api/products/${product.id}`, {
        ...product,
    });
    dispatch(updateProduct(singleProduct.data));
};

export const updateProduct_adminAccess = (product) => async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const { data: singleProduct } = await axios.put(
        `/api/admins/products/${product.id}`,
        { ...product },
        {
            headers: {
                authorization: token,
            },
        },
    );
    dispatch(updateProduct(singleProduct));
};
