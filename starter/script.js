'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const current2El = document.getElementById('current--2');
const current3El = document.getElementById('current--3');

const dice1El = document.querySelector('.dice1');
const dice2El = document.querySelector('.dice2');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing, turnCounter;

/*
// Setting player names
function setPlayerName(playerNumber) {
  const inputElement = document.getElementById(`player${playerNumber}Name`);
  const playerName = inputElement.value;

  if (playerName.trim() !== '') {
    const playerTextElement = document.getElementById(
      `player${playerNumber}Text`
    );
    playerTextElement.textContent = `Player ${playerNumber}: ${playerName}`;
  } else {
    alert(`Please enter a name for Player ${playerNumber}.`);
  }
}
*/
// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  turnCounter = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  dice1El.classList.add('hidden');
  dice2El.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  console.log(`Player ${activePlayer} rolled ${turnCounter} times.`);
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  turnCounter = 0;
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    var dice1 = Math.trunc(Math.random() * 6) + 1;
    var dice2 = Math.trunc(Math.random() * 6) + 1;

    turnCounter++;

    // 2. Display dice
    dice1El.classList.remove('hidden');
    dice1El.src = `dice-${dice1}.png`;

    dice2El.classList.remove('hidden');
    dice2El.src = `dice-${dice2}.png`;

    // 3. Check for rolled 1
    if (dice1 !== 1 && dice2 !== 1) {
      // Check for double
      if (dice1 === dice2) {
        dice1 = dice1 * 2;
        dice2 = dice2 * 2;
      }
      // Add dice 1 & 2 to current score
      currentScore += dice1 + dice2;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      dice1El.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
