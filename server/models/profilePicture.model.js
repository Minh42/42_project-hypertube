const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profilePictureSchema = new Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Users' },
    path: { type: String, required: true },
    date_created: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('ProfilePicture', profilePictureSchema);