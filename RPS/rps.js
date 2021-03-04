//#region CONST DECLARATIONS
const paperRock = "Paper Beats Rock:";
const paperScissor = "Scissor Beats Paper:";
const rockScissor = "Rock Beats Scissor:";
const buttons = document.querySelectorAll('.selectionButton');
const restart = document.querySelector('.restart');
const roundColumn = document.querySelector('#roundNum');
const playerColumn = document.querySelector('#playerScore');
const compColumn = document.querySelector('#compScore');
const roundLog = document.querySelector('.roundLog');
const colorWin = "#008000";
const colorLose = "#ff0000";
const COLORTIE = "#ffff00";
//#endregion

//#region MODULES AND MANAGERS
var gameManager = (function () {
    var isEndOFGame = false;
    var round = 0;

    function increaseRound() {
        round++;
    }

    function resetRound() {
        round = 0;
    }

    function endGame(bool) {
        isEndOFGame = bool;
    }

    function getIsEndOfGame() {
        return isEndOFGame;
    }

    function getRound() {
        return round;
    }
    return {
        getRound,
        getIsEndOfGame,
        resetRound,
        increaseRound,
        endGame,

    }
})();

var scoreModule = (function () {
    var playerScore = 0;
    var compScore = 0;
    var tieScore = 0;

    function addPlayerScore() {
        playerScore++;
    }

    function addCompScore() {
        compScore++;
    }

    function addTieScore() {
        tieScore++
    }

    function resetScores() {
        playerScore = 0;
        compScore = 0;
    }

    function getPlayerScore() {
        return playerScore;
    }

    function getCompScore() {
        return compScore;
    }

    function getTieScore() {
        return tieScore;
    }
    return {
        getTieScore,
        getPlayerScore,
        getCompScore,
        addTieScore,
        addPlayerScore,
        addCompScore,
        resetScores
    }
})();

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
//#endregion

//#region MAIN LOGIC AND GAME FUNCTIONS
function playGame() {
    playRound();
    restart.addEventListener('click', (e) => {
        resetGame();
    });
}

function findRoundWinner(playerselection, computerSelection) {
    console.log(`You Chose: ${playerselection}`)
    console.log(`Computers Chose: ${computerText(computerSelection)}`)
    gameManager.increaseRound();
    console.log(`Round: ${gameManager.getRound()}`)

    let roundWinner;

    var roundStatus;
    switch (playerselection) {
        case "ROCK":
            if (computerSelection == 1) {
                console.log("You Tied");
                roundStatus = "You Tied";
                roundWinner = winner.TIE;
                scoreModule.addTieScore();
            }
            else if (computerSelection == 2) {
                console.log(`${paperRock} YOU LOSE`);
                roundStatus = "You LOST";
                roundWinner = winner.COMPUTER;
                scoreModule.addCompScore();
            }
            else {
                console.log(`${rockScissor} YOU WIN`);
                roundStatus = "You WON";
                roundWinner = winner.PLAYER;
                scoreModule.addPlayerScore();
            }
            break;
        case "PAPER":
            if (computerSelection == 1) {
                console.log(`${paperRock} YOU WIN!`);
                roundStatus = "You WON";
                roundWinner = winner.PLAYER;
                scoreModule.addPlayerScore();
            }
            else if (computerSelection == 2) {
                console.log(`YOU TIED`);
                roundStatus = "You Tied";
                roundWinner = winner.TIE;
                scoreModule.addTieScore();
            }
            else {
                console.log(`${paperScissor} YOU LOSE!`);
                roundStatus = "You LOST";
                roundWinner = winner.COMPUTER;
                scoreModule.addCompScore();
            }
            break;
        case "SCISSORS":
            if (computerSelection == 1) {
                console.log(`${rockScissor} YOU LOSE!`)
                roundStatus = "You LOST";
                roundWinner = winner.COMPUTER;
                scoreModule.addCompScore();
            }
            else if (computerSelection == 2) {
                console.log(`${paperScissor} YOU WIN`)
                roundStatus = "You WON";
                roundWinner = winner.PLAYER;
                scoreModule.addPlayerScore();
            }
            else {
                console.log(`YOU TIED`)
                roundStatus = "You Tied";
                roundWinner = winner.TIE;
                scoreModule.addTieScore();
            }
            break;
    }
    roundLog.textContent = `You Chose: ${playerselection} : Computer Chose: ${computerText(computerSelection)}` + "\n" + `${roundStatus} this round.`;
    updateScoreboard(roundWinner);
    displayImage(playerselection, computerSelection);
    checkForWinner();

}

function checkForWinner() {
    if (scoreModule.getCompScore() == 5 || scoreModule.getPlayerScore() == 5) {
        gameManager.endGame(true);
        endGame();
    }
}

function playRound() {

    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            if (!(gameManager.getIsEndOfGame())) {
                if (gameManager.getRound() == 0) {
                    findRoundWinner(e.target.value, getComputerSelection());
                }
                else if ((gameManager.getRound() % 5) != 0) {
                    findRoundWinner(e.target.value, getComputerSelection());
                }
                else if (gameManager.getRound() % 5 == 0) {
                    clearScoreboard();
                    findRoundWinner(e.target.value, getComputerSelection());
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
    scoreboardRoundNumber.textContent = gameManager.getRound();
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
        scoreboardPlayerSpan.style.color = COLORTIE;
        scoreboardCompSpan.style.color = COLORTIE;
        document.getElementById("playerTitle").style.backgroundColor = COLORTIE;
        document.getElementById("compTitle").style.backgroundColor = COLORTIE;
        document.getElementById("compTitle").style.color = "black";
        document.getElementById("playerTitle").style.color = "black";
    }

    scoreboardPlayerSpan.textContent = playerWin;
    scoreboardCompSpan.textContent = computerWin;
    spanP = playerColumn.appendChild(scoreboardPlayerSpan);
    spanP.classList.add("playerRoundStatus");
    spanC = compColumn.appendChild(scoreboardCompSpan);
    spanC.classList.add("compRoundStatus");
    playerTotal.textContent = scoreModule.getPlayerScore();
    console.log("Player Total: " + scoreModule.getPlayerScore());
    compTotal.textContent = scoreModule.getCompScore();


}

function clearScoreboard() {
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
    let endgameMessage = `Player Won ${scoreModule.getPlayerScore()} rounds, Computer won ${scoreModule.getCompScore()} rounds, ${scoreModule.getTieScore()} rounds were a TIE.`
    let endgameWinner;
    let winFlag = document.getElementById("winnerFlag");
    if (scoreModule.getPlayerScore() == 5) {
        endgameWinner = "You WON the Game";
        endgameColor = colorWin;
        winFlag.classList.remove("inProgress");
        winFlag.classList.add("playerWin");
    }
    if (scoreModule.getCompScore() == 5) {
        endgameWinner = "You LOST the Game"
        endgameColor = colorLose;
        winFlag.classList.remove("inProgress");
        winFlag.classList.add("compWin");
    }
    roundLog.textContent = `${endgameMessage} \n ${endgameWinner}`
    roundLog.style.color = endgameColor;

}

function endGame() {
    buttons.forEach((button) => {
        button.removeEventListener('click', (e) => {
        });
    });
    finalScore();
}

function resetGame() {
    console.log("Restarting Game")
    scoreModule.resetScores();
    gameManager.resetRound();
    roundLog.textContent = "";
    roundLog.style.color = "";
    gameManager.endGame(false);
    document.querySelector('#scoreComp').textContent = scoreModule.getCompScore();
    document.querySelector('#scorePlayer').textContent = scoreModule.getPlayerScore();
    
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
//#endregion

//#region HELPER AND MISC FUCTIONS
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
function randomInt(min, max) // Get random integer
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//#endregion

playGame();
