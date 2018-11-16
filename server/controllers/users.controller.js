const Users = require('../models/users.model');
const Token = require('../models/token.model');
const ProfilePicture = require('../models/profilePicture.model');
const jwt = require('jsonwebtoken');
const keys = require('../data/config/keys');

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
        Users.findOne({"username": req.body.values.username}, (err, user) => {
            if (err) 
                res.sendStatus(500);
            if (!user) {
                Users.findOne({ "email": req.body.values.email }, (err, user) => {
                    if (err) {
                        res.sendStatus(500);
                    }
                    if (!user) {
                        //add info users (users model)
                        var newUser = new Users(req.body.values);
                        newUser.save(function(err) { 
                            if (err) {
                                res.sendStatus(500);
                            } else {
                                // add profile picture (profilePicture model)
                                var profilePicture = new ProfilePicture({"userID": newUser._id, "path": req.body.path});
                                profilePicture.save(function(err) {
                                    if (err) {
                                        res.sendStatus(500);
                                    } else {
                                        // add token (token model)
                                        let activationToken = jwt.sign( { username : req.body.values.username } , keys.jwtSecret)
                                        let newToken = new Token({"userID": newUser._id, "activationToken": activationToken});
                                        newToken.save(function(err) {
                                            if (err) {
                                                res.sendStatus(500);
                                            }
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
                                                    if (err)
                                                        res.sendStatus(500);
                                                    console.log('Message sent: ' + info.response);
                                                });
            
                                                res.status(200).json({ message: 'Please check your mailbox' });
                                            }
                                        });
                                    }
                                })
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
            console.log(err)
            res.sendStatus(500);
            return ;  
        } 
        if(decoded.xsrf === req.params.xsrf) {
            Users.findOne({_id :req.params.id}, (err, user) => {
                if (err) {
                    console.log(err)
                    res.sendStatus(500);
                    return ;  
                }
                if (!user) {
                    res.sendStatus(404);    
                } else {
                    console.log('here')
                    console.log(user)
                    // Picture.findOne({"userID" :req.body.id}, (err, picture) => {
                    //     if (err) {
                    //         console.log(err)
                    //         res.sendStatus(500);
                    //         return ;  
                    //     }
                    //     if (!picture) {
                    //         res.sendStatus(404);    
                    //     } else {
                            res.status(200).json({
                                message: 'User retrieved successfully',
                                user: user.toJSON()
                            });
                        // }
                    // })
                }
            })
        } else {
            res.redirect('/');
        }
    })
}

exports.updateUser = (req, res) => {
    var update = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
    }

    Users.findOneAndUpdate({_id :req.params.id}, update, {new: true}, (err, user) => {
        if (err)
            res.sendStatus(500);     
        if (!user) {
            res.sendStatus(404);  
        } else {
            res.status(200).json({ 
                message: 'Your information was updated successfully' 
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

// exports.pictureUser = (req, res) => {
//     console.log(res)
//     Users.findOne({_id :req.params.id}, (err, user) => {
//         if (err) {
//             res.sendStatus(500);  
//         }
//         if (!user) {
//             res.sendStatus(404);    
//         } else {
//             res.status(200).json({
//                 message: 'User retrieved successfully',
//                 user: user.toJSON()
//             });
//         }
//     })
// }