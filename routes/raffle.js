const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

const path = require('path');
var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.get('/raffle', function (req, res) {
	res.render('entry');
});

router.post('/raffle', function (req, res) {
	var number = req.body.number;
	if (number >= 0 && number <= 1000){
		res.render('submitted', {number: number});
	} else{
		res.render('error', {number: number});
	}
});

module.exports = router;