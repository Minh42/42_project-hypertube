const passport = require('passport');
const passportConfig = require('../services/passport');
const auth = require('express').Router();

auth.get('/facebook',
  passport.authenticate('facebook', { display: 'popup' }, { scope: ['public_profile', 'email'] })
);

auth.get('/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect : 'http://localhost:3000/homepage',
    failureRedirect : '/'
  })
);

auth.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

auth.get('/google/callback',
  passport.authenticate('google', {
    successRedirect : 'http://localhost:3000/homepage',
    failureRedirect : '/'
  })
)

auth.get('/github',
  passport.authenticate('github', { scope: [ 'user:email' ] })
);

auth.get('/github/callback',
  passport.authenticate('github', {
    successRedirect : 'http://localhost:3000/homepage',
    failureRedirect : '/'
  })
)

auth.get('/42',
  passport.authenticate('42')
);

auth.get('/fortytwo/callback',
  passport.authenticate('42', {
    successRedirect : 'http://localhost:3000/homepage',
    failureRedirect : '/'
  })
)


module.exports = auth;