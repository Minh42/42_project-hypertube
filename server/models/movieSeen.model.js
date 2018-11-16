const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSeenSchema = new Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Users' },
    imdbid: { type: String, required: true },
    date: { type: Date, required: true }
});

module.exports = mongoose.model('MovieSeen', movieSeenSchema);