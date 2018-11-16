//const Cookies = require('cookies');
const jwt = require('jsonwebtoken');
const config = require('../data/config/keys');

module.exports = function verifyToken(req, res, next) {
    // retrieve xsrftoken from header's request
    var xsrfToken = req.headers['x-csrf-token'];
    const accessToken = req.cookies['accessToken']
    
    console.log("ACCESS TOKEN", accessToken)
    console.log("XSRF TOKEN", xsrfToken)
    if(accessToken !== undefined && xsrfToken !== undefined) {
        jwt.verify(accessToken, config.jwtSecret, function(err, decoded) {
            if(decoded.xsrf != xsrfToken) {
                res.sendStatus(401);
            } else {
                console.log("authentification ok", decoded.user)
                req.username = decoded.user.username;
                req.id = decoded.user._id;
                next();
            }
        })
    } else {
        console.log('no here')
        res.sendStatus(403);
    }
}