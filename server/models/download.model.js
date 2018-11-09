const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const downloadSchema = new Schema({
    imdbid: { type: String, required: true },
    folder_path: { type: String, required: true },
    complete_path: { type: String, required: true },
    title: { type: String, required: true },
    langue: { type: String, required: true },
    status: { type: String, requested: true},
    date_created: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('Downloads', downloadSchema);