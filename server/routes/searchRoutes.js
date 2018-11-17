const search = require('express').Router();
const searchController = require('../controllers/search.controller');
const authenticate = require('../middlewares/authenticate');

search.post('/movies', authenticate, searchController.getAllMovies);
search.post('/', authenticate, searchController.getMovies);

module.exports = search;