  const express = require("express");
  const User = require("../models/User");  
  const multer = require("multer");
  const path = require("path");
  const fs = require("fs");

  const router = express.Router();

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Folder to store images
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // unique file name
    }
  });

  const upload = multer({ storage });

  router.get("/", async (req, res) => {
      try {
          const users = await User.find();
          res.status(200).json({ success: true, users });
      } catch (error) {
          res.status(500).json({ success: false, message: "Error fetching users", error: error.message });
      }
  });

  router.post("/register", upload.single("profileImage"), async (req, res) =>{
      try{
          const { name, email, password, gender, birthdate, course, hobbies, address } = req.body;

          const newUser = new User({
              name, 
              email,   
              password,
              gender,
              birthdate: birthdate ? new Date(birthdate) : null,
              course,
              hobbies: hobbies ? JSON.parse(hobbies) : [],
              address,
              profileImage:req.file ? req.file.filename : "default.jpg"
          });

          await newUser.save();
          res.status(200).json({success:true, message:"user registered successfully", user:newUser});
      }
      catch(error){
          res.status(500).json({success:false, message:`Error in regestering user ${error}`});
      }
  });

  router.get("/search", async (req, res) => {
    try {
      const { name } = req.query;
      const users = await User.find({
        name: { $regex: name, $options: "i" } // case-insensitive search
      });
      res.status(200).json({ success: true, users });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error searching users", error: error.message });
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
      res.status(200).json({ success: true, user });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching user", error: error.message });
    }
  });



  router.put("/update/:id", upload.single("profileImage"), async (req, res) => {
    try {
      const { name, email, password, gender, birthdate, course, hobbies, address } = req.body;

      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      if (req.file && user.profileImage !== "default.jpg") {
        const oldFilePath = path.join(__dirname, "../uploads", user.profileImage);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }

      user.name = name || user.name;
      user.email = email || user.email;
      user.password = password || user.password;
      user.gender = gender || user.gender;
      user.course = course || user.course;
      user.hobbies = hobbies ? hobbies.split(",") : user.hobbies;
      user.address = address || user.address;
      if (birthdate) user.birthdate = new Date(birthdate);
      if (req.file) user.profileImage = req.file.filename;

      await user.save();
      res.status(200).json({ success: true, message: "User updated successfully", user });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error updating user", error: error.message });
    }
  });

  router.delete("/delete/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
      
      const filePath = path.join(__dirname, "../uploads", user.profileImage);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error deleting user", error: error.message });
    }
  });

  module.exports = router