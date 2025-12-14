import axios from "axios";
import React, { useEffect, useState } from "react";

function BillingUseState() {
  const [items, setItems] = useState([]);

  // Fetch items from server
  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:3000/item/");
      if (res.data.success) {
        setItems(res.data.items);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Update qty in DB (+ or -)
  const updateQty = async (id, newQty) => {
    try {
      const res = await axios.put(`http://localhost:3000/item/update/${id}`, {
        qty: newQty,
      });
      if (res.data.success) {
        fetchItems();
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error("Error updating qty:", error);
    }
  };

  // Calculate total
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Billing Summary (MongoDB + Express)</h2>
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
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => updateQty(item._id, item.qty - 1)}
                    disabled={item.qty === 0}
                  >
                    -
                  </button>{" "}
                  <span>{item.qty}</span>{" "}
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => updateQty(item._id, item.qty + 1)}
                  >
                    +
                  </button>
                </td>
                <td>{item.price * item.qty}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colspan="4">No data found</td>
            </tr>
          )}
          <tr>
            <td colspan="3">Total</td>
            <td>{total}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default BillingUseState;
