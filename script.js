'use strict';
//Selecting elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let totalScores, currentScore, currentPlayer, playing;

const init = function () {
  //Starting Conditions

  totalScores = [0, 0];
  currentScore = 0;
  currentPlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;

  diceEl.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${currentPlayer}`).textContent = 0;
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

//Rolling Dice Functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generate random no from 1 - 6
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //2. Display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `./diceImages/dice-${dice}.png`;

    //3.Check if Dice is 1
    if (dice !== 1) {
      //Add diceroll to current score
      currentScore += dice;
      document.getElementById(`current--${currentPlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

//Button Hold Functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    //Add Current score to total score
    totalScores[currentPlayer] += currentScore;
    document.getElementById(`score--${currentPlayer}`).textContent =
      totalScores[currentPlayer];

    //Check if totalscore is greator or equal to 100
    if (totalScores[currentPlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      //Switch player
      switchPlayer();
    }
  }
});

//Reset to New Game
btnNew.addEventListener('click', function () {
  init();
});
