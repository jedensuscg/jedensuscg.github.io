var dividedByZero = false;
var equalHit = false;
var memoryMode = false;
var operSelected = false;
var mathHistory = [];
var currentOperation;
var currentOperationText;
var darkMode = false;
const lowerDisplayField = document.querySelector('#lowerDisplay');
const upperDisplayField = document.querySelector('#upperDisplay');
const operatorTextDisplay = document.querySelector('#operatorText');
const operatorKeys = document.querySelectorAll('#operator');
const numberKeys = document.querySelectorAll('.numberKey');
const decimalKey = document.querySelector('#keyDot');
const clearKey = document.querySelector('#keyClear');
const equalKey = document.querySelector('#keyEqual');
const historySpan = document.querySelector('#historySpan');
const errorTextField = document.querySelector('#errorText');
const memoryButtons = document.querySelectorAll('.memoryButton');
const memoryIndicators = document.querySelectorAll('.memoryIndicator');
const clearMemoryButton = document.querySelector('.clearMemoryButton')
const toggleLightButton = document.querySelector('#toggleLight');
const styleLink = document.querySelector('#style');


//#region =====ENUMS AND MODULES====
var operators = {
    1: add,
    2: sub,
    3: multiply,
    4: divide,
}
var operatorShortText = {
    1: "+",
    2: "-",
    3: "\xD7",
    4: "\xF7",
}

var memory = (function () {
    // use \u25BE for arrow
    var memory1 = '';
    var memory2 = '';
    var memory3 = '';
    var memoryPosition = '';

    function setMemory(value, position = memoryPosition) {
        switch (position) {
            case '1':
                memory1 = value;
                break;
            case '2':
                memory2 = value;
                break;
            case '3':
                memory3 = value;
                break;
            default:
        }
    }

    function setMemoryPosition(position) {
        memoryPosition = position;
    }

    function getMemoryPosition() {
        return memoryPosition;
    }
    function getMemory(memoryPosition) {
        switch (memoryPosition) {
            case '1':
                return memory1;
            case '2':
                return memory2
            case '3':
                return memory3
            default:
        }
    }
    function clearMemory(memoryPosition) {
        switch (memoryPosition) {
            case '1':
                memory1 = '';
            case '2':
                memory2 = '';
            case '3':
                memory3 = '';
            default:
        }
    }

    return {
        getMemory,
        setMemory,
        setMemoryPosition,
        getMemoryPosition,
        clearMemory,
    }

})();


var display = (function () { // Contains all functions and variables for the Display
    var upperDisplayText = '';
    var lowerDisplayText = "0";
    var errorText = '';
    var decimals;

    operatorTextDisplay.textContent = '  '

    //#region ---Upper Display Functions---
    function getUpperDisplayTextString() {
        return upperDisplayText;
    }
    function getUpperDisplayValue() {
        return parseFloat(UpperDisplayText);
    }

    function setUpperDisplayText(number) {
        decimals = countDecimalPlaces(number);
        upperDisplayText = parseFloat(number).toFixed(decimals);
        upperDisplayField.textContent = upperDisplayText;
    }
    //#endregion

    //#region ---Lower Display Functions---
    function setLowerOperatorText(operation) {
        operatorTextDisplay.textContent = operatorShortText[operation];
    }
    function getLowerDisplayTextString() {
        return lowerDisplayText;
    }
    function getLowerDisplayValue() {
        return parseFloat(lowerDisplayText);
    }

    function setLowerDisplayText(number) {
        if (lowerDisplayText === "0") {
            lowerDisplayText = number;
        }
        else {
            lowerDisplayText = lowerDisplayText + number;

        }
        lowerDisplayField.textContent = lowerDisplayText;
    }

    function setErrorText(error) {
        errorText = error;
        errorTextField.textContent = errorText;
        console.log(errorText)
    }

    function updateLowerDisplay() {
        lowerDisplayText = '';
        lowerDisplayField.textContent = lowerDisplayText;
    }

    function getDecimal() {
        return decimals;
    }
    //#endregion

    //#region ---Misc Display Functions---
    function clearDisplays() {
        mathHistory = [];
        lowerDisplayText = '0';
        lowerDisplayField.textContent = lowerDisplayText;
        upperDisplayText = '';
        upperDisplayField.textContent = upperDisplayText;
        operatorTextDisplay.textContent = '';
        historySpan.textContent = ''
        equalHit = false;
        errorText = '';
        errorTextField.textContent = errorText;
    }

    function equalDisplay() {
        equalHit = true;
        upperDisplayField.textContent = '';
        console.log(mathHistory)
        lowerDisplayField.textContent = value.getRunningTotal().toFixed(decimals);
        operatorTextDisplay.textContent = '';
        let newHistory = updateHistory(true) + '=' + value.getRunningTotal().toFixed(decimals);
        console.log(mathHistory)
        console.log(newHistory)
        historySpan.textContent = newHistory
    }
    //#endregion

    return {
        getLowerDisplayTextString,
        getLowerDisplayValue,
        setLowerDisplayText,
        setUpperDisplayText,
        getUpperDisplayTextString,
        getUpperDisplayValue,
        updateLowerDisplay,
        clearDisplays,
        setLowerOperatorText,
        equalDisplay,
        setErrorText,
        getDecimal,
    }
})();
var value = (function () { // Contains all the functions and variables for number input/output
    var runningTotal = 0;
    var num1 = 0;
    var num2 = 0;
    var userResponseKey = '';

    function resetValues() {
        runningTotal = 0;
        num1 = 0;
        num2 = 0;
    }
    function setRunningTotal(newNumber) {
        runningTotal = newNumber;
    }
    function getRunningTotal() {
        return runningTotal;
    }
    function getNum1() {
        return num1;
    }
    function setNum1(number) {
        num1 = number;
    }
    function getNum2() {
        return num2;
    }
    function setNum2(number) {
        num2 = number;
    }

    function setUserResponseKey(input) {
        userResponseKey = input;
    }

    function getUserReponseKey() {
        return userResponseKey;
    }

    return {
        getRunningTotal,
        setRunningTotal,
        getNum1,
        setNum1,
        getNum2,
        setNum2,
        getUserReponseKey,
        setUserResponseKey,
        resetValues,
    }

})();
//#endregion
addOperatorListeners();
addKeyPadListeners();
addMemoryButtonListeners();

function addKeyPadListeners() {
    numberKeys.forEach(key => {
        key.addEventListener('click', (e) => {
            if (!memoryMode) {
                if (display.getUpperDisplayTextString() == '' && e.target.getAttribute('key') == "0" && display.getLowerDisplayTextString() == "") {
                    display.setErrorText("Can't Start with 0");
                }
                else if (currentOperationText == "4" && e.target.getAttribute('key') == "0" && display.getLowerDisplayTextString() == '') {
                    display.setErrorText("Can't Divide By Zero!")
                    console.log(display.getLowerDisplayTextString())
                }
                else {
                    if (!currentOperation) {
                        if (e.target.getAttribute('key') == "0" && display.getLowerDisplayTextString() == '') {
                            display.setErrorText("Can't Start with 0");
                        }

                        else {
                            display.setLowerDisplayText(e.target.getAttribute('key'));
                            display.setErrorText('');
                        }

                    }
                    else {
                        display.setErrorText('');
                        display.setLowerDisplayText(e.target.getAttribute('key'))
                        value.setNum2(display.getLowerDisplayValue());
                        value.setRunningTotal(currentOperation(value.getNum1(), value.getNum2()));
                        display.setUpperDisplayText(value.getRunningTotal());
                    }
                }
            }
            else if (memoryMode) {
                if (e.target.getAttribute('key') == '9') {
                    let decimal = countDecimalPlaces(value.getRunningTotal());
                    storeToMemory(value.getRunningTotal().toFixed(decimal), memory.getMemoryPosition())
                    memoryIndicators[(memory.getMemoryPosition()) - 1].textContent = "\u25BE";
                    memoryMode = false;
                    setMemoryKeys(false)
                }
                else if (e.target.getAttribute('key') == '8') {
                    if (!currentOperation) {
                        display.setLowerDisplayText(memory.getMemory(memory.getMemoryPosition()));
                        display.setErrorText('');
                        memoryMode = false;
                        setMemoryKeys(false);

                    }
                    else {
                        if (memory.getMemory(memory.getMemoryPosition()) == '') {
                            display.setErrorText("Nothing To Recall")
                            memoryMode = false;
                            setMemoryKeys(false);
                        }
                        else {
                            display.setLowerDisplayText(memory.getMemory(memory.getMemoryPosition()))
                            value.setNum2(display.getLowerDisplayValue());
                            value.setRunningTotal(currentOperation(value.getNum1(), value.getNum2()));
                            display.setUpperDisplayText(value.getRunningTotal());
                            memoryMode = false;
                            setMemoryKeys(false);
                        }
                    }
                }
                else if (e.target.getAttribute('key') == '7') {
                    memoryMode = false;
                    setMemoryKeys(false);
                }
            }
        })

    });

    toggleLightButton.addEventListener('click', () => {
        swapStyle();
    });
}

function addOperatorListeners() {
    operatorKeys.forEach(key => {
        key.addEventListener('click', (e) => {
            display.setErrorText("")
            var number = (display.getUpperDisplayTextString() == '') ? display.getLowerDisplayTextString() : value.getRunningTotal()

            if (display.getUpperDisplayTextString() == '' && display.getLowerDisplayTextString() == '') {
                display.setErrorText("Divide by");
            }
            else if (number != '0' || equalHit) {
                display.setUpperDisplayText(number);
                value.setNum1(number);

                currentOperation = operators[e.target.getAttribute('data')];
                currentOperationText = e.target.getAttribute('data')

                if (!equalHit) {
                        mathHistory.push(display.getLowerDisplayTextString(), operatorShortText[currentOperationText]);
                }
                else {
                    mathHistory.push('', operatorShortText[currentOperationText]);
                    equalHit = false;
                }




            }
            if(operSelected) {
                console.log('op Sel')
                currentOperation = operators[e.target.getAttribute('data')];
                currentOperationText = e.target.getAttribute('data')
                mathHistory.pop()
                mathHistory.push(operatorShortText[currentOperationText])
            }
            console.log(updateHistory().toString())
            console.log(operSelected)

            display.updateLowerDisplay();
            display.setLowerOperatorText(currentOperationText);
            historySpan.textContent = updateHistory();
            operSelected = true; 
        });
    });
    clearKey.addEventListener('click', (e) => {
        display.clearDisplays();
        value.resetValues();
        number = ''
        currentOperation = undefined;

    });
    equalKey.addEventListener('click', (e) => {
        if (display.getLowerDisplayTextString() != '0') {
            mathHistory.push(display.getLowerDisplayTextString());
            historySpan.textContent = updateHistory(true);
            display.equalDisplay();
        }
    });

    decimalKey.addEventListener('click', (e) => {
        decimalTrue = display.getLowerDisplayTextString().includes('.');
        if (!decimalTrue) {
            display.setLowerDisplayText('.');
        }
    });
}

function addMemoryButtonListeners() {
    var clearMemory = false;
    clearMemoryButton.addEventListener('click', (e) => {
        display.setErrorText("Select memory button to clear")
        clearMemory = true;
    })
    memoryButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            let buttonClicked = e.target.getAttribute('data')
            console.log(memory.getMemory(1))
            console.log(memory.getMemory(2))
            console.log(memory.getMemory(3))
            if (!clearMemory) {
                memoryMode = true;
                setMemoryKeys(true);
                let valueToStore = value.getRunningTotal();
                memory.setMemoryPosition(buttonClicked);
                validateMemory(buttonClicked, valueToStore);
            }
            else if (clearMemory) {
                memory.clearMemory(memory.getMemoryPosition())
                memoryIndicators[(memory.getMemoryPosition()) - 1].textContent = ""
                clearMemory = false;
            }
        });

    })
}
function countDecimalPlaces(number) {
    if (number.toString().includes('.')) {
        var split = number.toString().split('.')
        var decimals = split[1].length

        if (decimals > 5) {
            decimals = 5;
        }
        return decimals;
    }
    else {
        return 0;
    }
}

function setMemoryKeys(change = false) {
    if (change) {
        numberKeys[0].value = 'STORE';
        numberKeys[1].value = 'RECALL';
        numberKeys[2].value = 'CANCEL';
        for (i = 0; i < 3; i++) {
            numberKeys[i].classList.remove('memOff')
            numberKeys[i].classList.add('memoryMode')
        }
    }
    else if (!change) {
        numberKeys[0].value = '9';
        numberKeys[1].value = '8';
        numberKeys[2].value = '7';
        for (i = 0; i < 3; i++) {
            numberKeys[i].classList.remove('memoryMode')
            numberKeys[i].classList.add('memOff')
        }
    }
}

function updateHistory(finished = false) {
    let firstComma = mathHistory.toString().lastIndexOf(',');
    let historyFull = mathHistory.join('')
    let historyPartial = mathHistory.slice();
    if (!finished) {
        historyPartial.pop();
        historyPartial.push('=');
    }
    return historyPartial.join('');
}

function validateMemory(position, number) {
    if (number) {
        if (memory.getMemory(position)) {
            numberKeys[0].value = "OVERWRITE"
        }
    }
    else if (!number && memory.getMemory(memory.getMemoryPosition()) == '') {
        display.setErrorText("Nothing To Store/Recall")
        setMemoryKeys(false)
        memoryMode = false;
    }
}

function storeToMemory(number, position) {
    memory.setMemory(number, position)
}

function swapStyle() {
    if(!darkMode) {
        styleLink.setAttribute('href', "darkstyle.css")
        darkMode = true;
    }
    else if (darkMode) {
        styleLink.setAttribute('href', "style.css")
        darkMode = false;
    }
}

//#region =====FORMULAS=====
function add(num1 = 0, num2 = 0) {
    return parseFloat(num1) + parseFloat(num2);
}

function sub(num1 = 0, num2 = 0) {
    return num1 - num2;
}

function multiply(num1 = 1, num2 = 1) {
    return num1 * num2;

}

function divide(num1 = 1, num2 = 1) {
    if (!num1 || !num2) {
        dividedByZero = true;
    }
    return (!num1 || !num2) ? "cant divide by 0" : num1 / num2
}


//#endregion