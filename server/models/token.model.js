const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Users' },
    token: { type: String, required: true },
    date_created: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('Token', tokenSchema);