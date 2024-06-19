const mongoose = require("mongoose");

const User = mongoose.model("users");

const ensureAuth = async (req, res, next) => {
    const {user_id} = req.cookies;
    const user = await User.findById(user_id);
    if(!user){
        return res.redirect("/auth/login");
    }
    next();
}

const ensureGuest = async (req, res, next) => {
    const {user_id} = req.cookies;
    const user = await User.findById(user_id);
    if(user){
        return res.redirect("/user/dashboard");
    }
    next();
}

module.exports = {
    ensureAuth, ensureGuest,
};