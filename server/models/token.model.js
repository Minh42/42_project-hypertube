const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Users' },
    activationToken: { type: String, required: true },
    resetToken: { type: String },
    date_created: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('Token', tokenSchema);