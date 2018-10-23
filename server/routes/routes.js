const Users = require('../controllers/users.controller');

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
})

router.get('/api/users', Users.getAllUsers);
router.post('/api/users', Users.createUser);
router.get('/api/users/:id', Users.getUser)
router.put('/api/users/:id', Users.updateUser);
router.delete('/api/users/:id', Users.deleteUser);

module.exports = router;