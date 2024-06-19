const mongoose = require("mongoose");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = mongoose.model("users");

passport.use(
    new GoogleStrategy(
        {
            
            callbackURL: "/auth/google/callback",
            proxy: true,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails[0].value;

                const existingUser = await User.findOne({email});
                if(existingUser){
                    return done(null, existingUser);
                }

                const user = await User.create({
                    email,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                });

                done(null, user);
                
            } catch (error) {
                console.log(error);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId)
    .then((user) => {
        done(null, user);
    })
    .catch((err) => done(err));
});