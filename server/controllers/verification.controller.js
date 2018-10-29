const Users = require('../models/users.model');
const Token = require('../models/token.model');
const jwt = require('jsonwebtoken');
const keys = require('../db/config/keys');

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
         user: 'matcha.appli@gmail.com',
         pass: 'born2code'
     }
 });

exports.verifyTokenActivation = (req, res) => {
    var username = req.param('username');
    var token = req.param('token');

    Users.findOne({"username": username}, (err, user) => {
        if (!user) {
            res.sendStatus(500);
        } else {
            Token.findOne({ "userID": user._id }, (err, existingToken) => {
                if (!existingToken) {
                    res.sendStatus(500);
                } else {
                    if (token === existingToken.activationToken)
                        res.redirect('http://localhost:3000/');
                    else 
                        res.sendStatus(500); 
                }
            })
        }
    })
}

exports.verifyTokenReset = (req, res) => {
    var user_id = req.param('user_id');
    var resetToken = req.param('resetToken');

    Token.findOne({ "userID": user_id }, (err, existingToken) => {
        if (!existingToken) {
            res.sendStatus(500);
        } else {
            if (resetToken === existingToken.resetToken)
                res.redirect('http://localhost:3000/changePassword/' + user_id);
            else 
                res.sendStatus(500); 
        }
    })
}

exports.sendMessageReset = (req, res) => {
    var email = req.body.email;

    Users.findOne({ "email": email }, (err, user) => {
        if (!user) {
            res.sendStatus(500);
        } else {
            user_id = user._id;
            username = user.username;
            firstname = user.firstname;

            let resetToken = jwt.sign( { username : req.body.username } , keys.jwtSecret);

            Token.findOneAndUpdate({"userID": user._id} , {$set: {"resetToken": resetToken}}, {new: true}, (err, token) => {
                if (!user) {
                    res.sendStatus(500);
                } else {
                    var mail = {
                        from: "matcha.appli@gmail.com",
                        to: req.body.email,
                        subject: "Reset your password Hypertube",
                        html: '<h3> Hello ' + firstname + '</h3>' +
                        '<p>To reset your password, please click on the link below.</p>' +
                        '<p>http://localhost:8080/api/verification/tokenReset?user_id='+ user_id +'&resetToken=' + resetToken + '</p>' +
                        '<p> --------------- /p>' +
                        '<p>This is an automatic mail, Please do not reply.</p>'
                      }
                                            
                      transporter.sendMail(mail, function (err, info) {
                        if (err)
                            res.sendStatus(500);
                        console.log('Message sent: ' + info.response);
                      });

                    res.status(200).json({ message: 'Please check your mailbox' });
                }
            })
        }
    })
}

exports.changePassword = (req, res) => {
    console.log(req.body)
    var password = req.body.password;
    var confirmPassword = req.body.password;

    if (password === confirmPassword) {
        
        Users.findOneAndUpdate({"_id": req.body.user_id}, (err, user) => {
            if (err) 
                res.sendStatus(500);
            else {
                
            }
        })
    } else {
        res.sendStatus(500);
    }
}