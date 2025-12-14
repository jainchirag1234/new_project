import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "../Pages/Blogs/Redux/blogSlice"
import billingReducer from "../Pages/Billing/Redux/billingSlice"
import cartReducer from "../Pages/Shopping Cart/Redux/cartSlice"

export const store = configureStore({
    reducer: {
        blog: blogReducer,
        items: billingReducer,
        cart: cartReducer
    }
})