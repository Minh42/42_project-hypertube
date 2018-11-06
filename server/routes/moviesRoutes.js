const movies = require('express').Router();
const moviesController = require('../controllers/movies.controller');
const authenticate = require('../middlewares/authenticate');
const search = require('../services/elasticsearch');

// movies.get('/', authenticate, moviesController.getAllMovies);
// movies.post('/', authenticate, moviesController.createMovie);
// movies.get('/:id', authenticate, moviesController.getMovie);
// movies.put('/:id', authenticate, moviesController.updateMovie);
// movies.delete('/:id', authenticate, moviesController.deleteMovie);

movies.get('/search', async (ctx, next) => {
    const { term, offset } = ctx.request.query
    ctx.body = await search.queryTerm(term, offset)
  }
)

module.exports = movies;