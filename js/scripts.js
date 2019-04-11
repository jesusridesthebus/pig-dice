function Player() {
  this.diceRoll = 0,  //last rolled die
  this.turnScore = 0, //current score for turn
  this.totalScore = 0 //total score for all turns
}

Player.prototype.hold = function() {
  this.totalScore += this.turnScore;
  this.turnScore = 0;
  this.diceRoll = 0;
  myGame.playerTwoTurn = !myGame.playerTwoTurn;
}

Player.prototype.rollDice = function() {
  var roll = Math.floor(Math.random()*6) + 1;
  this.diceRoll = roll;
  if (roll === 1) {
    this.turnScore = 0;
    myGame.playerTwoTurn = !myGame.playerTwoTurn;
  } else {

    this.turnScore += roll;
    this.totalScore += this.turnScore;
  }
}

function Game() {
  this.playerTwoTurn = false;
  this.players = [];
}

Game.prototype.getCurrentPlayer = function() {
  if (this.playerTwoTurn === true ) {
  return this.players[1]
} else if (this.playerTwoTurn === false ) {
  return this.players[0]
  }
}

// function pressHold() {
//   $('#hold').on('click', function() {
//     playerOne.totalScore += playerOne.turnScore;
//   });
// }

var myGame;

//front end business
function attachRollListeners() {
  $("#roll").on("click", function() {
    var player = myGame.getCurrentPlayer();
    player.rollDice();
    $("#rollResults").text(player.diceRoll);
    $("#totalResults").text(player.turnScore);
    $("#player" + 1 + "total-points").text(player.totalScore); //funky
    $("#player-2-total-points").text(player.totalScore);
    console.log(myGame.playerTwoTurn);
  });
  $("#hold").on("click", function() {
    var player = myGame.getCurrentPlayer();
    //var creates the variable and name it player assign it the value with= value returned by the function getCurrentPlayer, under the myGame object
    player.hold();
    $("#rollResults").text(player.diceRoll);
    $("#totalResults").text(player.turnScore);
    $("#player-1-total-points").text(player.totalScore);
    // $("#player-2-total-points").text(player.totalScore);
    console.log(myGame.playerTwoTurn);
  });
}

$(document).ready(function() {
  myGame = new Game();
  player1 = new Player();
  player2 = new Player();

  myGame.players.push(player1, player2);

  attachRollListeners();
  $("#piggieDice").submit(function(event) {
    event.preventDefault();

  });
});
