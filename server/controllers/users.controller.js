const Users = require('../models/users.model');
const Token = require('../models/token.model');

const jwt = require('jsonwebtoken');
const key = require('../db/config/keys');

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
    Users.findOne({"username": req.body.username}, (err, user) => {
        if (err) 
            res.status(500).json({ message: 'Your informations is invalid' });
        if (!user) {
            Users.findOne({ "email": req.body.email }, (err, user) => {
                if (err) {
                    res.status(500).json({ message: 'Your informations is invalid' });
                }
                if (!user) {
                    var newUser = new Users(req.body);
                    newUser.save(function(err) { 
                        if (err) {
                            res.status(500).json({ message: 'Your informations is invalid' });
                        } else {
                            let token = jwt.sign( { username : req.body.username } , key.jwtSecret)
                            let newToken = new Token({"userID": newUser._id, "token": token});

                            newToken.save(function(err) {
                                if (err) {
                                    res.status(500).json({ message: 'Your informations is invalid' });
                                }
                                else {
                                    var mail = {
                                        from: "matcha.appli@gmail.com",
                                        to: req.body.email,
                                        subject: "Welcome to Hypertube",
                                        html: '<h3> Hello ' + req.body.firstname + '</h3>' +
                                        '<p>To activate your account, please click on the link below.</p>' +
                                        '<p>http://localhost:3000/api/activationMail?login='+ req.body.username +'&token=' + token + '</p>' +
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
                    });  
                } else {
                    res.status(409).json({ message: 'Invalid username or email' });      
                }   
            })
        } else {
            res.status(409).json({ message: 'Invalid username or email' });    
        }
    })
}

exports.getUser = (req, res) => {
    console.log('im here')
}


exports.updateUser = (req, res) => {
    Users.findById({_id :req.params.id}, (err, user) => {
        if (err)
            res.sendStatus(500);     
        if (!user) {
            res.sendStatus(404);  
        } else {
            console.log(user);
            Users.editUser(user);
        }
    })
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