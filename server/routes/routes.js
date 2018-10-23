const express = require('express');
const router = express.Router();

const Users = require('../controllers/users.controller');

router.get('/', (req, res) => {
  res.render('index');
})

console.log(Users)

// get all users
router.get('/api/users', Users.getAllUsers);
// create a new user
router.post('/api/users', Users.createUser);
// get a user by id
router.get('/api/users/:id', Users.getUser);
// update user
router.put('/api/users/:id', Users.updateUser);
// delete user
router.delete('/api/users/:id', Users.deleteUser);

module.exports = router;