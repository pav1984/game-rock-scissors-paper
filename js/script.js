'use strict';

//REFERENCJE HTML

var btnStart = document.querySelector('#newGame');
var infoRounds = document.querySelector('#infoRounds');
var output = document.querySelector('#output');
var modalBtnStart = document.querySelector('#start')
var buttons = document.querySelectorAll('.player-move');
var choice = document.querySelector('.choice');

//PARAMETRY GRY

var params = {
    progress: [],
    playerName: '',
    numberRounds: 0,
    play: false,
    playerMove: '',
    computerMove: ''
}

var game = {
    numbers: 0,
    wins: 0,
    losses: 0,
    draws: 0,
}

// FUNKCJA ROZPOCZECIA GRY

function newGame() {
    document.querySelector('input[name="firstname"]').value = '';
    document.querySelector('input[name="rounds"]').value = '';
    showModal('#modal-new-game');
    clearTable();
}
//FUNKCJA DLA POCZATKOWEGO MODUAL

function modalStart(e) {
    e.preventDefault();
    document.querySelector('p.numbers span').textContent = game.numbers = 0;
    document.querySelector('p.wins span').textContent = game.wins = 0;
    document.querySelector('p.losses span').textContent = game.losses = 0;
    document.querySelector('p.draws span').textContent = game.draws = 0;
    document.querySelector('[data-summary="who-win"]').textContent = '';
    document.querySelector('[data-summary="your-choice"]').textContent = '';
    document.querySelector('[data-summary="ai-choice"]').textContent = '';
   if (!isNaN(params.playerName = document.querySelector('input[name="firstname"]').value)){
       return alert('You Have To Give Your Name!!!')
   };
    params.numberRounds = document.querySelector('input[name="rounds"]').value;
    infoRounds.innerHTML = `${params.numberRounds} Rounds to the End of the Game`
    params.play = true;
    document.querySelector('#modal-overlay').classList.remove('show');
    choice.innerHTML = params.playerName.toUpperCase();
}

//FUNKCJA GŁÓWNA + WYBÓR GRACZA

function playerOption() {
    if (!params.play || params.numberRounds === 0) {
        showModal('#modal-warning');
        document.querySelector('#modal-warning .content p').innerHTML = 'Please Start New Game';
        return;
    }
    params.playerMove = this.dataset.move;
    params.computerMove = computerChoice();
    var resultRound = gameResult(params.playerMove, params.computerMove);
    infoRounds.innerHTML = `${--params.numberRounds} Rounds to the End of the Game`
    showResult(params.playerMove, params.computerMove, resultRound);
    params.progress = [];
    params.progress.push({
        playerChoice: params.playerMove,
        computerChoice: params.computerMove,
        winner: resultRound,
        playerWins: game.wins,
        computerWins: game.losses
    });
    table();
    winner();
}

//FUNKCJA TWORZENIA WYNIKÓW W TABELI

function table() {
    for (var i = 0; i < params.progress.length; i++) {
        var row = document.createElement('tr');
        var rowContent = `<td> ${game.numbers} </td>
      <td> ${params.progress[i].playerChoice} </td>
      <td> ${params.progress[i].computerChoice} </td>
      <td> ${params.progress[i].winner} </td>
      <td> ${params.progress[i].playerWins} - ${params.progress[i].computerWins} </td>`

        row.innerHTML = rowContent;
        document.querySelector('tbody').appendChild(row);;
    }
    if (params.numberRounds === 0) {
        showModal('#modal-show');

    }
};

//FUNKCJA PUBLIKACJI WYNKOW W MODUAL KONCOWYM

function winner() {
    if (game.wins > game.losses) {
        document.querySelector('#modal-show .content p').innerHTML = `<span style= "color: green"> ${params.playerName} ( ${game.wins} - ${game.losses} ) Computer </span><br><p style= "color: green">${params.playerName} WON THE GAME!!! :)</p>`
    } else if (game.wins < game.losses) {
        document.querySelector('#modal-show .content p').innerHTML = `<span style= "color: #FF0000"> ${params.playerName} ( ${game.wins} - ${game.losses} ) Computer </span><br><p style= "color: #FF0000">${params.playerName} LOST THE GAME!!! :( </p>`
    } else {
        document.querySelector('#modal-show .content p').innerHTML = `<span style= "color: gray"> ${params.playerName} ( ${game.wins} - ${game.losses} ) Computer </span><br><p style= "color: gray"> IT IS A DRAW!!! :| TRY AGAIN !</p>`
    }

};

// FUNKCJA CZYSZCZENIA TABELI Z WYNIKAMI

function clearTable() {
    var table = document.getElementById('myTable');
    var rowNumbers = table.rows.length;
    for (var i = 1; i < rowNumbers; i++) {
        table.deleteRow(1);
    }
};

// FUNKCJA WYBOR KOMPUTERA

function computerChoice() {
    var aiChoice = buttons[Math.floor(Math.random() * 3)].dataset.move;
    return aiChoice;
};

// FUNKCJA POROWNANIE WYBOROW

function gameResult(player, ai) {
    if (player === ai) {
        return 'draw'
    } else if (player === 'paper' && ai === 'rock' || player === 'rock' && ai === 'scissors' || player === 'scissors' && ai === 'paper') {
        return 'win'
    } else {
        return 'losse'
    }
};

//FUNKCJA PUBLIKACJI AKTUALNYCH WYNIKOW NA STRONIE

function showResult(user, ai, result) {
    document.querySelector('[data-summary="your-choice"]').textContent = `played ${user.toUpperCase()}`;
    document.querySelector('[data-summary="ai-choice"]').textContent = `played ${ai.toUpperCase()}`;
    document.querySelector('p.numbers span').textContent = ++game.numbers;

    if (result === "win") {
        document.querySelector('p.wins span').textContent = ++game.wins;
        document.querySelector('[data-summary="who-win"]').textContent = "YOU WIN!!! :)"
        document.querySelector('[data-summary="who-win"]').style.color = "green";
    } else if (result === "losse") {
        document.querySelector('p.losses span').textContent = ++game.losses;
        document.querySelector('[data-summary="who-win"]').textContent = "YOU LOSE. :("
        document.querySelector('[data-summary="who-win"]').style.color = "red";
    } else {
        document.querySelector('p.draws span').textContent = ++game.draws;
        document.querySelector('[data-summary="who-win"]').textContent = "DRAW. :|"
        document.querySelector('[data-summary="who-win"]').style.color = "gray";
    }

};

//NASLUCHIWACZE

btnStart.addEventListener('click', newGame);
modalBtnStart.parentElement.addEventListener('submit', modalStart);
buttons.forEach(button => button.addEventListener('click', playerOption));

//MODUALS

var modals = document.querySelectorAll('.modal');

//FUNCKJA POKAZUJACA MODUAL

function showModal(idModal) {
    for (var i = 0; i < modals.length; i++) {
        modals[i].classList.remove('show');
    };
    document.querySelector(idModal).classList.add('show');
    document.querySelector('#modal-overlay').classList.add('show');
};
//FUNKCJA UKRYWAJACA MODUAL

function hideModal(event) {
    event.preventDefault();
    document.querySelector('#modal-overlay').classList.remove('show');
};
// ZAMYKANIE MODUAL KRZYZYK I NACISNIECIE W BODY

var closeButtons = document.querySelectorAll('.modal .close');
for (var i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener('click', hideModal);
}
document.querySelector('#modal-overlay').addEventListener('click', hideModal);
for (var i = 0; i < modals.length; i++) {
    modals[i].addEventListener('click', function (event) {
        event.stopPropagation();
    });
}

// FUNKCJA DLA NAGŁOWKA

var text = document.querySelector('.text');
var spnCursor = document.querySelector('.cursor');
var txt = 'ROCK-SCISSORS-PAPER';
var indexText = 0;
var time = 100;

function addLetter() {
    text.textContent += txt[indexText];
    indexText++;
    if (indexText === txt.length) {
        clearInterval(index)
    };
};
var index = setInterval(addLetter, time);

function cursor() {
    spnCursor.classList.toggle('active');
}
setInterval(cursor, 500);
