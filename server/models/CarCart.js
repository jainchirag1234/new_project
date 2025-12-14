const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  name: String,
  category: String,
  costPerKm: Number,
  image: String,
  distance: Number,
  qty: { type: Number, default: 1 }
},{timestamps : true});

module.exports = mongoose.model("CarCart", cartSchema, "clc_car_cart");
