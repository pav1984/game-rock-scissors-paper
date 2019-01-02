'use strict';

//Referencje Html

var btnStart = document.querySelector('#newGame');
var infoRounds = document.querySelector('#infoRounds');
//var result = document.querySelector('#result');
var output = document.querySelector('#output');
var modalBtnStart = document.querySelector('#start')
var buttons = document.querySelectorAll('.player-move');
var choice = document.querySelector('.choice');
var params = {
 progress:[],
 playerName:'',
 gameResult: '',
 numberRounds:0,
 play: false,
 playerMove:'',
 computerMove:''

}
var game = {
    numbers: 0,
    wins: 0,
    losses: 0,
    draws: 0,
}

function newGame () {
    document.querySelector('input[name="firstname"]').value = '';
    document.querySelector('input[name="rounds"]').value = '';
    showModal('#modal-new-game');
}
//FUNKCJA DLA POCZATKOWEGO MODUAL
function modalStart (e) {
    e.preventDefault();
    document.querySelector('p.numbers span').textContent = game.numbers = 0; 
    document.querySelector('p.wins span').textContent = game.wins = 0;
    document.querySelector('p.losses span').textContent = game.losses = 0;
    document.querySelector('p.draws span').textContent = game.draws = 0;
    document.querySelector('[data-summary="who-win"]').textContent = '';
    document.querySelector('[data-summary="your-choice"]').textContent = '';
    document.querySelector('[data-summary="ai-choice"]').textContent = '';
    params.playerName = document.querySelector('input[name="firstname"]').value;
    params.numberRounds = document.querySelector('input[name="rounds"]').value;
    infoRounds.innerHTML = `${params.numberRounds} Rundy zostaly do rozegrania`
    params.play = true;
    document.querySelector('#modal-overlay').classList.remove('show');
    choice.innerHTML = params.playerName.toUpperCase();
}

//FUNKCJA WYBORU GRACZA KAMIEN NOZYCE PAPIER
function playerOption () {
    if (!params.play || params.numberRounds === 0) {
        showModal('#modal-warning');
        document.querySelector('#modal-warning .content p').innerHTML = 'Please press the NEW GAME button!';
        return;
    }
    params.playerMove = this.dataset.move;
    params.computerMove = computerChoice();
    var resultRound = gameResult(params.playerMove, params.computerMove);
    infoRounds.innerHTML = `${--params.numberRounds} Rundy zostaly do rozegrania`
    showResult(params.playerMove,params.computerMove,resultRound);
    params.progress = [];
    params.progress.push({
        playerChoice: params.playerMove,
        computerChoice: params.computerMove,
        winner: resultRound,
        playerWins: game.wins,
        computerWins: game.losses
    });
    table();
}

 function table () {
    for (var i = 0; i < params.progress.length; i++) {
        var row = document.createElement('tr');
        var strHtml = `<td> ${game.numbers} </td>
      <td> ${params.progress[i].playerChoice} </td>
      <td> ${params.progress[i].computerChoice} </td>
      <td> ${params.progress[i].winner} </td>
      <td> ${params.progress[i].playerWins} - ${params.progress[i].computerWins} </td>`

        row.innerHTML = strHtml;
        document.querySelector('tbody').appendChild(row);
        console.log(params.progress[i]);
    }
     if (params.numberRounds === 0) {
         showModal('#modal-show');
     }
}
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
}

//FUNKCJA PUBLIKACJA WYNKOW
function showResult(user,ai,result) {
    document.querySelector('[data-summary="your-choice"]').textContent = user;

    document.querySelector('[data-summary="ai-choice"]').textContent = ai;
    
    document.querySelector('p.numbers span').textContent = ++game.numbers;

    if (result === "win") {
        document.querySelector('p.wins span').textContent = ++game.wins;
        document.querySelector('[data-summary="who-win"]').textContent = "Ty wygrałeś!!!!"
        document.querySelector('[data-summary="who-win"]').style.color = "green";
    } else if (result === "losse") {
        document.querySelector('p.losses span').textContent = ++game.losses;
        document.querySelector('[data-summary="who-win"]').textContent = "Komputer wygrał :("
        document.querySelector('[data-summary="who-win"]').style.color = "red";
    } else {
        document.querySelector('p.draws span').textContent = ++game.draws;
        document.querySelector('[data-summary="who-win"]').textContent = "Remis :\\"
        document.querySelector('[data-summary="who-win"]').style.color = "gray";
    }

}












//NASLUCHIWACZE
btnStart.addEventListener('click',newGame);
modalBtnStart.parentElement.addEventListener('submit', modalStart);
buttons.forEach(button => button.addEventListener('click',playerOption));













//MODUALS
var modals = document.querySelectorAll('.modal');
//FUNCKJA POKAZUJACA MODUAL
function showModal (idModal) {
    for (var i = 0; i < modals.length; i++) {
        modals[i].classList.remove('show');
    };
    document.querySelector(idModal).classList.add('show');
    document.querySelector('#modal-overlay').classList.add('show');
};
//FUNKCJA UKRYWAJACA MODUAL
function hideModal (event) {
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

//Moduals
/*
var modals = document.querySelectorAll('.modal');

function showModal(event) {
    event.preventDefault();
    var id = "#" + event.target.href.split("#")[1];
    document.querySelector('#modal-overlay').classList.add('show');
    document.querySelector(id).classList.add('show');
};

var modalLinks = document.querySelectorAll('.show-modal');
for (var i = 0; i < modalLinks.length; i++) {
    modalLinks[i].addEventListener('click', showModal);
}

var hideModal = function (event) {
    event.preventDefault();
    document.querySelector('#modal-overlay').classList.remove('show');
};

var closeButtons = document.querySelectorAll('.modal .close');
for (var i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener('click', hideModal);
}

document.querySelector('#modal-overlay').addEventListener('click', hideModal);
var modals = document.querySelectorAll('.modal');
for (var i = 0; i < modals.length; i++) {
    modals[i].addEventListener('click', function (event) {
        event.stopPropagation();
    });
}
*/