const users = require('express').Router();
const usersController = require('../controllers/users.controller');
const authenticate = require('../middlewares/authenticate');

users.get('/', usersController.getAllUsers);
users.post('/', usersController.createUser);
users.get('/:id', usersController.getUser);
users.put('/:id', usersController.updateUser);
users.delete('/:id', usersController.deleteUser);

module.exports = users;