var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


router.get('/game', function(request, response) {
    response.send('<div class="card" style="width: 18rem;">'+
        '<div class="card-body">' +
            '<h5 class="card-title">What kind of animal is Tarantula Hawk? </h5>'+
            '<ul class="list-group">'+
                '<li class="list-group-item trivia-question" onselectstart="return false">Spider</li>'+
                '<li class="list-group-item trivia-question" onselectstart="return false">Wasp</li>'+
                '<li class="list-group-item trivia-question" onselectstart="return false">Hawk</li>'+
            '</ul>'+
        '</div>'+
    '</div>');
});


router.get('/timer', function(request, response) {
    calculateHoursToNextGame();
    response.render('home-tmpl', {
        pageID: 'trivia',
        countDown: calculateHoursToNextGame()
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



router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));

module.exports = router;
