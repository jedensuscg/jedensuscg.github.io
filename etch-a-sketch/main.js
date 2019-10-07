let container = document.getElementById("container");

let boardSize = 800;
let inkColor = "gridSquareBlack";
let shiftToDraw = document.getElementById("shiftDrawCheck");
let shiftKeyPressed = false;
let classToRemove;
let gridSize = 50;
console.log(gridSize)
let classColors = ["gridSquareBlack", "gridSquareRed", "gridSquareBlue", "gridSquareGreen"]
let drawInk = function (e) {
    if (shiftToDraw.checked == true) {
        if (shiftKeyPressed) {
            console.log(checkForExistingColor(e))
            if (checkForExistingColor(e)) {
                e.target.classList.replace(classToRemove, inkColor);
            }
            if (!checkForExistingColor(e)) {
                e.target.classList.add(inkColor);
            }
        }
    }
    if (shiftToDraw.checked == false) {
        if (!shiftKeyPressed) {
            console.log(checkForExistingColor(e))
            if (checkForExistingColor(e)) {
                e.target.classList.replace(classToRemove, inkColor);
            }
            if (!checkForExistingColor(e)) {
                e.target.classList.add(inkColor);
            }
        }
    }

};

function checkForExistingColor(event) {
    var containsColor;
    if (event.target.classList.contains(classColors[0])) {
        classToRemove = classColors[0];
        containsColor = true;
        console.log(classColors[0])
    }
   else if (event.target.classList.contains(classColors[1])) {
        classToRemove = classColors[1];
        containsColor = true;
        console.log(classColors[1])
    }
   else if (event.target.classList.contains(classColors[2])) {
        classToRemove = classColors[2];
        containsColor = true;
        console.log(classColors[2])
    }
   else if (event.target.classList.contains(classColors[3])) {
        classToRemove = classColors[3];
        containsColor = true;
        console.log(classColors[3])
    }
    else {
        containsColor = false;
    }
    return containsColor;

}

// Begin Functions
addSingleListeners();
start();

function start() {

    generateGrid(gridSize);
    addGridSquareListeners();
    showInfo();
}

function generateGrid(currentGridSize) {
    for (let i = 0; i < currentGridSize; i++) {
        let row = document.createElement("div");
        row.className = "row";
        for (let x = 0; x <= currentGridSize; x++) {
            let cell = document.createElement("div")
            cell.className = "gridSquare";
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function addSingleListeners() {
    //Add reset button listener
    document.getElementById("erase").addEventListener("click", eraseSquares)

    //Add shift key listener
    window.addEventListener('keydown', (e) => {
        if (e.keyCode == 16) {
            shiftKeyPressed = true;
        }
    });
    window.addEventListener('keyup', (e) => {
        if (e.keyCode == 16) {
            shiftKeyPressed = false;
        }
    })

    //Add color swatch listeners
    colors = document.querySelectorAll(".inkSwatch");
    colors.forEach(color => {
        color.addEventListener('click', (e) => {
            inkColor = e.target.getAttribute("data-color");
        });
    })
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
        if (square.classList.contains("gridSquareBlack")) {
            square.classList.remove("gridSquareBlack");
        }
    })
    changeSize();
}

function changeSize() {
    let grid = document.getElementById("container");
    boardSize = document.getElementById("squareSize").value;
    grid.innerHTML = "";
    gridSize = newSize = document.getElementById("gridSize").value;
    console.log(changeSize)
    grid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`
    grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`
    grid.style.setProperty('--grid-squares', gridSize);
    start();

    boardSize = boardSize + "px";
    grid.style.setProperty('--grid-size', boardSize);

}

function showInfo() {
    var resolutionLabel = document.getElementById("resolutionInfo");
    var boardSizeLabel = document.getElementById("boardSize");
    var squareSizeLabel = document.getElementById("totalSquares");
    resolutionLabel.textContent = `Board Resolution: ${gridSize} X ${gridSize} squares`
    boardSizeLabel.textContent = `Board Size: ${boardSize} X ${boardSize} pixels`
    squareSizeLabel.textContent = `Size of Each Square: ${boardSize / gridSize} pixels`
}
