const verification = require('express').Router();
const verificationController = require('../controllers/verification.controller');

verification.get('/token', verificationController.verifyToken);
verification.post('/sendMessage', verificationController.sendMessage);
verification.post('/changePassword', verificationController.changePassword);

module.exports = verification;
