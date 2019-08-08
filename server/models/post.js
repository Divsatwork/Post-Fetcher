const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let postSchema = new Schema({
    upvotes: { type: Number, default: 0 },
    text: { type: String, required: true },
    creationTime: { type: Date, default: new Date() }
});

module.exports = mongoose.model('DBPost', postSchema);