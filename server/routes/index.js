const express = require('express');
const router = express.Router();
const usersRouter = require('./usersRoutes');
const authRouter = require('./authRoutes');

router.get('/', (req, res) => {
  res.render('index');
})

router.use('/api/users', usersRouter);
router.use('/api/auth', authRouter);

module.exports = router;