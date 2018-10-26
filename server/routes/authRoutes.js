const passport = require('passport');
const jwt = require('jsonwebtoken');
const Cookies = require('cookies');
const uid = require('uid-safe');
const passportConfig = require('../services/passport');
const keys = require('../db/config/keys');
const auth = require('express').Router();

// Double security auth with jwt and http only cookies

auth.post('/signin', function(req, res) {
  passport.authenticate('local', (err, user, info) => {
    if (err || !user) {
      return res.status(401).json({
        message: info.message
      });
    } else {
      var token = new Array();
      token['classicToken'] = jwt.sign(JSON.parse(JSON.stringify(user)), keys.jwtSecret, {
        expiresIn: 604800
      });
      token['xsrfToken'] = uid.sync(18); // generate random token

      var jwt_token = jwt.sign({token: token}, keys.jwtSecret, {
        expiresIn: 604800 // expires in 2 days
      });
      
      new Cookies(req,res).set('access_token', jwt_token, {
          httpOnly: true,
          // secure: true
      });

      res.status(200).json({
          xsrfToken : token.xsrfToken
      });
    }
  })(req, res);
});



// router.post('/login', function (req, res) {
//   passport.authenticate('local', {session: false}, (err, user) => {
//       if (err || !user) {
//           return res.status(400).json({
//               message: 'Something is not right',
//               user   : user
//           });
//       }
//      req.login(user, {session: false}, (err) => {
//          if (err) {
//              res.send(err);
//          }
//          // generate a signed son web token with the contents of user object and return it in the response
//          const token = jwt.sign(user, 'your_jwt_secret');
//          return res.json({user, token});
//       });
//   })(req, res);
// });


auth.get('/facebook',
  passport.authenticate('facebook', { display: 'popup' }, { scope: ['public_profile', 'email'] })
);

auth.get('/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect : 'http://localhost:3000/homepage',
    failureRedirect : '/'
  })
);

auth.get('/twitter',
  passport.authenticate('twitter')
);

auth.get('/twitter/callback',
  passport.authenticate('twitter', {
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

auth.get('/linkedin',
  passport.authenticate('linkedin', { scope: ['r_basicprofile', 'r_emailaddress'] })
);

auth.get('/linkedin/callback',
  passport.authenticate('linkedin', {
    successRedirect : 'http://localhost:3000/homepage',
    failureRedirect : '/'
  })
);

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