const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    imdbid: { type: String, required: true },
    id: {type: String, required: true },
    username: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, required: true }
});

module.exports = mongoose.model('Comments', commentSchema);