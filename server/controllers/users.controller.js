const Users = require('../models/users.model');

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
    Users.findOne({ "username": req.body.username}, (err, username) => {
        if (err) 
            res.sendStatus(500);
        if (!username) {
            var newUser = new Users(req.body);
            newUser.save(function(err) { 
                if (err) {
                    res.sendStatus(500);
                }
                else {
                    res.status(200).json({
                        message: 'New user created',
                        data: newUser
                    });
                }        
            })
        } else {
            res.sendStatus(409);
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