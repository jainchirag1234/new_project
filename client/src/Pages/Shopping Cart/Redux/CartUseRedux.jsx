// src/pages/ShoppingCart/CartUseRedux.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setCart,
  addToCart,
  removeFromCart,
  updateQty,
} from "./cartSlice";
import ProductList from "../../../components/ProductList";
import Cart from "../../../components/Cart";

const API_URL = "http://localhost:3000";

const CartUsingRedux = () => {
  const [products, setProducts] = useState([]);
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  // Load products
  useEffect(() => {
    axios
      .get(`${API_URL}/products`)
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.error(err));
  }, []);

  // Load cart from DB
  useEffect(() => {
    axios
      .get(`${API_URL}/cart`)
      .then((res) => dispatch(setCart(res.data.cart)))
      .catch((err) => console.error(err));
  }, [dispatch]);

  // Add item
  const handleAddToCart = async (product) => {
    try {
      const res = await axios.post(`${API_URL}/cart/add`, {
        name: product.title,
        price: product.price,
        image: product.image,
      });
      dispatch(addToCart(res.data.cartItem));
    } catch (err) {
      console.error(err);
    }
  };

  // Remove item
  const handleRemove = async (id) => {
    try {
      await axios.delete(`${API_URL}/cart/remove/${id}`);
      dispatch(removeFromCart(id));
    } catch (err) {
      console.error(err);
    }
  };

  // Update qty
  const handleUpdateQty = async (id, amount) => {
    const item = cart.find((c) => c._id === id);
    if (!item) return;

    const newQty = item.qty + amount;
    if (newQty <= 0) {
      handleRemove(id);
      return;
    }

    try {
      const res = await axios.put(`${API_URL}/cart/update/${id}`, {
        qty: newQty,
      });
      dispatch(updateQty(res.data.cartItem));
    } catch (err) {
      console.error(err);
    }
  };

  const totalItems = cart.length; 

  return (
    <div className="container mt-4">
      <button
        className="btn btn-primary mb-3"
        data-bs-toggle="offcanvas"
        data-bs-target="#cartPanel"
      >
        View Cart{" "}
        {totalItems > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {totalItems}
          </span>
        )}
      </button>
      <h2 className="text-center mb-4">Shopping Cart - Redux + Server</h2>
      <ProductList products={products} onAddToCart={handleAddToCart} />

      <div
        className="offcanvas offcanvas-end wider-offcanvas"
        tabIndex="-1"
        id="cartPanel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Cart</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>
        <div className="offcanvas-body">
          <Cart
            cart={cart}
            onRemove={handleRemove}
            onUpdateQty={handleUpdateQty}
          />
        </div>
      </div>
    </div>
  );
};

export default CartUsingRedux;
