const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSeenSchema = new Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Users' },
    imdbid: { type: String, required: true },
    date: { type: Date, required: true }
});

movieSeenSchema.index({ userID: 1, imdbid: 1 }, { unique: true });
module.exports = mongoose.model('MovieSeen', movieSeenSchema);