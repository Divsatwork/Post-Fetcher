var express = require('express');
var router = express.Router();

var dbService = require('../services/dbService');

router.get('/', function (req, res, err) {
    res.json({ 'error': 'No such method allowed' });
});

router.post('/', function (req, res, err) {
    console.log('Saving post with text: ' + req.body.text);
    if (req.body.text == undefined) {
        res.json({ 'status': false });
    }
    else {
        dbService.savePost(req, function (returnValue) {
            if (returnValue) {
                res.json({ 'status': true });
            }
            else {
                res.json({ 'status': false });
            }
        });
    }

});

module.exports = router;