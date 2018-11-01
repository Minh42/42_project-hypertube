const movies = require('express').Router();
const moviesController = require('../controllers/movies.controller');
const authenticate = require('../middlewares/authenticate');

movies.get('/', authenticate, moviesController.getAllMovies);
// movies.post('/', authenticate, moviesController.createMovie);
// movies.get('/:id', authenticate, moviesController.getMovie);
// movies.put('/:id', authenticate, moviesController.updateMovie);
// movies.delete('/:id', authenticate, moviesController.deleteMovie);

module.exports = movies;