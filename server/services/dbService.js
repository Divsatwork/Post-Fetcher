const mongoose = require('mongoose');
const postModel = require('../models/post');
const MONGO_HOSTNAME = '127.0.0.1';
const MONGO_PORT = '27017';
const MONGO_DB = 'jallan';

const url = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

mongoose.connect(url, { useNewUrlParser: true });
const mongoDB = process.env.MONGODB_URI || url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = {
    post_create: function (req, res) {
        let dbPost = new postModel({
            text: req.body.text
        });

        dbPost.save(function (err) {
            if (err) throw new Error('Error while saving post');
            res.json({ 'status': true });
        });
    },
    get_posts: function (req, res) {
        postModel.find({}).then(function (posts) {
            res.send(posts);
        });
    },
    upvote_post: function (req, res) {
        postModel.findByIdAndUpdate(req.body.id, { $inc: { 'upvotes': 1 } }, { upsert: true }, function (err) {
            if (err) throw new Error('Can\'t upvote post');
            // res.json({ 'status': true });
            res.redirect('/');
        })
    }
}