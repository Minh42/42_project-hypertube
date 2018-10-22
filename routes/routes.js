import * as Controllers from './controllers/index';

const express = require('express');
const router = express.Router();

// Load all controllers
Object.keys(Controllers).forEach((key) => {
  console.log(Controllers)
  console.log(key)
	router.use(`/${key}`, Controllers[key])
})

router.get('/', (req, res) => {
  res.render('index');
})

module.exports = router 
