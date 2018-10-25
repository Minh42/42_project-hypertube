const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const Users = require('../models/users.model');
const keys = require('../db/config/keys');
const tools = require('../../src/utils/tools.js');

passport.serializeUser((user, done) => {
    done(null, user.id); 
});
   
passport.deserializeUser((id, done) => {
    Users.findById(id).then(user => {
        done(null, user);
    });
});
  
passport.use(new FacebookStrategy({
    clientID: keys.facebookClientID,
    clientSecret: keys.facebookClientSecret,
    callbackURL: '/api/auth/facebook/callback',
    profileFields: ['id', 'first_name','last_name', 'email'],
    enableProof: true
    },
    function(accessToken, refreshToken, profile, done) {
        var firstname = profile._json.first_name;
        var lastname = profile._json.last_name;
        var email = profile._json.email;

        Users.findOne({"facebookID": profile._json.id}).then(user => {
            if(user) {
                done(null, user);
            } else {
                Users.findOne({"email": email}).then(user => {
                    if (user) {
                        new Users({"facebookID": profile._json.id})
                            .save()
                            .then(user => done(null, user));
                    } else {
                        new Users({ "firstname": firstname, "lastname": lastname, "username": firstname + tools.getRandomArbitrary(0, 1000), "email": email, "facebookID": profile._json.id})
                        .save()
                        .then(user => done(null, user));
                    }
                })
            }
        })
    }
));

// // passport.user(new TwitterStrategy({
// //     clientID : keys.twitterClientID,
// //     clientSecret : keys.twitterClientSecret,
// //     callbackURL : '/api/auth/twitter/callback'
// //     },


// // }));

passport.use(new GoogleStrategy({
    clientID : keys.googleClientID,
    clientSecret : keys.googleClientSecret,
    callbackURL : '/api/auth/google/callback'
    }, 
    function(accessToken, refreshToken, profile, done) {
        var arrayName = profile.displayName.split(' ');
        var firstname = arrayName[0];
        var lastname = arrayName[1];
        var email = profile.emails[0].value;

        Users.findOne({"googleID": profile.id}).then(user => {
            if(user) {
                done(null, user);
            } else {
                Users.findOne({"email": email}).then(user => {
                    if (user) {
                        new Users({"googleID": profile.id})
                            .save()
                            .then(user => done(null, user));
                    } else {
                        new Users({ "firstname": firstname, "lastname": lastname, "username": firstname + 42, "email": email, "googleID": profile.id})
                        .save()
                        .then(user => done(null, user));
                    }
                })
            }
        })
    }
));
