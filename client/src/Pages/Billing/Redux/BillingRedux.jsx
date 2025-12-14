// src/components/BillingReduxSimple.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setItems, updateItem } from "./billingSlice";
import axios from "axios";

function BillingRedux() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.items);

  // Fetch items from server
  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:3000/item");
      if (res.data.success) {
        dispatch(setItems(res.data.items));
      } else {
        alert("Failed to fetch items");
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Update qty in DB (+ or -)
  const handleUpdateQty = async (id, newQty) => {
    try {
      const res = await axios.put(`http://localhost:3000/item/update/${id}`, {
        qty: newQty,
      });
      if (res.data.success) {
        dispatch(updateItem(res.data.item));
      } else {
        alert("Update failed: " + res.data.message);
      }
    } catch (error) {
      console.error("Error updating qty:", error);
    }
  };

  // Calculate total
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Billing Summary (Redux + Axios)</h2>
      <table className="table table-bordered table-striped text-center">
        <thead className="table-dark">
          <tr>
            <th>Item</th>
            <th>Price (₹)</th>
            <th>Quantity</th>
            <th>Sub Total (₹)</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  <div className="d-flex justify-content-center align-items-center gap-2">
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => handleUpdateQty(item._id, item.qty - 1)}
                      disabled={item.qty === 0}
                    >
                      -
                    </button>
                    <span>{item.qty}</span>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => handleUpdateQty(item._id, item.qty + 1)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>{item.price * item.qty}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No items found
              </td>
            </tr>
          )}
          <tr className="fw-bold">
            <td colSpan="3">Total Amount</td>
            <td>{total}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default BillingRedux;
