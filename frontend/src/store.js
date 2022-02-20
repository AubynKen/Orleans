import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { productListReducer, productDetailReducer } from "./reducers/productReducers";

import { cartReducer } from "./reducers/cartReducer";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailReducer,
  cart: cartReducer,
});

const cartItemsFromStorage = JSON.parse(localStorage.getItem("cartItems"));
const cartItemsLoaded = cartItemsFromStorage && cartItemsFromStorage[0] ? cartItemsFromStorage : [];

const initialState = { cart: { cartItems: cartItemsLoaded } };

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));

export default store;
