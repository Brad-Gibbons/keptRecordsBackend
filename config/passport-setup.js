const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const User = require('../models/userModel')

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user)
    });
});



passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL:'/auth/google/redirect',
    }, (accessToken, refreshToken, profile, done) => {
        //passport cb
        // check if user exists
        User.findOne({googleID: profile.id}).then((currentUser) => {
            if(currentUser){
                // user exists 
                console.log('User is: ' + currentUser);
                done(null ,currentUser)
            } else {
                //new user
                new User({
                    username: profile.displayName,
                    googleID: profile.id
                }).save().then((newUser) => {
                    console.log('new user created', + newUser);
                    done(null, newUser);
                })
            }
        })
    })
);
