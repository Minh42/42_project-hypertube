const passport = require('passport');
const passportConfig = require('../services/passport');
const auth = require('express').Router();

auth.get('/facebook',
  passport.authenticate('facebook', { display: 'popup' }, { scope: ['public_profile', 'email'] })
);

auth.get('/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect : '/homepage',
    failureRedirect : '/'
  })
);

auth.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

auth.get('/google/callback',
  passport.authenticate('google', {
    successRedirect : '/homepage',
    failureRedirect : '/'
  })
)

module.exports = auth;