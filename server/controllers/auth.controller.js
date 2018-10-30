const passport = require('passport');
const Cookies = require('cookies');
const passportConfig = require('../services/passport');
const Users = require('../models/users.model');
const io = require('../server').io;

exports.local = (req, res) => {
    passport.authenticate('local', (err, user, info) => {
        if (err || !user) {
            return res.status(401).json({
                message: info.message
            });
        } else {
            // Double security auth with jwt and http only cookies
            const token = user.createJwtToken(user);
            new Cookies(req, res).set('accessToken', token['jwtToken'], { httpOnly: true });
            res.status(200).json({ 
                xsrfToken : token['xsrfToken'],
                user: user.toJSON()
            });
        }
    })(req, res);
}

exports.facebook = (req, res) => {
    passport.authenticate('facebook', { failureRedirect: '/' }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({
                message: 'Please check your Facebook credentials'
            });
        } else {
            const token = user.createJwtToken(user);
            const xsrfToken = token['xsrfToken'];
            new Cookies(req,res).set('accessToken', token['jwtToken'], { httpOnly: true });
            // res.status(200).json({ 
            //     xsrfToken : token['xsrfToken'],
            //     user: user.toJSON()
            // });
            // res.redirect(`http://localhost:3000/homepage?accessToken=${xsrfToken}`);
            console.log(io)
            io.sockets.on('connection', function (socket) {
                io.emit('authChecked', {xsrfToken : xsrfToken, user: user.toJSON()});
            })
        }
    })(req, res);
}

exports.google = (req, res) => {


}

exports.twitter = (req, res) => {


}

exports.linkedin = (req, res) => {


}

exports.github = (req, res) => {


}

exports.fortytwo = (req, res) => {


}

exports.logout = (req, res) => {
    new Cookies(req,res).set('accessToken');
    req.logout();
}