const passport = require('passport');
const Cookies = require('cookies');
const passportConfig = require('../services/passport');
const Users = require('../models/users.model');

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
                user: user._id
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
            res.redirect('http://localhost:3000?xsrfToken=' + xsrfToken + '&userID=' + user._id)
        }
    })(req, res);
}

exports.google = (req, res) => {
    passport.authenticate('google', { failureRedirect: '/' }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({
                message: 'Please check your Google credentials'
            });
        } else {
            const token = user.createJwtToken(user);
            const xsrfToken = token['xsrfToken'];
            new Cookies(req,res).set('accessToken', token['jwtToken'], { httpOnly: true });
            res.redirect('http://localhost:3000?xsrfToken=' + xsrfToken + '&userID=' + user._id)
        }
    })(req, res);
}

exports.twitter = (req, res) => {
    passport.authenticate('twitter', { failureRedirect: '/' }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({
                message: 'Please check your Twitter credentials'
            });
        } else {
            const token = user.createJwtToken(user);
            const xsrfToken = token['xsrfToken'];
            new Cookies(req,res).set('accessToken', token['jwtToken'], { httpOnly: true });
            res.redirect('http://localhost:3000?xsrfToken=' + xsrfToken + '&userID=' + user._id)
        }
    })(req, res);
}

exports.linkedin = (req, res) => {
    passport.authenticate('linkedin', { failureRedirect: '/' }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({
                message: 'Please check your Linkedin credentials'
            });
        } else {
            const token = user.createJwtToken(user);
            const xsrfToken = token['xsrfToken'];
            new Cookies(req,res).set('accessToken', token['jwtToken'], { httpOnly: true });
            res.redirect('http://localhost:3000?xsrfToken=' + xsrfToken + '&userID=' + user._id)
        }
    })(req, res);
}

exports.github = (req, res) => {
    passport.authenticate('github', { failureRedirect: '/' }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({
                message: 'Please check your Github credentials'
            });
        } else {
            const token = user.createJwtToken(user);
            const xsrfToken = token['xsrfToken'];
            new Cookies(req,res).set('accessToken', token['jwtToken'], { httpOnly: true });
            res.redirect('http://localhost:3000?xsrfToken=' + xsrfToken + '&userID=' + user._id)
        }
    })(req, res);
}

exports.fortytwo = (req, res) => {
    passport.authenticate('fortytwo', { failureRedirect: '/' }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({
                message: 'Please check your 42 credentials'
            });
        } else {
            console.log('been there')
            const token = user.createJwtToken(user);
            const xsrfToken = token['xsrfToken'];
            new Cookies(req,res).set('accessToken', token['jwtToken'], { httpOnly: true });
            res.redirect('http://localhost:3000?xsrfToken=' + xsrfToken + '&userID=' + user._id)
        }
    })(req, res);
}

exports.logout = (req, res) => {
    new Cookies(req,res).set('accessToken');
    req.logout();
}