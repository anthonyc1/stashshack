const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
var port = process.env.PORT || 3003;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get('/raffle', function (req, res) {
	res.render('entry');
});

app.post('/raffle', function (req, res) {
	const number = req.body.number;
	if (number >= 0 && number <= 1000){
		res.render('submitted', {number: number});
	} else{
		res.render('error', {number: number});
	}
});

app.listen(port, function() {
	console.log('Listening on port ' + port);
})