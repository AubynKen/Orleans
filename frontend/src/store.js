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

const store = createStore(reducer, {}, composeWithDevTools(applyMiddleware(thunk)));

export default store;
