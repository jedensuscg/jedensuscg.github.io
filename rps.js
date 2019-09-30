let paperRock = "Paper Beats Rock:";
    let paperScissor = "Scissor Beats Paper:";
    let rockScissor = "Rock Beats Scissor:";
    let numberOfrounds = 5;
    let playerScore = 0;
    let compScore = 0;
    let tieScore = 0;

    playGame(numberOfrounds);
    displayScore();


    // Functions
    function playGame(numRounds)
    {

        for (let i = 0; i < numRounds; i++)
        {
            playRound(getPlayerSelection(), getComputerSelection())
        }

    }

    function playRound(playerselection, computerSelection)
    {

        console.log(`You Chose: ${playerselection}`)
        console.log(`Computers Chose: ${computerText(computerSelection)}`)

        switch (playerselection)
        {
            case "rock":
                if (computerSelection == 1)
                {
                    console.log("You Tied");
                    ++tieScore;
                }
                else if (computerSelection == 2)
                {
                    console.log(`${paperRock} YOU LOSE`);
                    ++compScore;
                }
                else
                {
                    console.log(`${rockScissor} YOU WIN`);
                    ++playerScore;
                }
                break;
            case "paper":
                if (computerSelection == 1)
                {
                    console.log(`${paperRock} YOU WIN!`);
                    ++playerScore;
                }
                else if (computerSelection == 2)
                {
                    console.log(`YOU TIED`);
                    ++tieScore
                }
                else
                {
                    console.log(`${paperScissor} YOU LOSE!`);
                    ++compScore;
                }
                break;
            case "scissors":
                if (computerSelection == 1)
                {
                    console.log(`${rockScissor} YOU LOSE!`)
                    ++compScore;
                }
                else if (computerSelection == 2)
                {
                    console.log(`${paperScissor} YOU WIN`)
                    ++playerScore;
                }
                else
                {
                    console.log(`YOU TIED`)
                    ++tieScore
                }
                break;
        }

    }

    function getPlayerSelection()
    {
        const button = document.querySelectorAll('.btn');
        button.forEach(btn => btn.addEventListener('click', function(e){
            console.log(e.target);
        }))
    }

    function getComputerSelection()
    {
        let compInput = randomInt(1, 3);
        return compInput;
    }

    function displayScore()
    {
        console.log(`Player Won ${playerScore} rounds, Computer won ${compScore} rounds, ${tieScore} rounds were a TIE.`)
        if (playerScore > compScore)
        {
            console.log("You WON the Game")
        }
        else if (playerScore == compScore)
        {
            console.log("You Tied the Game")
        }
        else
        {
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
        if (computerChoice == 1)
        {
            computerText = "rock"
        }
        else if (computerChoice == 2)
        {
            computerText = "paper"
        }
        else
        {
            computerText = "scissor"
        }
        return computerText;
    }
    // End Functions