const verification = require('express').Router();
const verificationController = require('../controllers/verification.controller');

verification.get('/token', verificationController.verifyTokenActivation);
verification.get('/tokenReset', verificationController.verifyTokenReset);
verification.post('/sendMessageReset', verificationController.sendMessageReset)

module.exports = verification;
