const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const monk = require('monk');
const fs = require('fs');
var MongoClient = require('mongodb').MongoClient;

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

function createDatabase(){
	var url = "mongodb://localhost:27017/sms";
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  console.log("Database created!");
	  db.close();
	});
}

function createCollection(){
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";

	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("sms");
	  dbo.createCollection("numbers", function(err, res) {
	    if (err) throw err;
	    console.log("Collection created!");
	    db.close();
	  });
	});
}

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.get('/home', function (req, res) {
	createCollection();
	createDatabase();
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
			res.render('home-tmpl', {
                pageID: 'trivia',
                countDown: calculateHoursToNextGame()
            });
			console.log('number already in database');
		} else {
			code = generateCode();
			console.log(code);
			numbers.insert({ 'number' : storedNum, 'code' : code});
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
			res.render('home-tmpl', {
                pageID: 'trivia',
                countDown: calculateHoursToNextGame()
            });
			console.log('success');
		} else {
			res.render('failToVerify');
		}
	});
});

function calculateHoursToNextGame() {
    var d = new Date();
    var currentTime = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var ten = d.setHours(10,0,0,0);
    var two = d.setHours(14,0,0,0);
    var six = d.setHours(18,0,0,0);
    var countDownTime;
    if (h >= 10 && h < 14) {
        countDownTime = (two - currentTime)/1000;
    } else if (h >= 14 && h < 18) {
        countDownTime = (six - currentTime)/1000;

    } else if (h >= 18 || h < 10) {
        countDownTime = (ten - currentTime)/1000;
    }
    return countDownTime;
}

module.exports = router;
