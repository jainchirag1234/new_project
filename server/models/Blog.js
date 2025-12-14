const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  createdBy: { type: String, required: true },
  time: { type: String, default: new Date().toLocaleString() },
},  { timestamps: true });

module.exports = mongoose.model("Blog", blogSchema, "clc_blogs");

