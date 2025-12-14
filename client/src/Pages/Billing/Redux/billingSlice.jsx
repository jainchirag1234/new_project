// src/features/itemSlice.js
import { createSlice } from "@reduxjs/toolkit";

const billingSlice = createSlice({
  name: "items",
  initialState: {
    items: [],
  },
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    updateItem: (state, action) => {
      const updated = action.payload;
      state.items = state.items.map((item) =>
        item._id === updated._id ? updated : item
      );
    },
  },
});

export const { setItems, updateItem } = billingSlice.actions;
export default billingSlice.reducer;
