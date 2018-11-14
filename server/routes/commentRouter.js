const comment = require('express').Router();
const commentController = require('../controllers/comment.controller');
const authenticate = require('../middlewares/authenticate');

comment.post('/add', commentController.comment)
comment.post('/all', commentController.allComment)
module.exports = comment;