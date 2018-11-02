const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    name: { type: String, required: "Name is required",  }
})

module.exports = mongoose.model('Movies', movieSchema);