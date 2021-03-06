
var buttonColors = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(".start").click(function() {
  if (!started) {
    $('#level-title').text("level " + level);
    nextSequence();
    started = true;
    $('#restart').removeClass('appear');
    $('#restart').click(function () {
      startOver()
      $('#level-title').text("level " + level);
      nextSequence();
      started = true;
    });
  }
});

$(".btn").click(function() {

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length-1);
  });

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
} else {
  playSound("wrong");
  $("body").addClass("game-over");
  $("#level-title").text("Game Over")


  setTimeout(function () {
    $("body").removeClass("game-over")
  }, 200);

  startOver();
}
}


  function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level)
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
  }

  function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(() => {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
