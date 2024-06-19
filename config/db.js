const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(
            "mongodb+srv://Jayesh141003:Jayesh141003@cluster0.leejhla.mongodb.net/?retryWrites=true&w=majority&appName=TestDatabase"
        );
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }
    catch(error){
        console.log("Something went wrong while connecting to database.");
    }
};

module.exports = connectDB;