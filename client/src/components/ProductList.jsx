import React from "react";

const ProductList = ({ products, onAddToCart }) => {
  return (
    <div className="row">
      {products.map((product) => (
        <div className="col-md-4 mb-3" key={product._id}>
          <div className="card">
            <img
              src={product.image}
              className="card-img-top"
              alt={product.title}
            />
            <div className="card-body">
              <h5>{product.title}</h5>
              <p>₹{product.price}</p>
              <button
                className="btn btn-primary"
                onClick={() => onAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
