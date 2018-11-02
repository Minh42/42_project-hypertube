const users = require('express').Router();
const usersController = require('../controllers/users.controller');
const authenticate = require('../middlewares/authenticate');

users.get('/', usersController.getAllUsers);
users.post('/', usersController.createUser);
users.get('/:id', usersController.getUser);
users.put('/:id', authenticate, usersController.updateUser);
users.delete('/:id', authenticate, usersController.deleteUser);


const multer  = require('multer')
const uuidv4 = require('uuid/v4');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('here')
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {
      const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
      cb(null, newFilename);
    },
  });
  
  const upload = multer({ storage });

users.post('/upload', upload.single('file'), usersController.verifyUpload)

module.exports = users;