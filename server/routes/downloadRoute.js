const download = require('express').Router();
const downloadController = require('../controllers/download.controller');
const authenticate = require('../middlewares/authenticate');

download.post('/torrent', downloadController.torrent)
module.exports = download;