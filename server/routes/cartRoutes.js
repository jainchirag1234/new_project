const express = require("express");
const Cart = require("../models/Cart");

const router = express.Router();

// Get all cart items
router.get("/", async (req, res) => {
  try {
    const cart = await Cart.find();
    res.json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Add item to cart
router.post("/add", async (req, res) => {
  try {
    const { name, price, image } = req.body;

    // Check if already exists
    let item = await Cart.findOne({ name });
    if (item) {
      item.qty += 1;
      await item.save();
      return res.json({ success: true, cartItem: item });
    }

    const newItem = new Cart({ name, price, image, qty: 1 });
    await newItem.save();
    res.json({ success: true, cartItem: newItem });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Update qty
router.put("/update/:id", async (req, res) => {
  try {
    const { qty } = req.body;
    const updatedItem = await Cart.findByIdAndUpdate(
      req.params.id,
      { qty },
      { new: true }
    );
    if (!updatedItem)
      return res.status(404).json({ success: false, message: "Item not found" });

    res.json({ success: true, cartItem: updatedItem });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Remove item
router.delete("/remove/:id", async (req, res) => {
  try {
    const deletedItem = await Cart.findByIdAndDelete(req.params.id);
    if (!deletedItem)
      return res.status(404).json({ success: false, message: "Item not found" });

    res.json({ success: true, message: "Item removed" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
