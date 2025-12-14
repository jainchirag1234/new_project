const express = require("express");
const mongoose = require("mongoose");
const  router = express.Router();

const userSchema = new mongoose.Schema({
    name : String,
    age : Number
});

const User = mongoose.model("User", userSchema);

//Get all users
router.get("/", async (req,res) => {
    const users = await User.find();
    res.send(users);
})

//get user by id
router.get("/:id", async(req,res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("User not found");
    res.send(user);
})

//insert user
router.post("/", async (req, res)=>{
    const {name, age} = req.body;
    const newUser = new User({name, age});
    await newUser.save();
    res.send(newUser);
})

module.exports = router;