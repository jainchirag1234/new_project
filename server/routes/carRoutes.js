const express = require("express");
const Car = require("../models/Car");
const CarCart = require("../models/CarCart");

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find();
    res.json({ success: true, cars });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/addCar", async (req, res) => {
  try {
    const { name, category, costPerKm, image } = req.body;
    const newCar = new Car({
      name,
      category,
      costPerKm,
      image,
    });
    await newCar.save();
    res.json({ success: true, car: newCar });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/cart", async (req, res) => {
  try {
    const cartItems = await CarCart.find();
    res.json({ success: true, cartItems });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/add", async (req, res) => {
  try {
    const { name, category, costPerKm, image, distance } = req.body;

    const newItem = new CarCart({
      name,
      category,
      costPerKm,
      image,
      distance,
      qty: 1
    });

    await newItem.save();
    res.status(200).json({ success: true, message: "Item added to cart" , cartItem : newItem});
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.put("/cart/update/:id", async (req, res) => {
  try {
    const { qty, distance } = req.body;

    const updatedItem = await CarCart.findByIdAndUpdate(
      req.params.id,
      { qty, distance },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    res.status(200).json({ success: true, cartItem: updatedItem });
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Delete item from cart
router.delete("/cart/delete/:id", async (req, res) => {
  try {
    const deletedItem = await CarCart.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    res.status(200).json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
