const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
    },
    lastName : {
        type : String,
        default : "",
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        default : "",
    },
    createdAt : {
        type : Number,
        default : Date.now(),
    },
});

mongoose.model("users", UserSchema);