// Tic Tac Toe
// global game variables
	var player, fields, fieldsPlayed, fieldsPlayer1, fieldsPlayer2, winningFields, msg, playButton;
	// global statistics variables
	var p1Stats, p2Stats, drawStats;
	
	player = 1;
	// an array for all played fields
	fieldsPlayed = [];
	// arrays for each player
	fieldsPlayer1 = [];
	fieldsPlayer2 = [];
	
	// make all fields clickable
	fields = document.getElementsByTagName('td');
	
	for(let i = 0; i < fields.length; i++  ){
		fields[i].addEventListener('click', play);
	}
	
	msg = document.getElementById('msg');
	// Play again:
	playButton = document.getElementById("playAgain");
	playButton.addEventListener('click', playAgain);
	
	p1Stats = document.getElementById('player1');
	p2Stats = document.getElementById('player2');
	drawStats = document.getElementById('draw');
	
	function play(){
		// game core mechanics, marking the fields
		//console.log('play!');
		if(fieldsPlayed.includes(this.id)){
			alert('Field already taken!');
		}
		
		if(player === 1 && !fieldsPlayed.includes(this.id)){
		// this addresses the "owner" of the function, i.e. <td>
		this.innerHTML = 'X';
		this.style.color = 'white';
		fieldsPlayer1.push(parseInt(this.id));
		console.log('Player 1 played ' + fieldsPlayer1.toString());
		player = 2;
		} else if(player === 2 && !fieldsPlayed.includes(this.id)){
			this.innerHTML = '0';
			this.style.color = 'darkturquoise';
			fieldsPlayer2.push(parseInt(this.id));
			console.log('Player 2 played ' + fieldsPlayer2.toString());
			player = 1;
		}
		// store field in array
		fieldsPlayed.push(this.id);
		//console.log(this.id + ' clicked!');
		// checking for a winning combination
		win();
	}
		
	function win(){
		// analyzing field choices, winning conditions, feedback
		if(
			// player 1 winners
			fieldsPlayer1.includes(1) && fieldsPlayer1.includes(2) && fieldsPlayer1.includes(3) ||
		  	fieldsPlayer1.includes(4) && fieldsPlayer1.includes(5) && fieldsPlayer1.includes(6) ||
		  	fieldsPlayer1.includes(7) && fieldsPlayer1.includes(8) && fieldsPlayer1.includes(9) ||
		  	fieldsPlayer1.includes(1) && fieldsPlayer1.includes(5) && fieldsPlayer1.includes(9) ||
		  	fieldsPlayer1.includes(3) && fieldsPlayer1.includes(5) && fieldsPlayer1.includes(7)	||
		  	fieldsPlayer1.includes(1) && fieldsPlayer1.includes(4) && fieldsPlayer1.includes(7) ||
		  	fieldsPlayer1.includes(2) && fieldsPlayer1.includes(5) && fieldsPlayer1.includes(8) ||
		  	fieldsPlayer1.includes(3) && fieldsPlayer1.includes(6) && fieldsPlayer1.includes(9)	
		)
			{
			msg.innerHTML = "Player 1 won!";
			// statistics update
			let player1score = localStorage.getItem('player1'); // get the value from local storage
			player1score++; // increment the value
			localStorage.setItem('player1',player1score); // submit the value to local storage
			
			gameOver()
		} else if (
			// player 2 winners
			fieldsPlayer2.includes(1) && fieldsPlayer2.includes(2) && fieldsPlayer2.includes(3) ||
		  	fieldsPlayer2.includes(4) && fieldsPlayer2.includes(5) && fieldsPlayer2.includes(6) ||
		  	fieldsPlayer2.includes(7) && fieldsPlayer2.includes(8) && fieldsPlayer2.includes(9) ||
		  	fieldsPlayer2.includes(1) && fieldsPlayer2.includes(5) && fieldsPlayer2.includes(9) ||
		  	fieldsPlayer2.includes(3) && fieldsPlayer2.includes(5) && fieldsPlayer2.includes(7) ||
		  	fieldsPlayer2.includes(1) && fieldsPlayer2.includes(4) && fieldsPlayer2.includes(7) ||
		  	fieldsPlayer2.includes(2) && fieldsPlayer2.includes(5) && fieldsPlayer2.includes(8) ||
		  	fieldsPlayer2.includes(3) && fieldsPlayer2.includes(6) && fieldsPlayer2.includes(9)
		)
			{
			msg.innerHTML = "Player 2 won!";
			let player2score = localStorage.getItem('player2'); // get the value from local storage
			player2score++; // increment the value
			localStorage.setItem('player2',player2score); // submit the value to local storage
			
			gameOver()
		} else if (
			// game is a draw
			fieldsPlayed.length === 9
		)
			{
			msg.innerHTML = "Game is a draw!";
			let drawscore = localStorage.getItem('draw'); // get the value from local storage
			drawscore++; // increment the value
			localStorage.setItem('draw', drawscore); // submit the value to local storage
			
			gameOver()
		}
	}

	function gameOver(){
		// ending the game
		// removing ALL event listeners
		gameStats();
		 for (var i = 0; i < fields.length; i++) {
			fields[i].removeEventListener('click', play); 
		}
		// activate the play again button, JS style (% jQuery)
		playButton.classList.remove("hidden");
	}
	
	function playAgain(){
		// restart the game
		window.location.reload(true);
	}
	
	function gameStats(){
		// game stats using local storage
		
		// preparing local storage
		if(!localStorage.getItem('player1')){
			localStorage.setItem('player1', 0);
			localStorage.setItem('player2', 0);
			localStorage.setItem('draw', 0);
		}
		// reading from local storage
		let player1score = localStorage.getItem('player1');
		let player2score = localStorage.getItem('player2');
		let drawscore = localStorage.getItem('draw');
		
		// displaying the values from local storage
		p1Stats.innerHTML = player1score;
		p2Stats.innerHTML = player2score;
		drawStats.innerHTML = drawscore;	
	}
	
	// initializing game stats
	gameStats();

// Tic Tac Toe END

// Number Guess
$( document ).ready(function() {
		// form validering
		// custom language object
		var myErrorFeedback = {
			badInt: 'Please enter a number between 0-10.'
		}
		// formvalidator setup function
		$.validate({
			// language object overwritten by custom language object
    		language : myErrorFeedback,
			inputParentClassOnError : 'alert alert-danger' // <- assigning Bootstrap's alert classes to error message container
  		});
  	//prevent form submission
    $("form").submit(function(event){
		//console.log('Form not submitted!');
		playGame();
		
        event.preventDefault();
    });
});

/* 
Things to improve ;-):
- Prevent form submission (using jQuery!)
- A randomized magic number!
- Catch the player's guess from the form input field
- Match the player's guess agains the magic number
- Add proper feedback (That's too high - That's too low - You've got it)
- Player has only 3 guesses
- The game should prevent the player from playing after the game is finished
- Player can only enter numbers from 0-10, not words, into the input field (JS formcheck)
- Build an appalling ææh appealing responsive interface (Bootstrap)
*/
	
//Global game variables
var magicNumber, input, output, button, playersGuess, guessesRemaining;
	
magicNumber = Math.floor(Math.random() * 11); // random number 0-10
console.log(magicNumber);
	
//The game "controls"
input = document.getElementById("guess");
output = document.getElementById("output");
button = document.getElementById("playAgainNumber");
button.addEventListener('click', playAgain);
	
//Game state variable
guessesRemaining = 3;
	
function playGame(){
	// core functionality:
    // handling the game statistics (guessesRemaining)
	playersGuess = parseInt(input.value); // converting string input to number!
	//console.log(playersGuess);
	// countdown
	guessesRemaining -= 1;
	// analyzing the player's guess (i.e. the variable playersGuess!)
	if(playersGuess < magicNumber){
		output.innerHTML = playersGuess + ' is too low! ' + guessesRemaining + ' guesses left.';
		// clear the input field
		input.value = '';
		// autofocus
		input.focus();
	} else if(playersGuess > magicNumber){
		output.innerHTML = playersGuess + ' is too high!' + guessesRemaining + ' guesses left.';
		input.value = '';
		input.focus();
	} else if(playersGuess === magicNumber){
		output.innerHTML = 'You got it! ' + playersGuess + ' is the magic number!';
		endGame();
	} 
	// last attempt
	if(guessesRemaining === 0 && playersGuess === magicNumber){
		output.innerHTML = 'Yes - in the final attempt! ' + playersGuess + ' is the magic number!';
		endGame();
	} else if(guessesRemaining === 0){
		output.innerHTML = 'Sorry - no more guesses left. The magic number was ' + magicNumber + '. Game over.';
		endGame();
	}
	
}// end function
	
function endGame(){	
	// disabling all game controls
	$("#playAgainNumber").removeClass("hidden");
	$("#play").addClass("hidden");
	//Disable the input field
	input.disabled = true;
}
	
function playAgain(){
	window.location.reload(true);
}

// Number Guess END

// Reaction Game
		var start = new Date().getTime();
		function getRandomColor() {
			var letters = "0123456789ABCDEF".split("");
			var color = "#";
			for (var i = 0; i < 6; i++) {
				color += letters[Math.floor(Math.random() * 16)];
			}
			return color;
		}
		
		function makeShapeAppear() {
			var top = Math.random() * 150;
			var left = Math.random() * 150;
			var width = (Math.random() * 50) + 100;
			if (Math.random() > 0.5) {
				document.getElementById("shape").style.borderRadius = "50%";
			} else {
				document.getElementById("shape").style.borderRadius = "0";
			}				
			document.getElementById("shape").style.backgroundColor = getRandomColor();
			
			document.getElementById("shape").style.width = width + "px";
				
			document.getElementById("shape").style.height = width + "px";
				
			document.getElementById("shape").style.top = top + "px";
				
			document.getElementById("shape").style.left = left + "px";
				
			document.getElementById("shape").style.display = "block";
			
			start = new Date().getTime();
				
		}

		function appearAfterDelay() {
			setTimeout(makeShapeAppear, Math.random() * 2000);
		}
		
		appearAfterDelay();
			
		document.getElementById("shape").onclick = function() {
			document.getElementById("shape").style.display = "none";
			var end = new Date().getTime();
			var timeTaken = (end - start) / 1000;
			document.getElementById("timeTaken").innerHTML = timeTaken + "s";
			appearAfterDelay();
		}
// Reaction Game END