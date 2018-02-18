const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const monk = require('monk');
const fs = require('fs');

const db = monk('localhost:27017/sms');
const numbers = db.get('numbers');

const path = require('path');
var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

const Nexmo = require('nexmo');

let configVars = fs.readFileSync('./config_vars.json');
let obj = JSON.parse(configVars);
const apiKeyVal = obj.apiKey;
const apiSecretVal = obj.apiSecret;
const virtualNumber = obj.virtualNumber;
const testNumber = obj.testNumber;

const nexmo = new Nexmo({
  apiKey: apiKeyVal,
  apiSecret: apiSecretVal
});

var code;
var phoneNumber;
var storedNum;

function generateCode(){
	var num = Math.floor(Math.random()*10000);
	if (num < 1000){
		num *= 10;
	}
	return num;
}

function sendCode(phoneNumber, code){
	nexmo.message.sendSms(
	  virtualNumber, phoneNumber, code,
	    (err, responseData) => {
	      if (err) {
	        console.log(err);
	      } else {
	        console.dir(responseData);
	      }
	    }
	 );
}

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.get('/home', function (req, res) {
	res.render('index');
});

router.post('/number', function (req, res) {
	var number = req.body.number;
	storedNum = number;
	phoneNumber = number;
	var obj = db.collection("numbers").findOne({ 'number' : storedNum}).then(function(token){
		if (token == null)
			return null;
	    else
			return token.number;
	});
	obj.then(function(number){
		if (number == req.body.number){
			res.render('entry')
			console.log('number already in database');
		} else {
			code = generateCode();
			console.log(code);
			numbers.insert({ 'number' : number, 'code' : code});
			sendCode(phoneNumber.toString(), code);
			res.render('verify');
		}
	});
});

router.get('/send', function (req, res) {
	sendCode(phoneNumber, code);
});

router.post('/verify', function (req, res) {
	var obj = db.collection("numbers").findOne({ 'number' : storedNum}).then(function(token){
		return token.code;
	});
	obj.then(function(code){
		if (code == req.body.code){
			res.render('entry')
			console.log('success');
		} else {
			res.render('failToVerify');
		}
	});
});

module.exports = router;