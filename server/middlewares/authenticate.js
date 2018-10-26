const jwt = require('jsonwebtoken');
const config = require('../../server/config/keys');

module.exports = function verifyToken(req, res, next) {
    console.log(req)
    // if (req.user) {
    //     req.currentUser = [req.user[0]];
    //     next();
    // } else {
    //     const authorizationHeader = req.headers.authorization;
    //     let token;
    //     if (authorizationHeader) {
    //         token = authorizationHeader.split(' ')[1];
    //     }
    //     if (token) {
    //         jwt.verify(token, config.jwtSecret, (err, decoded) => {
    //             if (err) {
    //                 req.currentUser = null;
    //                 // res.status(401).json({ error: 'Failed to authenticate' })
    //                 next();
    //             } else {
    //                 req.currentUser = decoded.user;
    //                 next();
    //             }
    //         });
    //     } else {
    //         req.currentUser = null;
    //         // res.status(403).json({
    //         //     error: 'No token provided'
    //         // });
    //         next();
    //     }
    // }
}