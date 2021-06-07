const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reivewSchema = new Schema({
    body: String,
    rating: Number
});

module.exports = mongoose.model("Review", reviewSchema);