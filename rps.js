let paperRock = "Paper Beats Rock:";
let paperScissor = "Scissor Beats Paper:";
let rockScissor = "Rock Beats Scissor:";
let numberOfRounds = 5;
let playerScore = 0;
let compScore = 0;
let tieScore = 0;
let round = 0;
const buttons = document.querySelectorAll('.selectionButton');
const restart = document.querySelector('.restart');
roundColumn = document.querySelector('#roundNum');
playerColumn = document.querySelector('#playerScore');
compColumn = document.querySelector('#compScore');
const winner = {
    PLAYER: 'player',
    COMPUTER: 'computer',
    TIE: 'tie'
}

playGame();


// Functions
function playGame() {
    getPlayerSelection();
    restart.addEventListener('click', (e) => {
        reload();
    });
}

function playRound(playerselection, computerSelection) {

    console.log(`You Chose: ${playerselection}`)
    console.log(`Computers Chose: ${computerText(computerSelection)}`)
    ++round;
    console.log(`Round: ${round}`)
    let roundLog = document.querySelector('.roundLog');

    let win;

    var roundStatus;
    switch (playerselection) {
        case "ROCK":
            if (computerSelection == 1) {
                console.log("You Tied");
                roundStatus = "You Tied";
                win = winner.TIE;
                ++tieScore;
            }
            else if (computerSelection == 2) {
                console.log(`${paperRock} YOU LOSE`);
                roundStatus = "You LOST";
                win = winner.COMPUTER;
                ++compScore;
            }
            else {
                console.log(`${rockScissor} YOU WIN`);
                roundStatus = "You WON";
                win = winner.PLAYER;
                ++playerScore;
            }
            break;
        case "PAPER":
            if (computerSelection == 1) {
                console.log(`${paperRock} YOU WIN!`);
                roundStatus = "You WON";
                win = winner.PLAYER;
                ++playerScore;
            }
            else if (computerSelection == 2) {
                console.log(`YOU TIED`);
                roundStatus = "You Tied";
                win = winner.TIE;
                ++tieScore
            }
            else {
                console.log(`${paperScissor} YOU LOSE!`);
                roundStatus = "You LOST";
                win = winner.COMPUTER;
                ++compScore;
            }
            break;
        case "SCISSORS":
            if (computerSelection == 1) {
                console.log(`${rockScissor} YOU LOSE!`)
                roundStatus = "You LOST";
                win = winner.COMPUTER;
                ++compScore;
            }
            else if (computerSelection == 2) {
                console.log(`${paperScissor} YOU WIN`)
                roundStatus = "You WON";
                win = winner.PLAYER;
                ++playerScore;
            }
            else {
                console.log(`YOU TIED`)
                roundStatus = "You Tied";
                win = winner.TIE;
                ++tieScore
            }
            break;
    }
    roundLog.textContent = `You Chose: ${playerselection} : Computer Chose: ${computerText(computerSelection)}` + "\n" + `${roundStatus} this round.`;
    displayScore(win);
}

function getPlayerSelection() {

    //if (round < numberOfRounds) {
    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            if (round <= numberOfRounds - 1) {
                playRound(e.target.value, getComputerSelection());
                if (round == numberOfRounds) {
                    endGame();
                }
            }

        });
    });
    // }
}
function getComputerSelection() {
    let compInput = randomInt(1, 3);
    return compInput;
}

function displayScore(win) {
    console.log(win);
    console.log(winner.PLAYER);

    playerTotal = document.querySelector('#scorePlayer');
    compTotal = document.querySelector('#scoreComp');
    let roundNumber = 1;
    let playerWin;
    let computerWin;
    let roundSpan = document.createElement("span");
    let playerSpan = document.createElement("span");
    let compSpan = document.createElement("span");
    roundSpan.textContent = round;
    spanRound = roundColumn.appendChild(roundSpan);
    spanRound.classList.add("newRound");
    if (win == winner.PLAYER) {
        playerWin = "W";
        computerWin = "L";
        playerSpan.style.color = "green";
        compSpan.style.color = "red";
    }
    if (win == winner.COMPUTER) {
        computerWin = "W";
        playerWin = "L";
        playerSpan.style.color = "red";
        compSpan.style.color = "green";
    }
    if (win == winner.TIE) {
        playerWin = "T";
        computerWin = "T";
        playerSpan.style.color = "yellow";
        compSpan.style.color = "yellow";
    }

    playerSpan.textContent = playerWin;
    compSpan.textContent = computerWin;
    console.log(playerWin);
    spanP = playerColumn.appendChild(playerSpan);
    spanP.classList.add("newPlayer");
    spanC = compColumn.appendChild(compSpan);
    spanC.classList.add("newComp");
    playerTotal.textContent = playerScore;
    compTotal.textContent = compScore;


}


function finalScore() {
    console.log(`Player Won ${playerScore} rounds, Computer won ${compScore} rounds, ${tieScore} rounds were a TIE.`)
    if (playerScore > compScore) {
        console.log("You WON the Game")
    }
    else if (playerScore == compScore) {
        console.log("You Tied the Game")
    }
    else {
        console.log("You LOST the Game")
    }
}

function randomInt(min, max) // Get random integer
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function computerText(computerChoice) // Converts computer selection from integer to string.
{
    let computerText;
    if (computerChoice == 1) {
        computerText = "ROCK"
    }
    else if (computerChoice == 2) {
        computerText = "PAPER"
    }
    else {
        computerText = "SCISSORS"
    }
    return computerText;
}

function endGame() {
    console.log("done");

    buttons.forEach((button) => {
        button.removeEventListener('click', (e) => {
            finalScore();
        });
    });
    finalScore();
}

function reload() {
    console.log("Restarting Game")
    playerScore = 0;
    compScore = 0;
    round = 0;
    childrenP = document.querySelectorAll(".newPlayer");
    childrenC = document.querySelectorAll(".newComp");
    parentP = document.getElementById("playerScore");
    parentC = document.getElementById("compScore");
    childrenRound = document.querySelectorAll(".newRound");
    parentRound = document.getElementById("roundNum");
    childrenP.forEach(child => parentP.removeChild(child));
    childrenC.forEach(child => parentC.removeChild(child));
    childrenRound.forEach(child => parentRound.removeChild(child));



}
