import axios from "axios";
import React, { useEffect, useState } from "react";
import CarCard from "./CarCard";
import CarCart from "./CarCart";

const CarUseState = () => {
  const [cars, setCars] = useState([]);
  const [cart, setCart] = useState([]);

  const fetchCars = async () => {
    const res = await axios.get("http://localhost:3000/car");
    setCars(res.data.cars);
  };

  const fetchCart = async () => {
    const res = await axios.get("http://localhost:3000/car/cart");
    setCart(res.data.cartItems);
  };

  useEffect(() => {
    fetchCars();
    fetchCart();
  }, []);

  const handleAddToCart = async (car) => {
    const existing = cart.find((item) => item.name === car.name);
    if (existing) {
      alert("Car already added to cart!\nYou can update it there");
      return;
    }

    const distance = prompt(`Enter journey distance (in km) for ${car.name}:`);
    if (!distance || isNaN(distance)) {
      alert("Please enter a valid distance!");
      return;
    } else if (distance <= 10) {
      alert("we do not rent car for below 10 KM distance");
      return;
    }

    const newItem = { ...car,qty:1,  distance: Number(distance) };
    const res = await axios.post("http://localhost:3000/car/add", newItem);
    setCart((prev) => [...prev, newItem]);
    if (res.data.success) {
      alert(`${car.name} added to the cart`);
    }
  };

  const handleUpdate = async (id, newDistance, newQty) => {

    if(newQty <= 0){
        handleRemove(id);
        return;
    }

    const res = await axios.put(
      `http://localhost:3000/car/cart/update/${id}`,{
        distance : newDistance,
        qty : newQty
      }
      
    );
    if (res.data.success) {
      fetchCart();
    }
  };

  // Delete cart item
  const handleRemove = async (id) => {
    const res = await axios.delete(
      `http://localhost:3000/car/cart/delete/${id}`
    );
    if (res.data.success) {
      setCart((prev) => prev.filter((item) => item._id !== id));
    }
  };

  return (
    <div>
      <div className="container mt-4">
        <button
          className="btn btn-primary mb-3"
          data-bs-toggle="offcanvas"
          data-bs-target="#cartPanel"
        >
          View Cart
        </button>
        <h2 className="text-center mb-4">Car Rental example</h2>

        <CarCard cars={cars} onAddToCart={handleAddToCart} />

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
            <CarCart
              cart={cart}
              onRemove={handleRemove}
              onUpdate={handleUpdate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarUseState;
