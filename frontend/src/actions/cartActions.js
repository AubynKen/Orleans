import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const addItem = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);
  const dataToProduct = ({ name, image, price, countInStock }) => ({
    name,
    image,
    price,
    countInStock,
    product: data._id,
    qty,
  });
  const payload = dataToProduct(data);
  dispatch({
    type: CART_ADD_ITEM,
    payload,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeItem = (id) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
