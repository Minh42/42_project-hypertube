const picture = require('express').Router();
const pictureController = require('../controllers/picture.controller');
const authenticate = require('../middlewares/authenticate');

picture.post('/', authenticate, pictureController.getPicture)

module.exports = picture;