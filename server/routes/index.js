const express = require('express');
const router = express.Router();
const usersRouter = require('./usersRoutes');
const verificationRouter = require('./verificationRoutes');
const authRouter = require('./authRoutes');

router.get('/', (req, res) => {
  res.render('index');
})

router.use('/api/users', usersRouter);
router.use('/api/verification', verificationRouter);
router.use('/api/auth', authRouter);

router.post('/api/uploadHandler', (req, res) => {
  console.log('hello')
})

module.exports = router;