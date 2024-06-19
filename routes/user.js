const {Router} = require("express");
const mongoose = require("mongoose");

const User = mongoose.model("users");
const router = new Router();

const {ensureAuth} = require("../middleware/auth")

router.get("/dashboard", ensureAuth, (req, res) => {
    res.render("dashboard");
})

router.get("/fetch", async (req, res) => {

    try{
        const email = req.query.email;
        const user = await User.findOne({email});
        if(user){
            res.status(200).send(user);
        }
        else{
            res.status(404).send({
                error : `User with email ${email} not found.`,
            });
        }
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            error : "Something went wrong. Try again later.",
        });
    }
})

router.post("/create", async (req, res) => {

    try{
        const user = await User.create({
            ...req.body,
        });
    
        res.status(200).send(user);
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            error : "Something went wrong. Try again later.",
        });
    }
})

router.patch("/update", async (req, res) => {
    
    try{
        const email = req.body.email;
        const user = await User.findOne({email});
        if(user){
            for(key in req.body){
                user[key] = req.body[key];
            }
            await user.save();
            res.status(200).send(user);
        }
        else{
            res.status(404).send({
                error : `User with email ${email} not found.`,
            });
        }
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            error : "Something went wrong. Try again later.",
        });
    }
})

router.delete("/delete", async (req, res) => {
    try{
        const email = req.body.email;
        const deleteResponse = await User.deleteOne({email});
        res.status(200).send(deleteResponse);
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            error : "Something went wrong. Try again later.",
        });
    }
})

module.exports = router;