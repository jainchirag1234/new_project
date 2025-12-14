import React, { useEffect, useState } from "react";
import axios from "axios";
import Cart from "../../components/Cart";
import ProductList from "../../components/ProductList";

const API_URL = "http://localhost:3000"; // your backend base URL

const CartUseState = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // Load products
  useEffect(() => {
    axios
      .get(`${API_URL}/products`)
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.error(err));
  }, []);

  // Load cart
  useEffect(() => {
    axios
      .get(`${API_URL}/cart`)
      .then((res) => setCart(res.data.cart))
      .catch((err) => console.error(err));
  }, []);

  // Add item to cart
  const addToCart = async (product) => {
    try {
      const res = await axios.post(`${API_URL}/cart/add`, {
        name: product.title,
        price: product.price,
        image: product.image,
      });
      // update cart instantly
      setCart((prev) => {
        const exists = prev.find((item) => item._id === res.data.cartItem._id);
        if (exists) {
          return prev.map((item) =>
            item._id === res.data.cartItem._id ? res.data.cartItem : item
          );
        }
        return [...prev, res.data.cartItem];
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Remove from cart
  const removeFromCart = async (id) => {
    try {
      await axios.delete(`${API_URL}/cart/remove/${id}`);
      setCart(cart.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Update qty
  const updateQty = async (id, newQty) => {
    try {
      const item = cart.find((c) => c._id === id);
      if (!item) return;
 
      if (newQty <= 0) {
        removeFromCart(id);
        return;
      }

      const res = await axios.put(`${API_URL}/cart/update/${id}`, {
        qty: newQty,
      });
      setCart(cart.map((c) => (c._id === id ? res.data.cartItem : c)));
    } catch (err) {
      console.error(err);
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

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
      <h2 className="text-center mb-4">Shopping Cart (Server Integrated)</h2>
      <ProductList products={products} onAddToCart={addToCart} />

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
          <Cart cart={cart} onRemove={removeFromCart} onUpdateQty={updateQty} />
        </div>
      </div>
    </div>
  );
};

export default CartUseState;
