const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const downloadSchema = new Schema({
    imdbid: { type: String, required: true },
    folder_path: { type: String, required: true },
    complete_path: { type: String, required: true },
    title: { type: String, required: true },
    langue: { type: String, required: true },
    en: { type: String, required: false },
    fr: { type: String, required: false },
    status: { type: String, requested: true},
    date_created: { type: Date, required: true },
    date_last_seen: { type: Date, required: true }
});

module.exports = mongoose.model('Downloads', downloadSchema);