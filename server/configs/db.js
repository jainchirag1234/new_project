const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        await mongoose.connect('mongodb://localhost:27017/db_internal');
        console.log("Mongoose connected");
    }
    catch(error){
        console.log("Mongoose connection failed ", error);
        exit(0);
    }
};

module.exports = connectDB;