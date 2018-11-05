const verification = require('express').Router();
const verificationController = require('../controllers/verification.controller');

const multer  = require('multer')
const uuidv4 = require('uuid/v4');
const path = require('path');

verification.get('/token', verificationController.verifyToken);
verification.post('/sendMessage', verificationController.sendMessage);
verification.post('/changePassword', verificationController.changePassword);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {
      const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
      cb(null, newFilename);
    },
});
  
const upload = multer({ storage });

verification.post('/upload', upload.single('file'), verificationController.verifyUpload)

module.exports = verification;
