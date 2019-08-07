var express = require('express');
var router = express.Router();

var dbService = require('../services/dbService');

router.get('/', function (req, res, err) {
    console.log('Received request for home page');
    var temp = dbService.getPosts;
    res.send(temp);
});

module.exports = router;