const verification = require('express').Router();
const verificationController = require('../controllers/verification.controller');

verification.get('/token', verificationController.verifyToken);

module.exports = verification;