var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var game_start = false;


$(document).keypress(function(){

    if (game_start === false) {
        $("#level-title").text("Level " + level);
        nextSequence();
        game_start = true;
    }

});

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);


}


$(".btn").click(function(){

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);

});


function checkAnswer(currentLevel){

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function() {nextSequence(); }, 1000);

        }



    }
    else{
        var wrong_audio = new Audio("sounds/wrong.mp3");
        wrong_audio.play();


        //2. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
        $("body").addClass("game-over");
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);

        //3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
        console.log(level);
        console.log(gamePattern);
      }



    }




function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed")
    }, 100);
}

function startOver(){
    level = 0;
    gamePattern = [];
    game_start = false; 

}
