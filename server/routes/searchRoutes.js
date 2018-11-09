const search = require('express').Router();
const searchController = require('../controllers/search.controller');
const authenticate = require('../middlewares/authenticate');

search.post('/movies', searchController.getAllMovies);
search.post('/', searchController.getMovies);

module.exports = search;