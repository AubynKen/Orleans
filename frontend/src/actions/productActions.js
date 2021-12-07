import axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from "../constants/productConstatns";

export const productList = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_LIST_REQUEST,
      }); // tells the redux reducer that we've initiated a request
      const { data } = axios.get("/api/products");
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
};
