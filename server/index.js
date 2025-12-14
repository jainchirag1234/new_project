const express = require("express");
const cors = require("cors")
const connectDB = require("./configs/db")
const userRoutes = require("./routes/userRoutes")
const blogRoutes = require("./routes/blogRoutes")
const billingRoutes = require("./routes/billingRoutes")
const productRoutes = require("./routes/productRoutes")
const cartRoutes = require("./routes/cartRoutes")
const carRoutes = require("./routes/carRoutes")

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/user",userRoutes);
app.use("/blog",blogRoutes);
app.use("/item",billingRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/car", carRoutes);

app.listen(3000, ()=>{
    console.log("Server is running on the port number 3000");
})