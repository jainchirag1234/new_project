// src/redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload; // load cart from server
    },
    addToCart: (state, action) => {
      const item = action.payload;
      const exists = state.cart.find((c) => c._id === item._id);
      if (exists) {
        exists.qty = item.qty; // update qty from server response
      } else {
        state.cart.push(item);
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((c) => c._id !== action.payload);
    },
    updateQty: (state, action) => {
      const updated = action.payload;
      const index = state.cart.findIndex((c) => c._id === updated._id);
      if (index !== -1) {
        state.cart[index] = updated;
      }
    },
  },
});

export const { setCart, addToCart, removeFromCart, updateQty } = cartSlice.actions;
export default cartSlice.reducer;
