import axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAIl_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
} from "../constants/productConstants";

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    }); // tells the redux reducer that we've initiated a request
    const { data } = await axios.get("/api/products");
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    }); // sends products to the reducer
  } catch (err) {
    if (err.response && err.response.data.message) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload: err.response.data.message, // axios-raised error
      });
    } else {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload: err.message, // generic error
      });
    }
  }
};

export const listProductDetails = (productId) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAIl_REQUEST,
    });
    const { data: productData } = await axios.get(`/api/products/${productId}`);
    dispatch({
      type: PRODUCT_DETAIL_SUCCESS,
      payload: productData,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_DETAIL_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
