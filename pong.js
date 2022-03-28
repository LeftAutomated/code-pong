//Left Player Properties
var leftPlayerX = 20;
var leftPlayerY = 255;
var leftPlayerHeight = 70;
var leftScore = 0;

//Right Player Properties
var rightPlayerX = 290;
var rightPlayerY = 255;
var rightPlayerHeight = 70;
var rightScore = 0;

//Both Player Properties
var playerSpeed = 10;

//Pong Ball Properties
var ballX = 155;
var ballY = 285;
var ballXVelocity = -1;
var ballYVelocity = 0;
var ballSpeed = 2;

//Other Properties
var countdown = 10;
var pauseAll = true;
var multiplayer = false;
var freePlay = false;
var shrink = true;
var borderColor = "#ffffff";

//Element Arrays
var homeElements = ["homeTitle", "editionText", "startButton"];
var modeElements = ["playButton", "gameModeTitle", "notesTitle", "notesContent", 
"playersTitle", "shrinkTitle", "modeTitle", "modeStandard", "modeFreePlay", "shrinkYes", 
"shrinkNo", "players2", "players1"];
var modeBorderElements = ["notesBorder", "playersBorder", "shrinkBorder", "modeBorder"];
var modeGreenBorderElements = ["modeSelector", "shrinkSelector", "playersSelector"];
var gameElements = ["countdownTimer","leftPlayerScore","rightPlayerScore"];
var resultElements = ["winnerText"];

//Styles and Fades
fadeIn(homeElements, "home");
setStyle("homeTitle", "text-shadow: 2px 2px grey");
setStyle("startButton", "text-shadow: 2px 2px grey");
setStyle("gameModeTitle", "text-shadow: 2px 2px grey");
setStyle("playButton", "text-shadow: 2px 2px grey");
setStyle("gameBorder", "border-style: solid dashed solid dashed");
setStyle("leftPlayerScore", "text-shadow: 2px 2px red");
setStyle("rightPlayerScore", "text-shadow: 2px 2px blue");

//Elements fade in - opacity manipulation
function fadeIn(ele){
  var opac = 0;
  var fade = timedLoop(50,function(){
    for(var i = 0; i < ele.length; i++){
      setStyle(ele[i], "color:rgba(255,255,255," + opac + ")");
    }
    otherModeElements(opac);
    otherGameElements(opac);
    otherResultElements(opac);
    if(opac == 1){
    	stopTimedLoop(fade);
    }
    opac = Math.round(10*opac)/10 + 0.1;
  });
}

//Elements fade out - opacity manipulation
function fadeOut(ele, ele2, screen){
  var opac = 1.0;
  var time = timedLoop(50,function(){
    for(var i = 0; i < ele.length; i++){
      setStyle(ele[i], "color:rgba(255,255,255," + opac + ")");
    }
    otherModeElements(opac);
    otherGameElements(opac);
    otherResultElements(opac);
    if(opac == 0){
    	setScreen(screen);
    	if(screen == "pong_game"){
    	  startGame();
    	}
    	if(screen == "home"){
    	  hideElement("homeButton");
    	  resetGame();
    	}
    	fadeIn(ele2);
    	stopTimedLoop(time);
    }
    opac = Math.round(10*opac)/10 - 0.1;
  });
}

//Other Mode Elements
function otherModeElements(opa){
  for(var j = 0; j < modeBorderElements.length; j++){
    setStyle(modeBorderElements[j], "border-style: dashed");
    setStyle(modeBorderElements[j], "border-color: #ffffff" + (opa*100));
  }
  for(var k = 0; k < modeGreenBorderElements.length; k++){
    setStyle(modeGreenBorderElements[k], "border-color: #00ff00" + (opa*100));
  }
}

//Other Game Elements
function otherGameElements(opa){
  setStyle("leftPlayerName", "color:rgba(255,0,0," + opa + ")");
  setStyle("rightPlayerName", "color:rgba(0,0,255," + opa + ")");
  setStyle("gameBorder", "border-top-color: " + borderColor + (opa*100));
  setStyle("gameBorder", "border-bottom-color: " + borderColor + (opa*100));
  setStyle("gameBorder", "border-left-color: #ffffff" + (opa*100));
  setStyle("gameBorder", "border-right-color: #ffffff" + (opa*100));
  setStyle("pongBall", "opacity:" + opa);
  setStyle("homeButton", "opacity:" + opa);
  setStyle("leftPlayer", "background-color: #ff0000" + (opa*100));
  setStyle("rightPlayer", "background-color: #0000ff" + (opa*100));
}

//Other Result Elements
function otherResultElements(opa){
  setStyle("homeResultButton", "opacity:" + opa);
  setStyle("leftScore", "color:rgba(255,0,0," + opa + ")");
  setStyle("rightScore", "color:rgba(0,0,255," + opa + ")");
  setStyle("dash", "color:rgba(255,255,255," + opa + ")");
}

//Up and Down with WASD Keys - Left Hand
onEvent("pong_game", "keypress", function(event){
  if(pauseAll == false){
    if(event.key == "w" && leftPlayerY > 150)
    {
      leftPlayerY = leftPlayerY - playerSpeed;
    }
    else if(event.key == "s" && leftPlayerY < 430 - leftPlayerHeight){
      leftPlayerY = leftPlayerY + playerSpeed;
    }
  }
  setPosition("leftPlayer", leftPlayerX, leftPlayerY);
});

//Up and Down with Arrow Keys - Right Hand
onEvent("pong_game", "keydown", function(event){
  if(pauseAll == false && multiplayer == true){
    if(event.keyCode == "38" && rightPlayerY > 150)
    {
      rightPlayerY = rightPlayerY - playerSpeed;
    }
    else if(event.keyCode == "40" && rightPlayerY < 430 - rightPlayerHeight){
      rightPlayerY = rightPlayerY + playerSpeed;
    }
  }
  if(event.which == "32" && countdown == -1){
    if(pauseAll == true){
      pauseAll = false;
      setText("countdownTimer","");
      beginBall();
      
    }
    else if(pauseAll == false){
      pauseAll = true;
      setText("countdownTimer","Paused");
    }
  }
  setPosition("rightPlayer", rightPlayerX, rightPlayerY);
});

//Returns to home screen
onEvent("homeButton", "click", function(){
  fadeOut(gameElements, homeElements, "home");
});

//Returns to home screen
onEvent("resultHomeButton", "click", function(){
  fadeOut(resultElements, homeElements, "home");
});

//Goes to game mode selection screen
onEvent("startButton", "click", function(){
  fadeOut(homeElements, modeElements, "gameMode");
});

//Goes to pong game screen
onEvent("playButton", "click", function(){
  fadeOut(modeElements, gameElements, "pong_game");
});

//Mode set to standard
onEvent("modeStandard", "click", function(){
  freePlay = false;
  setPosition("modeSelector",70,83);
});

//Mode set to free play
onEvent("modeFreePlay", "click", function(){
  freePlay = true;
  setPosition("modeSelector",170,83);
});

//Enable shrink
onEvent("shrinkYes", "click", function(){
  shrink = true;
  setPosition("shrinkSelector",70,153);
});

//Disable shrink
onEvent("shrinkNo", "click", function(){
  shrink = false;
  setPosition("shrinkSelector",170,153);
});

//Allow 1 player
onEvent("players1", "click", function(){
  multiplayer = false;
  setPosition("playersSelector",70,223);
});

//Allow 2 players
onEvent("players2", "click", function(){
  multiplayer = true;
  setPosition("playersSelector",170,223);
});

//Pong Ball starts moving after 10 seconds
function startGame(){
  timedLoop(1000, function(){
    countdown = countdown - 1;
    if(countdown <= 3){
      setStyle("countdownTimer", "color: red");
    }
    setText("countdownTimer", countdown);
    if(countdown <= 0){
      setStyle("countdownTimer", "color: white");
      setText("countdownTimer", "Go");
      timedLoop(1000, function(){
        stopTimedLoop();
        setText("countdownTimer","");
        pauseAll = false;
        showElement("homeButton");
        beginBall(); 
      });
    }
  });
}

//Ball starts moving
function beginBall(){
  var angleRad = Math.PI;
  var delay = 0;
  var time = timedLoop(20,function(){
    delay = delay + 20;
    if(ballY <= 143 || ballY >= 427){
      ballYVelocity = -ballYVelocity;
    }
    ballX = Math.round(ballX + ballXVelocity);
    ballY = Math.round(ballY + ballYVelocity);
    if((ballX - leftPlayerX == 15 || ballX - leftPlayerX == 14) && ((ballY - leftPlayerY <= 10 && ballY - leftPlayerY >=0) || 
    (ballY + 10 >= leftPlayerY && ballY <= leftPlayerY + leftPlayerHeight))){
      borderColor = "#ff0000";
      setStyle("gameBorder","border-top-color:red");
      setStyle("gameBorder","border-bottom-color:red");
      if(ballY <= leftPlayerY + leftPlayerHeight/5){
        angleRad = 11 * Math.PI / 6;
      }
      else if(ballY <= leftPlayerY + 2*leftPlayerHeight/5){
        angleRad = 7 * Math.PI / 4;
      }
      else if(ballY <= leftPlayerY + 3*leftPlayerHeight/5){
        angleRad = 0;
      }
      else if(ballY >= leftPlayerY + 4*leftPlayerHeight/5){
        angleRad = Math.PI / 6;
      }
      else if(ballY >= leftPlayerY + 3*leftPlayerHeight/5){
        angleRad = Math.PI / 4;
      }
      ballXVelocity = ballSpeed * Math.cos(angleRad);
      ballYVelocity = ballSpeed * Math.sin(angleRad);
    } 
    if((rightPlayerX - ballX == 11 || ballX - rightPlayerX == 9) && ((ballY - rightPlayerY <= 10 && ballY - rightPlayerY >=0) || 
    (ballY + 10 >= rightPlayerY && ballY <= rightPlayerY + rightPlayerHeight)) ){
      borderColor = "#0000ff";
      setStyle("gameBorder","border-top-color:blue");
      setStyle("gameBorder","border-bottom-color:blue");
      if(ballY <= rightPlayerY + rightPlayerHeight/5){
        angleRad = 7 * Math.PI / 6;
      }
      else if(ballY <= rightPlayerY + 2*rightPlayerHeight/5){
        angleRad = 5 * Math.PI / 4;
      }
      else if(ballY <= rightPlayerY + 3*rightPlayerHeight/5){
        angleRad = Math.PI;
      }
      else if(ballY >= rightPlayerY + 4*rightPlayerHeight/5){
        angleRad = 5 * Math.PI / 6;
      }
      else if(ballY >= rightPlayerY + 3*rightPlayerHeight/5){
        angleRad = 3 * Math.PI / 4;
      }
      ballXVelocity = ballSpeed * Math.cos(angleRad);
      ballYVelocity = ballSpeed * Math.sin(angleRad);      
    }
    if(ballX <= 12){
      rightScore = rightScore + 1;
      setText("rightPlayerScore", rightScore);
      setText("rightScore", rightScore);
      stopTimedLoop();
      resetBall("right");
    }
    if(ballX >= 297){
      leftScore = leftScore + 1;
      setText("leftPlayerScore", leftScore);
      setText("leftScore", leftScore);
      stopTimedLoop();
      resetBall("left");
    }
    setPosition("pongBall", ballX, ballY);
    if(pauseAll == true){
      stopTimedLoop(time);
    }
    
    if(multiplayer == false && delay % 500 == 0){
      if(ballY > rightPlayerY && rightPlayerY < 430 - rightPlayerHeight){
        rightPlayerY = rightPlayerY + playerSpeed;
      }
      else if(ballY < rightPlayerY + rightPlayerHeight && rightPlayerY > 150){
        rightPlayerY = rightPlayerY - playerSpeed;
      }
    setPosition("rightPlayer", rightPlayerX, rightPlayerY);
    }
  });
}

//Ball returns to original position
function resetBall(player){
  ballX = 145;
  ballY = 285;
  if(player == "right"){
    ballXVelocity = -1;
    if(rightPlayerHeight >= 42 && shrink == true){
      rightPlayerHeight = rightPlayerHeight - 5;
      setSize("rightPlayer", 10, rightPlayerHeight);
    }
    if(rightScore == 8 && freePlay == false){
      pauseAll = true;
      setStyle("winnerText", "text-shadow: 2px 2px blue");
      setText("winnerText", "Blue Player Wins");
      fadeOut(gameElements, resultElements, "result");
    }
  }
  else if(player == "left"){
    ballXVelocity = 1;
    if(leftPlayerHeight >= 42 && shrink == true){
      leftPlayerHeight = leftPlayerHeight - 5;
      setSize("leftPlayer", 10, leftPlayerHeight);
    }
    if(leftScore == 8 && freePlay == false){
      pauseAll = true;
      setStyle("winnerText", "text-shadow: 2px 2px red");
      setText("winnerText", "Red Player Wins");
      fadeOut(gameElements, resultElements, "result");
    }
  }
  ballYVelocity = 0;
  setPosition("pongBall", ballX, ballY);
  beginBall();
}

//Resets Game
function resetGame(){
  leftPlayerY = 255;
  leftPlayerHeight = 70;
  leftScore = 0;
  rightPlayerY = 255;
  rightPlayerHeight = 70;
  rightScore = 0;
  ballX = 155;
  ballY = 285;
  ballXVelocity = -1;
  ballYVelocity = 0;
  countdown = 10;
  pauseAll = true;
  setText("leftPlayerScore", leftScore);
  setText("rightPlayerScore", rightScore);
  setPosition("leftPlayer", 20, leftPlayerY, 10, leftPlayerHeight);
  setPosition("rightPlayer", 290, rightPlayerY, 10, rightPlayerHeight);
  setPosition("pongBall", ballX, ballY);
  setText("countdownTimer", countdown);
  borderColor = "#ffffff";
}

