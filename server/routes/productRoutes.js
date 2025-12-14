const express = require("express");
const Product = require("../models/Products");

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// mene post ki jagah seed use kr liya tha chatgpt se to data yahi se insert ho ja rha tha
router.post("/seed", async (req, res) => {
  try {
    const sampleProducts = [
      { title: "Apple", price: 50, image: "img1" },
      { title: "Banana", price: 20, image: "img2" },
      { title: "Mango", price: 80, image: "img3" },
    ];
    await Product.insertMany(sampleProducts);
    res.json({ success: true, message: "Sample products added" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
