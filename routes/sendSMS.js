const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

var router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

const Nexmo = require('nexmo');

let configVars = fs.readFileSync('./config_vars.json');
let obj = JSON.parse(configVars);
const apiKeyVal = obj.apiKey;
const apiSecretVal = obj.apiSecret;
const virtualNumber = obj.virtualNumber;

const nexmo = new Nexmo({
  apiKey: apiKeyVal,
  apiSecret: apiSecretVal
});

router.get('/send', function (req, res) {
	nexmo.message.sendSms(
	  virtualNumber, '13474797101', 'yo',
	    (err, responseData) => {
	      if (err) {
	        console.log(err);
	      } else {
	        console.dir(responseData);
	      }
	    }
	 );
});

module.exports = router;