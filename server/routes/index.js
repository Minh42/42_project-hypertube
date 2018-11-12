const express = require('express');
const router = express.Router();
const usersRouter = require('./usersRoutes');
const verificationRouter = require('./verificationRoutes');
const authRouter = require('./authRoutes');
const downloadRouter = require('./downloadRoute');

router.get('/', (req, res) => {
  res.render('index');
})

router.use('/api/users', usersRouter);
router.use('/api/verification', verificationRouter);
router.use('/api/auth', authRouter);
// router.use('/api/search', searchRouter);
router.use('/api/download', downloadRouter);

module.exports = router;