let paperRock = "Paper Beats Rock:";
let paperScissor = "Scissor Beats Paper:";
let rockScissor = "Rock Beats Scissor:";
let numberOfRounds = 5;
let playerScore = 0;
let compScore = 0;
let tieScore = 0;
let checkEndgame = false;
let round = 0;
const buttons = document.querySelectorAll('.selectionButton');
const restart = document.querySelector('.restart');
roundColumn = document.querySelector('#roundNum');
playerColumn = document.querySelector('#playerScore');
compColumn = document.querySelector('#compScore');
let roundLog = document.querySelector('.roundLog');
const colorWin = "#008000";
const colorLose = "#ff0000";
const colorTie = "#ffff00";

const winner = {
    PLAYER: 'player',
    COMPUTER: 'computer',
    TIE: 'tie'
}

const image = {
    ROCK: 'images/rock.png',
    PAPER: 'images/paper.png',
    SCISSORS: 'images/scissors.png'
}

playGame();


// Functions
function playGame() {
    playRound();
    restart.addEventListener('click', (e) => {
        reload();
    });
    
}

function updateScores(playerselection, computerSelection) {

    console.log(`You Chose: ${playerselection}`)
    console.log(`Computers Chose: ${computerText(computerSelection)}`)
    ++round;
    console.log(`Round: ${round}`)


    let roundWinner;

    var roundStatus;
    switch (playerselection) {
        case "ROCK":
            if (computerSelection == 1) {
                console.log("You Tied");
                roundStatus = "You Tied";
                roundWinner = winner.TIE;
                ++tieScore;
            }
            else if (computerSelection == 2) {
                console.log(`${paperRock} YOU LOSE`);
                roundStatus = "You LOST";
                roundWinner = winner.COMPUTER;
                ++compScore;
            }
            else {
                console.log(`${rockScissor} YOU WIN`);
                roundStatus = "You WON";
                roundWinner = winner.PLAYER;
                ++playerScore;
            }
            break;
        case "PAPER":
            if (computerSelection == 1) {
                console.log(`${paperRock} YOU WIN!`);
                roundStatus = "You WON";
                roundWinner = winner.PLAYER;
                ++playerScore;
            }
            else if (computerSelection == 2) {
                console.log(`YOU TIED`);
                roundStatus = "You Tied";
                roundWinner = winner.TIE;
                ++tieScore
            }
            else {
                console.log(`${paperScissor} YOU LOSE!`);
                roundStatus = "You LOST";
                roundWinner = winner.COMPUTER;
                ++compScore;
            }
            break;
        case "SCISSORS":
            if (computerSelection == 1) {
                console.log(`${rockScissor} YOU LOSE!`)
                roundStatus = "You LOST";
                roundWinner = winner.COMPUTER;
                ++compScore;
            }
            else if (computerSelection == 2) {
                console.log(`${paperScissor} YOU WIN`)
                roundStatus = "You WON";
                roundWinner = winner.PLAYER;
                ++playerScore;
            }
            else {
                console.log(`YOU TIED`)
                roundStatus = "You Tied";
                roundWinner = winner.TIE;
                ++tieScore
            }
            break;
    }
    roundLog.textContent = `You Chose: ${playerselection} : Computer Chose: ${computerText(computerSelection)}` + "\n" + `${roundStatus} this round.`;
    updateScoreboard(roundWinner);
    displayImage(playerselection, computerSelection);
    checkForWinner();

}

function checkForWinner() {
    if(compScore == 5 || playerScore == 5) {
        checkEndgame = true;
        endGame();
    }
}

function playRound() {

    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            if(!checkEndgame){
            if(round == 0){
                updateScores(e.target.value, getComputerSelection());
            }
            else if ((round % 5) != 0) {
                updateScores(e.target.value, getComputerSelection());
            }
            else if(round % 5 == 0){
                clearScoreboard();
                updateScores(e.target.value, getComputerSelection());
            }  
        }     
        });
    });


}
function getComputerSelection() {
    let compInput = randomInt(1, 3);
    return compInput;
}

function updateScoreboard(roundWinner) {

    playerTotal = document.querySelector('#scorePlayer');
    compTotal = document.querySelector('#scoreComp');
    let playerWin;
    let computerWin;
    let scoreboardRoundNumber = document.createElement("span");
    let scoreboardPlayerSpan = document.createElement("span");
    let scoreboardCompSpan = document.createElement("span");
    scoreboardRoundNumber.textContent = round;
    spanRound = roundColumn.appendChild(scoreboardRoundNumber);
    spanRound.classList.add("roundNumberScorboard");
    
    if (roundWinner == winner.PLAYER) {
        playerWin = "W";
        computerWin = "L";
        scoreboardPlayerSpan.style.color = colorWin;
        scoreboardCompSpan.style.color = colorLose;
        document.getElementById("playerTitle").style.backgroundColor = colorWin;
        document.getElementById("compTitle").style.backgroundColor = colorLose;
    }
    if (roundWinner == winner.COMPUTER) {
        computerWin = "W";
        playerWin = "L";
        scoreboardPlayerSpan.style.color = colorLose;
        scoreboardCompSpan.style.color = colorWin;
        document.getElementById("playerTitle").style.backgroundColor = colorLose;
        document.getElementById("compTitle").style.backgroundColor = colorWin;
    }
    if (roundWinner == winner.TIE) {
        playerWin = "T";
        computerWin = "T";
        scoreboardPlayerSpan.style.color = colorTie;
        scoreboardCompSpan.style.color = colorTie;
        document.getElementById("playerTitle").style.backgroundColor = colorTie;
        document.getElementById("compTitle").style.backgroundColor = colorTie;
        document.getElementById("compTitle").style.color = "black";
        document.getElementById("playerTitle").style.color = "black";
    }

    scoreboardPlayerSpan.textContent = playerWin;
    scoreboardCompSpan.textContent = computerWin;
    console.log(playerWin);
    spanP = playerColumn.appendChild(scoreboardPlayerSpan);
    spanP.classList.add("playerRoundStatus");
    spanC = compColumn.appendChild(scoreboardCompSpan);
    spanC.classList.add("compRoundStatus");
    playerTotal.textContent = playerScore;
    compTotal.textContent = compScore;


}

function displayImage(playerselection, computerSelection) {
    console.log("selection:" + computerSelection)
    if (playerselection == 'PAPER') {
        document.getElementById("playerSRC").src = image.PAPER;
    }
    if (playerselection == 'ROCK') {
        document.getElementById("playerSRC").src = image.ROCK;
    }
    if (playerselection == 'SCISSORS') {
        document.getElementById("playerSRC").src = image.SCISSORS;
    }

    if (computerSelection == 2) {
        document.getElementById("compSRC").src = image.PAPER;
    }
    if (computerSelection == 1) {
        document.getElementById("compSRC").src = image.ROCK;
    }
    if (computerSelection == 3) {
        document.getElementById("compSRC").src = image.SCISSORS;
    }

}

function clearScoreboard(){
    PlayerRoundStatusChild = document.querySelectorAll(".playerRoundStatus");
    compRoundStatusChild = document.querySelectorAll(".compRoundStatus");
    playerScoreboard = document.getElementById("playerScore");
    compScoreboard = document.getElementById("compScore");
    scoreboardRoundNumber = document.querySelectorAll(".roundNumberScorboard");
    parentRound = document.getElementById("roundNum");
    PlayerRoundStatusChild.forEach(child => playerScoreboard.removeChild(child));
    compRoundStatusChild.forEach(child => compScoreboard.removeChild(child));
    scoreboardRoundNumber.forEach(child => parentRound.removeChild(child));
}

function finalScore() {
    let endgameMessage = `Player Won ${playerScore} rounds, Computer won ${compScore} rounds, ${tieScore} rounds were a TIE.`
    let endgameWinner;
    let winFlag = document.getElementById("winnerFlag");
    if (playerScore == 5) {
        endgameWinner = "You WON the Game";
        endgameColor = colorWin;
        winFlag.classList.remove("inProgress");
        winFlag.classList.add("playerWin");
    }
    if(compScore == 5){
        endgameWinner = "You LOST the Game"
        endgameColor = colorLose;
        winFlag.classList.remove("inProgress");
        winFlag.classList.add("compWin");
    }
/*     else if (playerScore == compScore) {
        endgameWinner = "You Tied the Game";
        endgameColor = colorTie;
    }
 */
    roundLog.textContent = `${endgameMessage} \n ${endgameWinner}`
    roundLog.style.color = endgameColor;

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
 buttons.forEach((button) => {
        button.removeEventListener('click', (e) => {
        });
    });
    finalScore();
}



function reload() {
    console.log("Restarting Game")
    playerScore = 0;
    compScore = 0;
    round = 0;
    roundLog.textContent = "";
    roundLog.style.color = "";
    checkEndgame = false;
    document.querySelector('#scoreComp').textContent = compScore;
    document.querySelector('#scorePlayer').textContent = playerScore;
    clearScoreboard();

    document.getElementById("playerTitle").style.backgroundColor = "";
    document.getElementById("compTitle").style.backgroundColor = "";
    document.getElementById("compTitle").style.color = "";
    document.getElementById("playerTitle").style.color = "";
    if (document.getElementById("winnerFlag").classList.contains("playerWin")) {
        document.getElementById("winnerFlag").classList.remove("playerWin");
    }
    if (document.getElementById("winnerFlag").classList.contains("compWin")) {
        document.getElementById("winnerFlag").classList.remove("compWin");
    }
    document.getElementById("winnerFlag").classList.add("inProgress");

    
    
    document.getElementById("playerSRC").src = "images/transparent.png";
    document.getElementById("compSRC").src = "images/transparent.png";
}
