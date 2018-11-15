const Cookies = require('cookies');
const jwt = require('jsonwebtoken');
const config = require('../data/config/keys');

module.exports = function verifyToken(req, res, next) {
    // retrieve xsrftoken from header's request
    var xsrfToken = req.headers['x-csrf-token'];
    var accessToken = new Cookies(req, res).get('accessToken');
    console.log(xsrfToken)
    console.log(accessToken)
    if(accessToken !== undefined && xsrfToken !== undefined) {
        jwt.verify(accessToken, keys.jwtSecret, function(err, decoded) {
            if(decoded.xsrfToken != xsrfToken) {
                console.log('been here')
                res.sendStatus(401);
            } else {
                next();
            }
        })
    } else {
        console.log('no here')
        res.sendStatus(403);
    }
}