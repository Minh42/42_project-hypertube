const movie = require('express').Router();
const movieController = require('../controllers/movie.controller');
const authenticate = require('../middlewares/authenticate');

movie.post('/add', authenticate, movieController.addSeen)
movie.get('/all', authenticate, movieController.getSeen)
module.exports = movie;