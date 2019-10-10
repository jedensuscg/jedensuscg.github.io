//#region CONSTANT AND GLOBALS
let mouseButtonPressed = false;
const container = document.getElementById("container");
const mouseButtonToDraw = document.getElementById("mouseButtonToDrawCheck");
const colors = document.querySelectorAll(".inkSwatch");
const classColors = ["gridSquareBlack", "gridSquareRed", "gridSquareBlue", "gridSquareGreen"];
//#endregion

//#region REVEALING MODULES AND MANAGERS
var gridSettingsModule = (function () {
   var boardSize = 500;
   var gridSize = 50;

   function changeBoardSize(newBoardSize) {
       boardSize = newBoardSize;
   }
   function changeGridSize(newGridSize) {
       gridSize = newGridSize;
   }
   function getBoardSize() {
       return boardSize;
   }
   function getGridSize() {
       return gridSize;
   }
   return {
       changeBoardSize,
       changeGridSize,
       getBoardSize,
       getGridSize
   }
})();
var colorManager = (function () {
    var inkColor = "gridSquareBlack"
    var colorToRemove;

    function changeInkColor(newInkColor) {
        inkColor = newInkColor;
    }
    function changeColorToRemove(removeColor) {
        colorToRemove = removeColor;
    }
    function getInkColor() {
        return inkColor;
    }
    function getColorToRemove() {
        return colorToRemove;
    }
    return {
        changeInkColor,
        changeColorToRemove,
        getInkColor,
        getColorToRemove
    }

 })();
//#endregion

addListeners();
start();

function start() {

    generateGrid(gridSettingsModule.getGridSize());
    addGridSquareListeners();
    showInfo();
}

//#region GRID GENERATION AND CONTROL
function generateGrid(currentGridSize) {
    let gridArray = [];
    for (let i = 0; i < currentGridSize; i++) {
        let row = document.createElement("div");
        row.className = "row";
        for (let x = 0; x < currentGridSize; x++) {
            let cell = document.createElement("div")
            cell.className = "gridSquare";
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function addGridSquareListeners() {
    // Add grid square listeners
    let squares = document.querySelectorAll(".gridSquare");
    squares.forEach((square) => {
        square.addEventListener('mousedown', drawInk, true)
    })
    squares.forEach((square) => {
        square.addEventListener('mouseover', drawInk, true)
    })
}

function eraseSquares() {
    let squares = document.querySelectorAll(".gridSquare");
    squares.forEach((square) => {
        if (square.getAttribute("data-colored") == 'true') {
            console.log("removing")
            square.classList.remove(square.getAttribute('data-color'));
            square.removeAttribute('data-color');
        }
    })
}

function resetBoard() {
    let squares = document.querySelectorAll(".gridSquare");
    squares.forEach((square) => {
        if (square.getAttribute("data-colored") == 'true') {
            console.log("removing")
            square.classList.remove(square.getAttribute('data-color'));
            square.removeAttribute('data-color');
        }
    })
    changeSize();
}

function changeSize() {
    let grid = document.getElementById("container");
    gridSettingsModule.changeBoardSize(document.getElementById("squareSize").value);
    grid.innerHTML = "";
    gridSettingsModule.changeGridSize(document.getElementById("gridSize").value);
    console.log(changeSize)
    grid.style.gridTemplateRows = `repeat(${gridSettingsModule.getGridSize()}, 1fr)`
    grid.style.gridTemplateColumns = `repeat(${gridSettingsModule.getGridSize()}, 1fr)`
    grid.style.setProperty('--grid-squares', gridSettingsModule.getGridSize());
    start();


    let displayBoardSize = gridSettingsModule.getBoardSize() + "px";
    document.documentElement.style.setProperty('--grid-size', displayBoardSize);

}
//#endregion

//#region COLOR FUNCTIONS
function drawInk(e) {

    if (mouseButtonToDraw.checked == true) {
        if (mouseButtonPressed) {
            console.log(checkForExistingColor(e))
            if (checkForExistingColor(e)) {
                e.target.classList.replace(colorManager.getColorToRemove(), colorManager.getInkColor());
                e.target.setAttribute('data-colored', true);
                e.target.setAttribute('data-color', colorManager.getInkColor());
            }
            if (!checkForExistingColor(e)) {
                e.target.classList.add(colorManager.getInkColor());
                e.target.setAttribute('data-colored', true)
                e.target.setAttribute('data-color', colorManager.getInkColor());
            }
        }
    }
    if (mouseButtonToDraw.checked == false) {
        if (!mouseButtonPressed) {
            console.log(checkForExistingColor(e))
            if (checkForExistingColor(e)) {
                e.target.classList.replace(colorManager.getColorToRemove(), colorManager.getInkColor());
                e.target.setAttribute('data-colored', true);
                e.target.setAttribute('data-color', colorManager.getInkColor());
            }
            if (!checkForExistingColor(e)) {
                e.target.classList.add(colorManager.getInkColor());
                e.target.setAttribute('data-colored', true);
                e.target.setAttribute('data-color', colorManager.getInkColor());
            }
        }
    }

};

function checkForExistingColor(event) {
    var containsColor;
    if (event.target.classList.contains(classColors[0])) {
        colorManager.changeColorToRemove(classColors[0]);
        containsColor = true;
        console.log(classColors[0])
    }
    else if (event.target.classList.contains(classColors[1])) {
        colorManager.changeColorToRemove(classColors[1]);
        containsColor = true;
        console.log(classColors[1])
    }
    else if (event.target.classList.contains(classColors[2])) {
        colorManager.changeColorToRemove(classColors[2]);
        containsColor = true;
        console.log(classColors[2])
    }
    else if (event.target.classList.contains(classColors[3])) {
        colorManager.changeColorToRemove(classColors[3]);
        containsColor = true;
        console.log(classColors[3])
    }
    else {
        containsColor = false;
    }
    return containsColor;

}

function deselectOtherColors() {
    console.log(colorManager.getInkColor())
    colors.forEach(col => {
        console.log(col.getAttribute("data-color"))
        if (col.getAttribute("data-color") != colorManager.getInkColor()) {
            col.classList.remove("inkSwatchSelected")
        }
    })
}
//#endregion

//#region HELPER AND MIST
function addListeners() {
    //Add reset button listener
    document.getElementById("erase").addEventListener("click", eraseSquares)
    document.getElementById("reset").addEventListener("click", resetBoard)

    //Add mouse button listener
    window.addEventListener('mousedown', (e) => {
        if (e) {
            mouseButtonPressed = true;
        }
    });
    window.addEventListener('mouseup', (e) => {
        if (e) {
            mouseButtonPressed = false;
        }
    })

    //Add color swatch listeners
    colors.forEach(color => {
        color.addEventListener('mousedown', (e) => {
            colorManager.changeInkColor(e.target.getAttribute("data-color"));
            console.log(colorManager.getInkColor())
            color.classList.add("inkSwatchSelected")
            deselectOtherColors();
        });
    })
}

function showInfo() {
    var resolutionLabel = document.getElementById("resolutionInfo");
    var boardSizeLabel = document.getElementById("boardSize");
    var squareSizeLabel = document.getElementById("totalSquares");
    resolutionLabel.textContent = `Board Resolution: ${gridSettingsModule.getGridSize()} X ${gridSettingsModule.getGridSize()} squares`
    boardSizeLabel.textContent = `Board Size: ${gridSettingsModule.getBoardSize()} X ${gridSettingsModule.getBoardSize()} pixels`
    squareSizeLabel.textContent = `Size of Each Square: ${gridSettingsModule.getBoardSize() / gridSettingsModule.getGridSize()} pixels`
}
//#endregion
