const mongoose = require('mongoose');

const uri = "mongodb://localhost:27017/bookstore";

const connectDB = async () => {
    mongoose.connect(uri)
    await console.log("Connected to MongoDB successfully");
}
module.exports = connectDB;