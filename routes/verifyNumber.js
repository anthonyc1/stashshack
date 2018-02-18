const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const monk = require('monk');

var db = monk('localhost:27017/sms');
var numbers = db.get('numbers');

const path = require('path');
var router = express.Router();

var code;

function generateCode(){
	var num = Math.floor(Math.random()*10000);
	if (num < 1000){
		num *= 10;
	}
	return num;
}

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.get('/home', function (req, res) {
	res.render('index');
});

router.post('/number', function (req, res) {
	var number = req.body.number;
	code = generateCode();
	numbers.insert({ 'number' : number, 'code' : code});
	res.render('verify');
});

router.post('/verify', function (req, res) {
	var code = req.body.code;
	obj = numbers.find({ 'number' : number});
});

module.exports = router;