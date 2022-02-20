import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const itemAdded = action.payload;
      const itemFound = state.cartItems.find((item) => item.product === itemAdded.product);

      if (!itemFound) {
        return {
          ...state,
          cartItems: [...state.cartItems, itemAdded],
        };
      }
      return {
        ...state,
        cartItems: state.cartItems.map((item) => (item.product === itemAdded.product ? itemAdded : item)),
      };

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.product !== action.payload),
      };

    default:
      return state;
  }
};
