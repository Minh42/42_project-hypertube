const Users = require('../models/users.model');
const Token = require('../models/token.model');
const jwt = require('jsonwebtoken');
const keys = require('../data/config/keys');
const fs = require('fs');
const tools = require('../utils/tools.js');
const path = require('path');
const cloudinary = require('cloudinary');
const sharp = require('sharp');

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
         user: 'matcha.appli@gmail.com',
         pass: 'born2code'
     }
 });

exports.verifyToken = (req, res) => {
    var userID = req.param('userID');
    var activationToken = req.param('activationToken');
    var resetToken = req.param('resetToken');

    Token.findOne({ "userID": userID }, (err, existingToken) => {
        if (!existingToken) {
            res.sendStatus(403);
        } else {
            if (activationToken) {
                if (activationToken === existingToken.activationToken) {
                    Users.findOneAndUpdate({"_id": userID} , {$set: {"status": true}})
                        .then(user => {
                            res.redirect('http://localhost:3000/');
                        })
                        .catch(err => {
                            res.sendStatus(403);
                        });
                }
                else {
                    res.sendStatus(403); 
                }
            } else if (resetToken) {
                if (resetToken === existingToken.resetToken)
                    res.redirect('http://localhost:3000/changePassword/' + userID);
                else {
                    res.sendStatus(403); }
            }
        }
    })
}

exports.sendMessage = (req, res) => {
    var email = req.body.email;
    Users.findOne({ "email": email }, (err, user) => {
        if (err) {
            res.sendStatus(500);
        }
        if (!user) {
            res.sendStatus(404);
        } else {
            let resetToken = jwt.sign( { username : user.username } , keys.jwtSecret);
            
            Token.findOneAndUpdate({"userID": user._id}, {$set: {"resetToken": resetToken}}, {new: true}, (err, existingToken) => {
                if (!existingToken) {
                    res.sendStatus(500);
                } else {
                    var mail = {
                        from: "matcha.appli@gmail.com",
                        to: user.email,
                        subject: "Reset your password Hypertube",
                        html: '<h3> Hello ' + user.firstname + '</h3>' +
                        '<p>To reset your password, please click on the link below.</p>' +
                        '<p>http://localhost:8080/api/verification/token?userID='+ user._id +'&resetToken=' + existingToken.resetToken + '</p>' +
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
            })
        }
    })
}

exports.changePassword = (req, res) => {
    console.log(req.body.password)
    console.log(req.body.confirmedNewPassword)
    if (req.body.password === req.body.confirmedNewPassword) {
        Users.findOne({"_id": req.body.user_id}, (err, user) => {
            if (err) {
                res.sendStatus(500);
            }
            if (!user) {
                res.sendStatus(404);
            } else {
                user.password = req.body.password;
                user.save(function(err) { 
                    if (err) 
                        res.sendStatus(500);
                    else {
                        res.status(200).json({ message: 'Your password was updated' });
                    }
                })
            }
        })
    } else {
        res.sendStatus(403);
    }
}

exports.verifyUpload = async (req, res) => {
    if (!req.file) {
        console.log('i came hee')
        res.sendStatus(500);
    }
    await sharp(fs.readFileSync(req.file.path))
        .resize(360, 360)
        .toBuffer(function(err, buffer) {
        fs.writeFile(req.file.path, buffer, function(e) {
        })
    });
    let buffer = fs.readFileSync(req.file.path)
    let mimetype = req.file.mimetype;
    let size = req.file.size;
    if(tools.isValid(buffer, mimetype, size)) {
        async function UploadCloudinaryPhoto(src, basename) {
            cloudinary.config({ 
                cloud_name: keys.CLOUD_NAME, 
                api_key: keys.CLOUDINARY_API_KEY,
                api_secret: keys.CLOUDINARY_API_SECRET
            });
            try {
                const ret = await cloudinary.v2.uploader.upload(src,  {public_id: "hypertube/" + basename});
                if (ret) {
                    res.status(200).json(ret.secure_url);
                }
            } catch (error) {
                console.log('i came hee')
                res.sendStatus(500);
            }
        }
        const src = req.file.path;
        const ext = path.extname(req.file.path);
        const basename = path.basename(req.file.path, ext);
        UploadCloudinaryPhoto(src, basename)
    } else {
        res.sendStatus(404);   
    }
}