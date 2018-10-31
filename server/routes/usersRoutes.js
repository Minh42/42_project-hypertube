const users = require('express').Router();
const usersController = require('../controllers/users.controller');
const authenticate = require('../middlewares/authenticate');

users.get('/', authenticate, usersController.getAllUsers);
users.post('/', usersController.createUser);
users.get('/:id', authenticate, usersController.getUser);
users.put('/:id', authenticate, usersController.updateUser);
users.delete('/:id', authenticate, usersController.deleteUser);

module.exports = users;