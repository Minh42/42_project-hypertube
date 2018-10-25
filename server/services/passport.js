// const passport = require('passport');
// const FacebookStrategy = require('passport-facebook').Strategy;
// const TwitterStrategy = require('passport-twitter').Strategy;
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// const Users = require('../models/users.model');
// const keys = require('../db/config/keys');

// passport.serializeUser(function(user, done) {
//     done(null, user[0].user_id); // serialize user_id
// });
   
// passport.deserializeUser(function(id, done) {
//     user.searchByColName("user_id", id).then(function(user) {
//         done(null, user);
//       })
// });
  
// passport.use(new FacebookStrategy({
//     clientID: keys.facebookClientID,
//     clientSecret: keys.facebookClientSecret,
//     callbackURL: '/api/auth/facebook/callback',
//     profileFields: ['id', 'first_name','last_name', 'email'],
//     enableProof: true
//     },
//     function(accessToken, refreshToken, profile, done) {
//         var facebookID = profile._json.id;
//         var firstname = profile._json.first_name;
//         var lastname = profile._json.last_name;
//         var email = profile._json.email;

//         try {
//             user.findOne("fb_id", facebookID).then(function(ret) {
//                 if (ret) {
//                     user.searchByColName("fb_id", facebookID).then(function(user) { 
//                         done(null, user);
//                     })
//                 }
//                 else {
//                     user.addUserFacebook(firstname, lastname, email, facebookID).then(function(ret) {
//                         if (ret) {
//                             user.searchByColName("fb_id", facebookID).then(function(user) {
//                                 done(null, user);
//                             })
//                         }
//                     })
//                 }
//             })
//         }
//         catch(err) {
//             throw new Error(err)
//         } 
//     }
// ));

// // passport.user(new TwitterStrategy({
// //     clientID : keys.twitterClientID,
// //     clientSecret : keys.twitterClientSecret,
// //     callbackURL : '/api/auth/twitter/callback'
// //     },


// // }));

// passport.use(new GoogleStrategy({
//     clientID : keys.googleClientID,
//     clientSecret : keys.googleClientSecret,
//     callbackURL : '/api/auth/google/callback'
//     }, 
//     function(accessToken, refreshToken, profile, done) {
//         var googleID = profile.id;
//         var arrayName = profile.displayName.split(' ');
//         var firstname = arrayName[0];
//         var lastname = arrayName[1];
//         var email = profile.emails[0].value;
//         var username = user.makeid();

//         Users.findOne({"googleID": profile.id}).then(user => {
//             if(user) {
//                 done(null, user);
//             } else {
//                 // new Users({"googleID": profile.id})
//                 console.log('im here')
//             }
//         })


//         // try {
//         //     user.findOne("google_id", googleID).then(function(ret) {
//         //         if (ret) {
//         //             user.searchByColName("google_id", googleID).then(function(user) { 
//         //                 done(null, user);
//         //             })
//         //         }
//         //         else {
//         //             user.addUserGoogle(username, firstname, lastname, email, googleID).then(function(ret) {
//         //                 if (ret) {
//         //                     user.searchByColName("google_id", googleID).then(function(user) {
//         //                         done(null, user);
//         //                     })
//         //                 }
//         //             })
//         //         }
//         //     })
//         // }
//         // catch(err) {
//         //     throw new Error(err)
//         // } 
//     }
// ));