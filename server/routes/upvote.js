var express = require('express');
var router = express.Router();

var dbService = require('../services/dbService');

router.get('/', function (req, res, err) {
    res.json({ 'error': 'No such method allowed' });
});

router.post('/', function (req, res, err) {
    console.log('Saving upvote for the post with id: ' + req.body.id);
    if (req.body.id == undefined) {
        res.json({ 'status': false });
    }
    else {
        dbService.upvote_post(req, res);
    }
});

module.exports = router;