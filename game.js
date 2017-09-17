 
  // Apply module pattern to wrap your JavaScript code into a single global variable or an immediately invoked function.
  (function() {
 
     'use strict'

  /*****************************************
   Below Are Global Variables 
  *****************************************/
           
  const start_game ='<div class="screen screen-start" id="start"><header><h1>Tic Tac Toe</h1><a href="#" class="button">Start Game</a></header></div>';
  
  const end_game = '<div class="screen screen-win" id="finish"><header><h1>Tic Tac Toe</h1><p class="message"></p><a href="#" class="button">New game</a></header></div>';
  
  // player1 is O
  const player1 = ("#player1"); 

  //player2 is X
  const player2 = ("#player2"); 
  
  let gameWinner = ""; 


  // Game status screens are appended to the screen and hidden. 
  $("body").append(start_game);
  $("body").append(end_game);
  $("#start, #finish").hide(); 
 

  /*************************
  FUNCTIONS
  *************************/

  //GAME STARTS
  
   (function() {
    $("#start").show(); //The start screen appears on page load. 
    //On clicking "start game" button, the start screen is hidden.
    $(".button").on("click", function(){ 
      $("#start").hide();
      whichPlayerStarts();
      currentPlayer();
      playTheGame();
    });
  })();

  //WhichPlayerStarts the game is randomly selected.
  const whichPlayerStarts = () => {
    let rand = Math.floor(Math.random() * 2);
    if (rand === 0) {
      $(player1).addClass("active");
    } else {
      $(player2).addClass("active");
    }
  };

  // Refresh Board To startNewGame.
  
  const startNewGame = () => {
    // the previously finished game screen is hidden.
    $("#finish").hide(); 

    // Active status from player1 and player2 is removed.
    $(player1).removeClass("active");
    $(player2).removeClass("active");
   
    //Filled classes from the boxes are removed.
    $(".box").removeClass("box-filled-1");
    $(".box").removeClass("box-filled-2");

    //Background color & images from the boxes gets removed.
    $(".box").css({ "background-color" : "none", "background-image" : "none" });
   
    whichPlayerStarts(); // whichPlayerStarts the game is randomly selected.
    currentPlayer(); // shows background image of player on moving mouse over empty square.
    playTheGame();
  }

  /************************
  Game Play   
  ************************/

   //The current player is indicated at the top of the page -- the box with the symbol O or X is highlighted for the current player.

  //When the current player mouses over an empty square on the board, it's symbol the X or O should appear on the square.

  const currentPlayer = () => {  // shows whose turn it is to play.
    $(".box").each(function() {
      $(this).mouseenter(function() { 
        
          if ( $(player1).hasClass("active")) {
                // The background image is added on hover.
              $(this).css('background-image', 'url(img/o.svg)');

          }else {

               $( this ).css('background-image', 'url(img/x.svg)');
          }
      });

      $(this).mouseleave(function(){
        // The background image is removed on mouseleave.
        $(this).css('background-image', 'none');

      });

    }); 
  } 
       
  
  //   -> Checks to see if the box is taken.
  //   -> In case the box is empty, mark it as occupied by that player. 
  //   -> Switches the active player.
    
  const playTheGame = () => {
    $('.box').click(function(){

        if ($(player1).hasClass("active")) {

          if ( $(this).hasClass("box-filled-1") === false && $(this).hasClass("box-filled-2") === false ) {

            $(this).addClass('box-filled-1');
            $(this).css('background-image', 'url(img/o.svg)');
            $(this).unbind('mouseenter mouseleave');
            //active status from player1 is removed
            $(player1).removeClass("active"); 
            //while player 2 is made active
            $(player2).addClass("active"); 

            the_Winner_Is();
          }

        }else if ($(player2).hasClass("active")) {
          if ( $(this).hasClass("box-filled-1") === false && $(this).hasClass("box-filled-2") === false ) {
            //
            $(this).addClass('box-filled-2');
            $(this).css('background-image', 'url(img/x.svg)');
            $(this).unbind('mouseenter mouseleave');
             //active status from player2 is removed
            $(player2).removeClass("active"); 
            //while player 1 is made active
            $(player1).addClass("active"); 

            the_Winner_Is();

          }
        }
    });

  }

  /************************
   gameWinner Is decided
  ************************/
  // The gameWinner message is displayed

    const show_Winner_Message = () => {
    if (gameWinner === "player1") {
      $("#finish").removeClass("screen-win-two");
      $("#finish").removeClass("screen-win-tie");

      $(".message").html("Winner"); //"Winner" message is added
      $("#finish").addClass("screen-win-one"); //"screen win one" is shown if player 1 wins.
      $("#finish").show();
     
       
       //Start new game
      $(".button").click(function() {
        startNewGame();
      });

    } else if (gameWinner === "player2") {
     $("#finish").removeClass("screen-win-one");
     $("#finish").removeClass("screen-win-tie");

      $(".message").html("Winner"); // "Winner" message is added.
      $("#finish").addClass("screen-win-two");//"screen win two" is shown if player 2 wins.
      $("#finish").show();
     
     //startNewGame
      $(".button").click(function() {
        startNewGame();
      });

    } else if (gameWinner === "no winner") {
     $("#finish").removeClass("screen-win-one");
     $("#finish").removeClass("screen-win-two");

      // add message
      $(".message").html("It's a Tie!"); // "It's a Tie!" message is added.
      $("#finish").addClass("screen-win-tie"); //"screen win tie" is shown if it's a tie.
      $("#finish").show();
    
      //StartNewGame
      $(".button").click(function() {
        startNewGame();
      }); 
    }
  }

  // Checks the result to see who the_Winner_Is 

    const the_Winner_Is = ()  => {
      // The result gets stored in the empty array
    let gameResult = [];     
      $(".box").each(function() { 
      if ($(this).hasClass("box-filled-1")) { 
        gameResult.push("player1"); 
      } else if ($(this).hasClass("box-filled-2")) {
        gameResult.push("player2");
      } else {
        gameResult.push("empty");
      }
    });

    // Here the squares are compared to find out whether any player has won the game or is it a draw.

    if (gameResult[0] !== "empty" && gameResult[0] === gameResult[1] && gameResult[0] === gameResult[2]) { 
      gameWinner = gameResult[0];
      show_Winner_Message();
    } else if (gameResult[3] !== "empty" && gameResult[3] === gameResult[4] && gameResult[3] === gameResult[5]) { 
      gameWinner = gameResult[3];
      show_Winner_Message();
    } else if (gameResult[6] !== "empty" && gameResult[6] === gameResult[7] && gameResult[6] === gameResult[8]) { 
      gameWinner = gameResult[6];
      show_Winner_Message();
      //vertical
    } else if (gameResult[0] !== "empty" && gameResult[0] === gameResult[3] && gameResult[0] === gameResult[6]) { 
      gameWinner = gameResult[0];
      show_Winner_Message();
    } else if (gameResult[1] !== "empty" && gameResult[1] === gameResult[4] && gameResult[1] === gameResult[7]) { 
      gameWinner = gameResult[1];
      show_Winner_Message();
    } else if (gameResult[2] !== "empty" && gameResult[2] === gameResult[5] && gameResult[2] === gameResult[8]) { 
      gameWinner = gameResult[2];
      show_Winner_Message();
      //diagonal
    } else if (gameResult[0] !== "empty" && gameResult[0] === gameResult[4] && gameResult[0] === gameResult[8]) {
      gameWinner = gameResult[0];
      show_Winner_Message();
    } else if (gameResult[2] !== "empty" && gameResult[2] === gameResult[4] && gameResult[2] === gameResult[6]) {
      gameWinner = gameResult[2];
      show_Winner_Message();
    } else if (!gameResult.includes("empty")){
      gameWinner = "no winner";
      show_Winner_Message();
    }

  };
}());