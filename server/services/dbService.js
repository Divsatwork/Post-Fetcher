var mongo = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const db_name = "jallan";
const collection_name = "posts";

var post_db_model = require('../models/post');

function save_post(data, callback) {

    var post_entity = new post_db_model({ 'text': data.body.text, upvotes: 0, creationTime: new Date() });

    mongo.connect(url, function (err, db) {
        if (err) throw new Error('Error occurred while saving post details in database');
        var dbo = db.db(db_name);
        dbo.collection(collection_name).insertOne(post_entity, function (err, res) {
            if (err) throw new Error('Couldn\'t save the details');
            console.log('Successfully saved a new post!');
            db.close();
            callback(true);
        });
    });
}

function upvote_post(post_data, callback) {
    mongo.connect(url, function (err, db) {
        if (err) throw new Error('Error occurred while fetching post details in database');
        var dbo = db.db(db_name);
        dbo.collection(collection_name).findOne({ '_id': post_data.body._id }, function (err, item) {
            if (err) throw new Error('Couldn\'t fetch the details');
            if (item == null) {
                callback(false);
                db.close();
            }
            else {
                item.upvotes += 1;
                callback(true);
                db.close();
            }
        });
    });
    collection.findOne({ mykey: 1 }, function (err, item) { });
}

function get_posts() {
    posts = []
    mongo.connect(url, function (err, db) {
        if (err) throw new Error('Error with db');
        var dbo = db.db(db_name);
        var stream = dbo.collection(collection_name).find().stream();
        stream.on('data', function (item) {
            posts.push(item);
        });
        stream.on('end', function () {
            return posts;
        })
    })
    return posts;
}

module.exports = {
    getPosts: get_posts(),
    savePost: function (data, callback) {
        save_post(data, callback);
    },
    upvotePost: function (data, callback) {
        upvote_post(data, callback);
    }
}