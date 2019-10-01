let paperRock = "Paper Beats Rock:";
let paperScissor = "Scissor Beats Paper:";
let rockScissor = "Rock Beats Scissor:";
let numberOfRounds = 5;
let playerScore = 0;
let compScore = 0;
let tieScore = 0;
let round = 0;
const buttons = document.querySelectorAll('.btn');
const restart = document.querySelector('.restart');

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
    var thisRound = document.querySelector('.currentRound');
    
    var roundStatus;
    switch (playerselection) {
        case "ROCK":
            if (computerSelection == 1) {
                console.log("You Tied");
                roundStatus = "You Tied";
                ++tieScore;
            }
            else if (computerSelection == 2) {
                console.log(`${paperRock} YOU LOSE`);
                roundStatus = "You LOST";
                ++compScore;
            }
            else {
                console.log(`${rockScissor} YOU WIN`);
                roundStatus = "You WON";
                ++playerScore;
            }
            break;
        case "PAPER":
            if (computerSelection == 1) {
                console.log(`${paperRock} YOU WIN!`);
                roundStatus = "You WON";
                ++playerScore;
            }
            else if (computerSelection == 2) {
                console.log(`YOU TIED`);
                roundStatus = "You Tied";
                ++tieScore
            }
            else {
                console.log(`${paperScissor} YOU LOSE!`);
                roundStatus = "You LOST";
                ++compScore;
            }
            break;
        case "SCISSORS":
            if (computerSelection == 1) {
                console.log(`${rockScissor} YOU LOSE!`)
                roundStatus = "You LOST";
                ++compScore;
            }
            else if (computerSelection == 2) {
                console.log(`${paperScissor} YOU WIN`)
                roundStatus = "You WON";
                ++playerScore;
            }
            else {
                console.log(`YOU TIED`)
                roundStatus = "You Tied";
                ++tieScore
            }
            break;
    }
    thisRound.textContent=`You Chose: ${playerselection} : Computer Chose: ${computerText(computerSelection)}` + "\n" + `${roundStatus} this round.`
}

function getPlayerSelection() {

    //if (round < numberOfRounds) {
    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            if (round <= numberOfRounds -1 ) {
                playRound(e.target.value, getComputerSelection());
                if ( round == numberOfRounds) {
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


function displayScore() {
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
            displayScore();
        });
    });
    displayScore();
}

function reload() {
    console.log("Restarting Game")
    playerScore = 0;
    compScore = 0;
    round = 0;
}