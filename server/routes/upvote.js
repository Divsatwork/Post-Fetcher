var express = require('express');
var router = express.Router();

var dbService = require('../services/dbService');

router.get('/', function (req, res, err) {
    res.json({ 'error': 'No such method allowed' });
});

router.post('/', function (req, res, err) {
    console.log('Saving upvote for the post with id: ' + req.body._id);
    dbService.upvotePost(req, function (returnValue) {
        if (returnValue)
            res.json({ 'status': true });
        else
            res.json({ 'status': false });
    })
});

module.exports = router;