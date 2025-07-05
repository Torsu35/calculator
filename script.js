// Targeting the elementDOM
const display = document.querySelector('#screen');
const clearBtn = document.querySelector('#clear');
const multipleBtn = document.querySelector('#multiply');
const divideBtn = document.querySelector('#divide');
const deleteBtn = document.querySelector('#delete');
const addBtn =document.querySelector('#add');
const minusBtn = document.querySelector('#minus');
const equalsBtn = document.querySelector('#equals');
const dotBtn = document.querySelector('#dot');
const btn1 = document.querySelector('#one');
const btn2 = document.querySelector('#two');
const btn3 = document.querySelector('#three');
const btn4 = document.querySelector('#four');
const btn5 = document.querySelector('#five');
const btn6 = document.querySelector('#six');
const btn7 = document.querySelector('#seven');
const btn8 = document.querySelector('#eight');
const btn9 = document.querySelector('#nine');
const btn0 = document.querySelector('#zero');

// creating functions for the basic math operators "+,-,*,/"

let addition = (a, b) => a + b;

let subtraction = (a, b) => a - b;

let multiply = (a, b) => a * b;

let divide = (a, b) => b === 0 ? "Syntax Error!" : a / b;

// creates variables to store elements of the operation

let rightOperand = null;
let leftOperand = null;
let operator= null;

// create the operate() to make the operation when called
function operate(num1, num2, sign){
    switch(sign){
        case "+":
           return addition(num1, num2);
           break;
        case "--":
            return subtraction(num1, num2);
            break;
        case "x":
            return multiply(num1, num2);
            break;
        case "÷":
            return divide(num1, num2);
            break;
        default:
            return "Error!!";

    }
}

// Hook up the buttons to make the calculator functional

const buttons = [btn0, btn1, btn2, btn3, btn4, btn5, btn6, btn7, btn8, btn9, dotBtn];

let chainCalc = false;

buttons.forEach((button) => {
    button.addEventListener('click', () =>{
        if(chainCalc){
            display.textContent = "";
            chainCalc = false;
        }

        if(waitingLeftOperand) {
            display.textContent = "";
            waitingLeftOperand = false;
            chainCalc = false;
        }


        display.textContent += button.textContent;

        if(display.textContent.includes(".")){
            dotBtn.disabled = true;
        }else {
            dotBtn.disabled = false;
        }
    });
});

const operators = [addBtn, minusBtn, multipleBtn, divideBtn];

let waitingLeftOperand = false;

operators.forEach((symbol) => {
    symbol.addEventListener('click', () => {

        let newValue = display.textContent;
        if (newValue === "") return;
        
        if(rightOperand === null){
            rightOperand = newValue.includes(".") ? parseFloat(newValue) : parseInt(newValue);
            display.textContent = "";
            waitingLeftOperand = true;
            
        }else if(waitingLeftOperand){
            operator = symbol.textContent;
            chainCalc = true;
            return;

        }else if(rightOperand && operator !== null){
            
            leftOperand = parseFloat(newValue);
            
            let result = operate(rightOperand, leftOperand, operator);
            
            display.textContent = Number.isInteger(result) 
            ? result 
            : result.toFixed(5).replace(/\.?0+$/, '');
            
            rightOperand = result;
            leftOperand = null;
            chainCalc = true;
            waitingLeftOperand = true;

        }
                
        operator = symbol.textContent;
        
    });
});

deleteBtn.addEventListener('click', () => {
    display.textContent = display.textContent.slice(0, -1);
});

clearBtn.addEventListener('click', () => {
    display.textContent = "";
    chainCalc = false;
    waitingLeftOperand = false;
    leftOperand = null;
    rightOperand = null;
    operator = null;
    dotBtn.disabled = false;

});

equalsBtn.addEventListener('click', () =>{
    if(rightOperand === null || operator === null) return;

    leftOperand = parseFloat(display.textContent);

    let result = operate(rightOperand, leftOperand, operator);
            
    display.textContent = Number.isInteger(result) 
    ? result 
    : result.toFixed(5).replace(/\.?0+$/, '');

    rightOperand = result;
    leftOperand = null;
    chainCalc = true;
    waitingLeftOperand = true;

});