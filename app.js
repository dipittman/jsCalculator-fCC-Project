let previousResult = 0;
let operationOptions = ['+', '-', '*', '/'];
let currentOperation = "";
let lastKeyStroke = "";

const updateDisplay = (input) => {
  const display = document.getElementById("display");
  const secDisplay = document.getElementById("secondary-display");
  //initial digit pressed
  if(display.innerHTML === "0" && operationOptions.indexOf(input) === -1) {
    display.innerHTML = input;
    lastKeyStroke = input;
  //operation pressed
  } else 
  if (operationOptions.indexOf(input) >= 0) {
      //handles if double operation pressed
      if (operationOptions.indexOf(lastKeyStroke) >= 0) {
       if (input === "-") {
         display.innerHTML = input;
         lastKeyStroke = input;
       } else {
        currentOperation = input;
        lastKeyStroke = input;
        display.innerHTML = 0; 
       }
      } else 
      //handles immediate execution logic
      if (currentOperation === "") {
        //handles initial negative
        if (display.innerHTML === "0" && input === "-") {
            previousResult = display.innerHTML;
            secDisplay.innerHTML = previousResult;
            display.innerHTML = input;
            lastKeyStroke = input; 
        } else {
        currentOperation = input;
        previousResult = display.innerHTML;
        secDisplay.innerHTML = previousResult;
        display.innerHTML = 0;
        lastKeyStroke = input;
        }
      } 
      else {
        previousResult = calculate(previousResult, display.innerHTML, currentOperation);
        secDisplay.innerHTML = previousResult;
        display.innerHTML = 0;
        currentOperation = input;
        lastKeyStroke = input;  
      }
  } 
  //handles equals
  else if (input === 'equals') {
    display.innerHTML = calculate(previousResult, display.innerHTML, currentOperation);
    previousResult = 0;
    secDisplay.innerHTML = previousResult;
    currentOperation = "";
    lastKeyStroke = input;
    
  }
  //handles decimal
  else if (input === '.' && display.innerHTML.includes(".")) {
    lastKeyStroke = input; 
  } 
  //begins a new calculation if number typed directly after equals
  else if (lastKeyStroke === 'equals' && (typeof input === 'number' || input === '.')) {
    clearDisplay();
    display.innerHTML = input;
    lastKeyStroke = input;
  }
  //creates multidigit numbers
  else {
  display.innerHTML += input;
  lastKeyStroke = input;
  }
};

const clearDisplay = () => {
  const display = document.getElementById("display");
  const secDisplay = document.getElementById("secondary-display");
  display.innerHTML = 0;
  previousResult = 0;
  secDisplay.innerHTML = 0;
  currentOperation = "";
  lastKeyStroke = "clear";
  
}

const calculate = (first, second, operation) => {
    let result;
    first = parseFloat(first);
    second = parseFloat(second);
    switch(operation) {
        case '+': 
            result = first + second;
            break;
        case '-':
            result = first - second;
            break;
        case '*':
            result = first * second;
            break;
        case '/':
            result = first / second;
            break;
        default: 
            console.log("Something is wrong")
    }
    return result.toString();
}