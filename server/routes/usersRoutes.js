const users = require('express').Router();
const usersController = require('../controllers/users.controller');
const authenticate = require('../middlewares/authenticate');

users.get('/', usersController.getAllUsers);
users.post('/', usersController.createUser);
users.get('/:id', usersController.getUser);
users.put('/:id', authenticate, usersController.updateUser);
users.delete('/:id', authenticate, usersController.deleteUser);

users.post('/upload', usersController.multer, usersController.verifyUpload)

module.exports = users;