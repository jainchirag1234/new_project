import React from "react";

const CarCart = ({ cart, onUpdate, onRemove }) => {
  const total = cart.reduce(
    (sum, item) => sum + item.qty * item.distance * item.costPerKm,
    0
  );

  return (
    <div>
      <div className="table-responsive">
        <table className="table align-middle table-striped">
          <thead className="table-light">
            <tr>
              <th>Car</th>
              <th>Category</th>
              <th>Distance (km)</th>
              <th>Cost/km</th>
              <th>Total Cost/Vehicle</th>
              <th>Quantity</th>
              <th>SubTotal</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item._id}>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src={`http://localhost:3000/uploads/${item.image}`}
                      alt={item.name}
                      width="60"
                      height="40"
                      className="rounded me-2"
                    />
                    <div>
                      <strong>{item.name}</strong>
                    </div>
                  </div>
                </td>
                <td>{item.category}</td>
                <td className="text-center">
                  <input
                    type="number"
                    value={item.distance}
                    min="10"
                    className="form-control"
                    style={{ width: "70px" }}
                    onChange={(e) => {
                      const newDistance = Number(e.target.value);
                      if (newDistance > 5) {
                        onUpdate(item._id, newDistance, item.qty);
                      } else {
                        alert("Minimum distance must be 10 km");
                      }
                    }}
                  />
                </td>

                <td>₹{item.costPerKm}</td>
                <td>₹{item.distance * item.costPerKm}</td>
                <td>
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-outline-secondary btn-sm me-2"
                      onClick={() =>
                        onUpdate(item._id, item.distance, item.qty - 1)
                      }
                    >
                      -
                    </button>
                    <span>{item.qty}</span>
                    <button
                      className="btn btn-outline-secondary btn-sm ms-2"
                      onClick={() =>
                        onUpdate(item._id, item.distance, item.qty + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="fw-semibold text-success">
                  ₹{item.costPerKm * item.distance * item.qty}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onRemove(item._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total Summary */}
        <div className="text-end mt-3">
          <h5>
            Total Amount: <span className="text-primary">₹{total}</span>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default CarCart;
