const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

const path = require('path');
var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.get('/home', function (req, res) {
	res.render('index');
});

router.post('/number', function (req, res) {
	res.render('verify');
});

// router.post('/verify', function (req, res) {
// 	res.render('index');
// });

router.post('/verify', function (req, res) {
	var number = req.body.code;
	
});

module.exports = router;