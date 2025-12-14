const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
 
      name: { type: String, required: true },
      price: { type: Number, required: true },
      image: { type: String },
      qty: { type: Number, default: 1 },
});

module.exports = mongoose.model("Cart", cartSchema, "clc_cart");
