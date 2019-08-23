/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, currentlyPlaying;
//Initialize GAME
initGame();

//Function to initialize Game
function initGame()
{
  currentlyPlaying =  true;
  //Arrays to keep track of scores
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;

  //Make dice initially invisible
  document.getElementsByClassName("dice")[0].style.display = 'none';

  //set all scores (GLOBAL AND ROLLED) to ZERO initially
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-0').textContent = '0';

  //Set them to appropiate name
  document.querySelector('#name-0').textContent = "Player 1";
  document.querySelector('#name-1').textContent = "Player 2";

  //Set them to appropiad style class
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('winner');

  //Remove active class if present
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.remove('active');

  //Add active style class
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.player-0-panel').classList.add('active');

  //Empty the input field
  document.querySelector('.final-score').value = '';
}

//Create function for btn ROLL
function btn() {

  if (currentlyPlaying)
  {
    //Implement random number generation
    var dice = Math.floor(Math.random() * 6) + 1;

    //Display the result (display the dice with right image)
    var theDice = document.querySelector('.dice');
    theDice.style.display = 'block';
    theDice.src = 'dice-' + dice + '.png'; //string concatenation for image name

    //Update round score IF the number rolled was NOT 1
    if (dice !== 1)
    {
      //Add score
      roundScore += dice; //add the dice result to the roundScore
      //Update current score in the interface
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }
    else //make it go to next player if rolls 1
    {
      nextPlayer();
    }
  }
}

//Create function for btn HOLD
function hold() {

  if (currentlyPlaying)
  {
    //Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore; //use active player to determine array index and add that plus the roundScore

    //Update interface
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]; //use active player to determine right ID and right index

    //Make final score based on input (players choice)
    var input = document.querySelector('.final-score').value;

    //Check if player won the game
    if (scores[activePlayer] >= input) //if won, change text, hide dice, apply winner, remove active and don't go to next turn
    {
      document.querySelector('#name-' + activePlayer).textContent = "WINNER!";
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      currentlyPlaying = false;
    }
    else
    {
      nextPlayer();
    }
  }
}

//Function to assing and pass turn to next player
function nextPlayer() {

  //select the dice
  var theDice = document.querySelector('.dice');

  //If active player is 0 it should be 1 and vice versa
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

  //if you land a one it is set to ZERO
  roundScore = 0;

  //set the interface to zero (we are setting both to zero because the ELSE only matters for the one that has to be changed anyways)
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  //Make ACTIVE PLAYER visible (toogle ACTIVE CLASS)
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  //Hide the dice until next turn
  theDice.style.display = 'none';
}


//Add event listener to button ROLL
document.querySelector('.btn-roll').addEventListener('click', btn);
//Add event listener to HOLD button
document.querySelector('.btn-hold').addEventListener('click', hold);
//Add event lsitener to NEW Game
document.querySelector('.btn-new').addEventListener('click', initGame);
