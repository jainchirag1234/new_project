const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [2, "Name must be at least 2 characters"],
        maxlength: [50, "Name must not exceed 50 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+\@.+\..+/, "Please enter a valid email"] // regex validation
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"]
        // ⚠️ Ideally hashed before saving
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"], // restrict values
        required: [true, "Gender is required"]
    },
    birthdate: {
        type: Date,
        required: [true, "Birthdate is required"],
        validate: {
            validator: function(value) {
                return value < new Date(); // must be in the past
            },
            message: "Birthdate cannot be in the future"
        }
    },
    course: {
        type: String,
        required: [true, "Course is required"]
    },
    hobbies: {
        type: [String],
        validate: {
            validator: function(arr) {
                return arr.length > 0; // must have at least one hobby
            },
            message: "At least one hobby is required"
        }
    },
    address: {
        type: String,
        required: [true, "Address is required"],
        minlength: [5, "Address must be at least 5 characters"]
    },
    profileImage: {
        type: String,
        default: "" // will be updated when multer uploads
    },
}, { timestamps: true }); // adds createdAt, updatedAt automatically

module.exports = mongoose.model("User", userSchema, "clc_users");
