const jwt = require('jsonwebtoken');
const config = require('../data/config/keys');

module.exports = function verifyToken(req, res, next) {
    // retrieve xsrftoken from header's request
    var xsrfToken = req.headers['x-csrf-token'];
    const accessToken = req.cookies['accessToken'];
    console.log('xsrftoken', xsrfToken)
    console.log('accesstoken', accessToken)
    if(accessToken !== undefined && xsrfToken !== undefined) {
        jwt.verify(accessToken, config.jwtSecret, function(err, decoded) {
            if(decoded.xsrf != xsrfToken) {
                res.sendStatus(401);
            } else {
                req.user = decoded.user;
                next();
            }
        })
    } else {
        res.sendStatus(403);
    }
}