const User = require('../models/users.model')

exports.getAllUsers = (req, res) => {
    User.get(function (err, users) {
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
    User.findOne({ username: req.body.username}), (err, username) => {
        if (err) 
            res.sendStatus(500);
        if (!username) {
            User.addUser(req.body);             
        } else {
            res.sendStatus(409);
        }
    }
}

exports.getUser = (req, res) => {
    
}


exports.updateUser = (req, res) => {
    User.findById({_id :req.params.id}, (err, user) => {
        if (err)
            res.sendStatus(500);     
        if (!user) {
            res.sendStatus(404);  
        } else {
            console.log(user);
            User.editUser(user);
        }
    })
}

exports.deleteUser = (req, res) => {
    User.remove({_id: req.params.id}, (err) => {
        if (err)
            res.sendStatus(500);
        else {
            res.status(200).json({
                message: 'User deleted successfully'
            });
        } 
    });
}