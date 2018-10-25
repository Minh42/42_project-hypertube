const Users = require('../models/users.model');
const Token = require('../models/token.model');

exports.verifyToken = (req, res) => {
    var username = req.param('username');
    var token = req.param('token');

    Users.findOne({"username": username}, (err, user) => {
        if (!user) {
            res.sendStatus(500);
        } else {
            Token.findOne({"userID": user._id}, (err, existingToken) => {
                if (!existingToken) {
                    res.sendStatus(500);
                } else {
                    if (token === existingToken.token)
                        res.redirect('http://localhost:3000/');
                    else 
                        res.sendStatus(500); 
                }
            })
        }
    })
}