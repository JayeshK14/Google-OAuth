const { default: mongoose } = require("mongoose");
const {Router} = require("express");
const {ensureGuest, ensureAuth} = require("../middleware/auth");
const passport = require("passport");

const User = mongoose.model("users");

const router = new Router();

router.get("/login", ensureGuest, (req, res) => {
    res.render("login");
})

router.get("/signup", ensureGuest, (req, res) => {
    res.render("signup");
})

router.post("/signup", async (req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body;

        // Check if user with this email exists or not in the database
        let user = await User.findOne({email});
        if(user){
            // Redirect to login page
            res.status(200).send({});
        }
        
        // Create a new user
        user = User.create({
            firstName,
            lastName,
            email,
            password
        })

        res.status(200).send({});

    } catch (error) {
        res.status(501).send({
            error : "Something went wrong. Try again later."
        })
    }
})

router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;

        // Check if user with this email exists or not in the database
        let user = await User.findOne({email});
        if(user){
            if(password !== user.password){
                res.status(401).send({
                    error : "Login Failed",
                });
            }
            else{
                res.cookie("user_id", user._id).status(200).send({
                    error : "Login Successful",
                });
            }
        }
        else{
            res.status(401).send({
                redirect_url : "/auth/signup",
            });
        }

    } catch (error) {
        res.status(501).send({
            error : "Something went wrong. Try again later."
        })
    }
})

router.get("/logout", (req, res) => {
    res.clearCookie("user_id").redirect("/auth/login");
})

router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"],
}));

router.get("/google/callback", passport.authenticate("google", {
    failureRedirect: "/auth/login",
    successRedirect: "/user/dashboard",
}));

module.exports = router;