// import * as Controllers from './controllers';

const express = require('express');
const router = express.Router();

// Load all controllers
// Object.keys(Controllers).forEach((key) => {
// 	router.use(`/${key}`, Controllers[key])
// })

router.get('/', (req, res) => {
  res.render('index');
})

module.exports = router 
