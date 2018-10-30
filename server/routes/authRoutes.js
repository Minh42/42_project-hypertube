const auth = require('express').Router();
const passport = require('passport');
const authController = require('../controllers/auth.controller');

auth.post('/signin', authController.local);
auth.get('/facebook', passport.authenticate('facebook', { session: false }, { display: 'popup' }, { scope: ['public_profile', 'email'] }));
auth.get('/facebook/callback', authController.facebook);
// auth.get('/google', passport.authenticate('google', { session: false }, { scope: ['profile', 'email'] }));
// auth.get('/google/callback', authController.google);
// auth.get('/twitter', passport.authenticate('twitter', { session: false }));
// auth.get('/twitter/callback', authController.twitter);
// auth.get('/linkedin', passport.authenticate('linkedin', { session: false }, { scope: ['r_basicprofile', 'r_emailaddress'] }));
// auth.get('/linkedin/callback', authController.linkedin);
// auth.get('/github', passport.authenticate('github', { session: false }, { scope: [ 'user:email' ] }));
// auth.get('/github/callback', authController.github);
// auth.get('/fortytwo', passport.authenticate('fortytwo', { session: false }));
// auth.get('/fortytwo/callback', authController.fortytwo);
auth.get('/logout', authController.logout);

module.exports = auth;