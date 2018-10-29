const jwt = require('jsonwebtoken');
const config = require('../db/config/keys');

module.exports = function verifyToken(req, res, next) {
    // retrieve xsrftoken from header's request
    var xsrfToken = req.headers['x-xsrf-token'];
    var accessToken = new Cookies(req, res).get('accessToken');

    if(accessToken && xsrfToken) {
        jwt.verify(accessToken, keys.jwtSecret, function(err, decoded) {
            if(decoded.xsrfToken != xsrfToken) {
                res.sendStatus(403);
            } else {
                next();
            }
        })
    } else {
        res.sendStatus(403);
        next();
    }
}