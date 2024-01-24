import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    totel: null,
  },
  reducers: {
    addToCart(state, action) {
      const itemPresent = state.cart.find((item) => item.id === action.id);

      if (itemPresent) {
        itemPresent.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeCart(state, action) {
      const removeItem = state.cart.filter(
        (item) => item.id !== action.payload.id
      );
      state.cart = removeItem;
    },
    incrementQuantity(state, action) {
      const itemPresent = state.cart.find(
        (item) => item.id === action.payload.id
      );
      itemPresent.quantity++;
    },
    decrementQuantity(state, action) {
      const itemPresent = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (itemPresent.quantity === 1) {
        itemPresent.quantity = 0;
        const removeItem = state.cart.filter(
          (item) => item.id !== action.payload.id
        );
        state.cart = removeItem;
      } else {
        itemPresent.quantity--;
      }
    },
    cleanCart(state, action) {
      state.cart = [];
    },
    totelPrice(state, action) {
      state.totel = action.payload;
    },
  },
});

const { actions, reducer } = cartSlice;
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeCart,
  cleanCart,
  totelPrice,
} = actions;
export default reducer;
