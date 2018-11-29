'use strict';
//HTML
const gameNew = document.querySelector(".startBtn");
const userScoreSpan = document.getElementById('userScore');
const compScoreSpan = document.getElementById('compScore');
const scoreBoard = document.querySelector('.score');
const resultDiv = document.querySelector('#result > p');
const rockDiv = document.getElementById('r');
const scissorsDiv = document.getElementById('s');
const paperDiv = document.getElementById('p');
const resetBtn = document.querySelector('.reset');
const rounds = document.querySelector('#rounds > p');

const choices = ['rock', 'scissors', 'paper'];
let emoji = String.fromCodePoint(0x1F600);
let userScoreFresh = 0;
let compScoreFresh = 0;
let setGame;
let playerChoice;
let computerChoice;

let playerMove = function (choice) {
    return playerChoice = choice;
}
function compMove() {
    const numberRandom = Math.floor(Math.random() * 3);
    return computerChoice = choices[numberRandom];
}

let compareChoices = function () {
    if (playerChoice === 'scissors' && computerChoice === 'paper' || playerChoice === 'rock' && computerChoice === 'scissors' || playerChoice === 'paper' && computerChoice === 'rock') {
        resultDiv.textContent = `${playerChoice} (user) beats ${computerChoice}. YOU WIN ${emoji} !`
    } else if (playerChoice === 'paper' && computerChoice === 'scissors' || playerChoice === 'rock' && computerChoice === 'paper' || playerChoice === 'scissors' && computerChoice === 'rock') {
        resultDiv.textContent = `${computerChoice} (user) beats ${playerChoice}. YOU LOST !`
    } else if (playerChoice === computerChoice) {
        resultDiv.textContent = `${playerChoice} (user) = ${computerChoice}. DRAW !`
    }
}

let scoreGame = function () {
    if (playerChoice === 'scissors' && computerChoice === 'paper' || playerChoice === 'rock' && computerChoice === 'scissors' || playerChoice === 'paper' && computerChoice === 'rock') {
        userScoreFresh++;
        userScore.textContent = userScoreFresh;
        compScore.textContent = compScoreFresh;
    }
    else if (playerChoice === 'paper' && computerChoice === 'scissors' || playerChoice === 'rock' && computerChoice === 'paper' || playerChoice === 'scissors' && computerChoice === 'rock') {
        compScoreFresh++ ,
            userScore.textContent = userScoreFresh;
        compScore.textContent = compScoreFresh;
    }
}
let endGame = function () {
    if (userScoreFresh === setGame) {
        stopButtons();
        return rounds.textContent = alert(`You Are WINNER !!! Result: ${userScoreFresh} to ${compScoreFresh}. PRESS NEW GAME TO START`);
    }
    else if (compScoreFresh === setGame) {
        stopButtons();
        return rounds.textContent = alert(`You Are LOOSER !!! Result: ${userScoreFresh} to ${compScoreFresh}. PRESS NEW GAME TO START`);
        stopButtons();
    }
    return rounds.textContent = `This game has ${setGame} rounds.`
}
let stopButtons = function () {
    paperDiv.disabled = !paperDiv.disabled;
    rockDiv.disabled = !rockDiv.disabled;
    scissorsDiv.disabled = !scissorsDiv.disabled;
}

let resetALL = function () {
    setGame = null;
    userScoreFresh = 0;
    userScoreSpan.textContent = userScoreFresh;
    compScoreFresh = 0;
    compScoreSpan.textContent = compScoreFresh;
    resultDiv.textContent = `Let's Play !`;
    rounds.textContent = "";
}

resetBtn.addEventListener('click', function () {
    userScoreFresh = 0;
    userScoreSpan.textContent = userScoreFresh;
    compScoreFresh = 0;
    compScoreSpan.textContent = compScoreFresh;
    resultDiv.textContent = `Let's Play !`;
    rounds.textContent = "";
});

gameNew.addEventListener('click', function () {
    resetALL();
    stopButtons();
    setGame = parseInt(window.prompt('How many rounds do you want to play?'));
    endGame();
});

let shorts = function (choice) {
    playerMove(choice);
    compMove();
    compareChoices();
    scoreGame();
    endGame();
}
paperDiv.addEventListener('click', function () {
    shorts('paper');
});

rockDiv.addEventListener('click', function () {
    shorts('rock');
});

scissorsDiv.addEventListener('click', function () {
    shorts('scissors');
});
stopButtons();