 var count = countDown;
 var countRound = 10;
 var game = 0;
var counterRoundTimer;

 var counter = setInterval(timer, 1000); //1000 will  run it every 1 second

 function timer() {
     count = count - 1;
     if (count <= 0) {
         clearInterval(counter);
         $.get("/game", function(data) {
             $("#triviaBody").html(data);
             $("#triviaHeader").html("Trivia!");
             counterRoundTimer = setInterval(countdownRound, 1000);
             $('#triviaBody').bind("click tap", move);
             game++;
         });

     }
     var hours = Math.floor(count / 3600);
     var minutes = Math.floor((count - (hours * 3600)) / 60);
     var seconds = count - (hours * 3600) - (minutes * 60);
     $(document).find('#triviaHeader').html(hours + "h " + minutes + "m " + Math.round(seconds) + "s ");
 }

 function countdownRound() {
     countRound = countRound - 1;
     if (countRound <= 0) {
         clearInterval(counterRoundTimer);
         $.get("/nextGame?=game", function(data) {
             game++;
             $("#triviaGame").html(data);
             $('#triviaGame').bind("click tap", move);
             countRound = 10;
             counterRoundTimer = setInterval(countdownRound, 1000);
         });

     }
     var hours = Math.floor(countRound / 3600);
     var minutes = Math.floor((countRound - (hours * 3600)) / 60);
     var seconds = countRound - (hours * 3600) - (minutes * 60);
     $(document).find('#gameCountdown').html(Math.round(seconds) + "s ");
 }


 $("#submitButton").on("click tap", function() {
     var val = $("#inputNumber").val();
     number = {
         number: val
     }
     if (val >= 0 && val <= 1000) {
         $.post("/raffle", {
             number: val
         }, function(response) {
             $("#numbersBody").html(response);
         });
     } else {
         $("#error").html("Your entry " + val + " is out of range or invalid. Please try again.")
         $("#error").fadeOut(10);
         $("#inputPassword").removeClass("password-margin")
         $("#error").fadeIn(100);
     }
 });

 function move() {
     if ($(event.path[0]).hasClass("trivia-question")) {
         $(event.path[0]).addClass("active");
         $('#triviaGame').unbind("click tap");
     }
 }
