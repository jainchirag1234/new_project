import React from 'react'

const CarCard = ({cars, onAddToCart}) => {


  return (
    <div className="row">
      {cars.map((car) => (
        <div className="col-md-4 mb-3" key={car._id}>
          <div className="card">
            <img
              src={`http://localhost:3000/uploads/${car.image}`}
              className="card-img-top"
              alt={car.name}
            />
            <div className="card-body">
              <h5>{car.name}</h5>
              <h6> category : {car.category}</h6>
              <p> Cost per KM : ₹{car.costPerKm}</p>
              <button
                className="btn btn-primary"
                onClick={() => onAddToCart(car)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CarCard
