import express from 'express';
const router = express.Router()
const User = require('../models/users.model')

router.get('/api/users', (req, res) => {

})

router.post('/api/users', (req, res) => {
    User.findOne({ username: req.body.username}), function(err, username) {
        if (err) 
            res.json(err);
        if (!username) {
            
            User.addUser(req.body);             
        } else {
            res.sendStatus(409);
        }
    }
})


router.get('/api/users/id', (req, res) => {
    
})


router.put('/api/users/id', (req, res) => {
    User.findById(req.params.user_id, (err, users) => {
        user.firstname = req.body.username;
    })
})

router.delete('/api/users/id', (req, res) => {
    
})








// router.get('/:id?', (req, res, next) => {
// 	if (req.params.id)
// 		User.findOne(req.params.id, (err, rows) =>
// 		{
// 			(err)
// 			? res.json(err)
// 			: res.json(rows)
// 		})
// 	else
// 		User.findAll(null, null, (err, rows) =>
// 		{
// 			(err)
// 			? res.json(err)
// 			: res.json(rows)
// 		})
// })

// router.post('/', (req, res, next) =>
// {
// 	User.addUser(req.body, (err, count) =>
// 	{
// 		(err)
// 		? res.json(err)
// 		: res.json(count)
// 	})
// })

// router.post('/:id', (req, res, next) =>
// {
// 	User.deleteAll(req.body, (err, count) =>
// 	{
// 		(err)
// 		? res.json(err)
// 		: res.json(count)
// 	})
// })

// router.delete('/:id', (req, res, next) =>
// {
// 	User.deleteUser(req.params.id, (err, count) =>
// 	{
// 		(err)
// 		? res.json(err)
// 		: res.json(count)
// 	})
// })

// router.put('/:id', (req, res, next) =>
// {
// 	User.updateUser(req.params.id, req.body, (err, rows) =>
// 	{
// 		(err)
// 		? res.json(err)
// 		: res.json(rows)
// 	})
// })

export default router;