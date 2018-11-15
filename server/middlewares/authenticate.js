//const Cookies = require('cookies');
const jwt = require('jsonwebtoken');
const config = require('../data/config/keys');

module.exports = function verifyToken(req, res, next) {
    // retrieve xsrftoken from header's request
    var xsrfToken = req.headers['x-csrf-token'];
    const accessToken = req.cookies['accessToken']
    
    if(accessToken !== undefined && xsrfToken !== undefined) {
        jwt.verify(accessToken, config.jwtSecret, function(err, decoded) {
            if(decoded.xsrf != xsrfToken) {
                res.sendStatus(401);
            } else {
                console.log("authentification ok")
                req.username = decoded.user.username;
                next();
            }
        })
    } else {
        console.log('no here')
        res.sendStatus(403);
    }
}