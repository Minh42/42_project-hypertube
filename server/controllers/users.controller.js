const Users = require('../models/users.model');
const Token = require('../models/token.model');
const jwt = require('jsonwebtoken');
const keys = require('../data/config/keys');
const fs = require('fs');
const path = require('path');

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
         user: 'matcha.appli@gmail.com',
         pass: 'born2code'
     }
 });
 
exports.getAllUsers = (req, res) => {
    Users.get(function (err, users) {
        if (err)
            res.sendStatus(500);
        else {
            res.status(200).json({
                message: 'Users retrieved successfully',
                data: users
            });   
        }
    });
}

exports.createUser = (req, res) => {
    if (!req.body.path) {
        res.sendStatus(400);
    } else {
        // find existing user by username
        Users.findOne({"username": req.body.values.username}, (err, user) => {
            if (err) 
                res.sendStatus(500);
            if (!user) {
                // find existing user by email
                Users.findOne({ "email": req.body.values.email }, (err, user) => {
                    if (err) {
                        res.sendStatus(500);
                    }
                    if (!user) {
                        //add user info 
                        let data = req.body.values;
                        data['profile_picture'] = req.body.path;
                        let newUser = new Users(data);
                        newUser.save(function(err) { 
                            if (err) {
                                res.sendStatus(500);
                            } else {
                                // clean uploads repo
                                fs.readdir('uploads', (err, files) => {
                                    if (err) throw err;
                                    for (const file of files) {
                                      fs.unlink(path.join('uploads', file), err => {
                                        if (err) throw err;
                                      });
                                    }
                                });
                                // add activation token
                                let activationToken = jwt.sign( { username : req.body.values.username } , keys.jwtSecret)
                                let newToken = new Token({"userID": newUser._id, "activationToken": activationToken});
                                newToken.save(function(err) {
                                    if (err)
                                        res.sendStatus(500);
                                    else {
                                        var mail = {
                                            from: "matcha.appli@gmail.com",
                                            to: req.body.values.email,
                                            subject: "Welcome to Hypertube",
                                            html: '<h3> Hello ' + req.body.values.firstname + '</h3>' +
                                            '<p>To activate your account, please click on the link below.</p>' +
                                            '<p>http://localhost:8080/api/verification/token?userID='+ newUser._id +'&activationToken=' + activationToken + '</p>' +
                                            '<p> --------------- /p>' +
                                            '<p>This is an automatic mail, Please do not reply.</p>'
                                        }            
                                        transporter.sendMail(mail, function (err, info) {
                                            if (err) {
                                                res.sendStatus(500);
                                                console.log('Message sent: ' + info.response);
                                            }
                                        });
                                        res.status(200).json({ message: 'Please check your mailbox' });
                                    }
                                });    
                            }
                        });  
                    } else {
                        res.sendStatus(409);
                    }   
                })
            } else {
                res.sendStatus(409);
            }
        })
    }
}

exports.getUser = (req, res) => {
    const accessToken = req.cookies['accessToken'];
    jwt.verify(accessToken, keys.jwtSecret, function(err, decoded) {
        if (err) {
            res.sendStatus(500);
            return ;  
        } 
        if(decoded.xsrf === req.params.xsrf) {
            Users.findOne({_id :req.params.id}, (err, user) => {
                if (err) {
                    res.sendStatus(500);
                    return ;  
                }
                if (!user) {
                    res.sendStatus(404);    
                } else {
                    fs.readdir('uploads', (err, files) => {
                        if (err) throw err;
                        for (const file of files) {
                          fs.unlink(path.join('uploads', file), err => {
                            if (err) throw err;
                          });
                        }
                    });
                    res.status(200).send({
                        message: 'User retrieved successfully',
                        user: user.toJSON()
                    });  
                }
            })
        } else {
            res.redirect('/');
        }
    })
}

exports.updateUser = (req, res) => {
    var update = {
        firstname: req.body.values.firstname,
        lastname: req.body.values.lastname,
        username: req.body.values.username,
        email: req.body.values.email,
        profile_picture: req.body.path
    }
    Users.findOneAndUpdate({_id :req.params.id}, update, {new: true}, (err, user) => {
        if (err)
            res.sendStatus(500);     
        if (!user) {
            res.sendStatus(404);  
        } else {
            fs.readdir('uploads', (err, files) => {
                if (err) throw err;
                for (const file of files) {
                  fs.unlink(path.join('uploads', file), err => {
                    if (err) throw err;
                  });
                }
            });
            res.status(200).json({ 
                message: 'Your information was updated successfully',
                user: user.toJSON()
            });
        }
    });
}

exports.deleteUser = (req, res) => {
    Users.remove({_id: req.params.id}, (err) => {
        if (err)
            res.sendStatus(500);
        else {
            res.status(200).json({
                message: 'User deleted successfully'
            });
        } 
    });
}