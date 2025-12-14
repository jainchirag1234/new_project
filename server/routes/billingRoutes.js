const express = require("express");
const BillingItem = require("../models/BillingItem");
const router = express.Router();

// GET all items
router.get("/", async (req, res) => {
  try {
    const items = await BillingItem.find();
    res.json({ success: true, items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST add new item
router.post("/add", async (req, res) => {
  try {
    const item = new BillingItem(req.body);   // FIXED: qty instead of quantity
    //const item = new BillingItem({ name, price, qty });
    await item.save();
    res.json({ success: true, item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT update quantity
router.put("/update/:id", async (req, res) => {
  try {
    const { qty } = req.body;
    const item = await BillingItem.findByIdAndUpdate(   // FIXED: BillingItem
      req.params.id,
      { qty },
      { new: true }
    );
    if (!item)
      return res.status(404).json({ success: false, message: "Item not found" });

    res.json({ success: true, item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
