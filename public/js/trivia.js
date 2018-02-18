$(".trivia-question").on("click", function(event) {
    $(event.target).addClass("active");
    console.log(event)
});

var count = countDown;

var counter = setInterval(timer, 1000); //1000 will  run it every 1 second

function timer() {
    count = count - 1;
    if (count <= 0) {
        clearInterval(counter);
        $.get("/game", function(data){
            $("#triviaGame").html(data);
        });

    }
    var hours = Math.floor(count / 3600);
    var minutes = Math.floor((count - (hours * 3600)) / 60);
    var seconds = count - (hours * 3600) - (minutes * 60);
    document.getElementById("trivia").innerHTML = hours + "h " + minutes + "m " + Math.round(seconds) + "s ";
}
