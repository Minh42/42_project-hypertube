import express from 'express';
const router = express.Router()
const User = require('../models/users.model')

router.get('/api/users', (req, res) => {
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
})

router.post('/api/users', (req, res) => {
    User.findOne({ username: req.body.username}), (err, username) => {
        if (err) 
            res.sendStatus(500);
        if (!username) {
            User.addUser(req.body);             
        } else {
            res.sendStatus(409);
        }
    }
})

router.get('/api/users/id', (req, res) => {
    
})


router.put('/api/users/:id', (req, res) => {
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
})

router.delete('/api/users/id', (req, res) => {
    User.remove({_id: req.params.id}, (err) => {
        if (err)
            res.sendStatus(500);
        else {
            res.status(200).json({
                message: 'User deleted successfully'
            });
        } 
    });
})

export default router;