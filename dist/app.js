"use strict";
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.currentOperandTextElement = currentOperandTextElement;
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.'))
            return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    chooseOperation(operation) {
        if (this.currentOperand === '')
            return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current))
            return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
    }
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        }
        else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        }
        else {
            return integerDisplay;
        }
    }
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        }
        else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}
class ScientificCalculator extends Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        super(previousOperandTextElement, currentOperandTextElement);
    }
    sin() {
        this.currentOperand = Math.sin(parseFloat(this.currentOperand)).toString();
    }
    cos() {
        this.currentOperand = Math.cos(parseFloat(this.currentOperand)).toString();
    }
    tan() {
        this.currentOperand = Math.tan(parseFloat(this.currentOperand)).toString();
    }
    log() {
        this.currentOperand = Math.log(parseFloat(this.currentOperand)).toString();
    }
    sqrt() {
        this.currentOperand = Math.sqrt(parseFloat(this.currentOperand)).toString();
    }
    power() {
        if (this.currentOperand === '')
            return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = '^';
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current))
            return;
        if (this.operation === '^') {
            computation = Math.pow(prev, current);
            this.currentOperand = computation.toString();
            this.operation = undefined;
            this.previousOperand = '';
            return;
        }
        super.compute();
    }
}
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const scientificFunctionButtons = document.querySelectorAll('[data-scientific-function]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
// Initialize with a ScientificCalculator to include all functionalities
const calculator = new ScientificCalculator(previousOperandTextElement, currentOperandTextElement);
calculator.updateDisplay(); // Initial display update
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});
equalsButton === null || equalsButton === void 0 ? void 0 : equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});
allClearButton === null || allClearButton === void 0 ? void 0 : allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});
deleteButton === null || deleteButton === void 0 ? void 0 : deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});
scientificFunctionButtons.forEach(button => {
    button.addEventListener('click', () => {
        const func = button.innerText;
        switch (func) {
            case 'sin':
                calculator.sin();
                break;
            case 'cos':
                calculator.cos();
                break;
            case 'tan':
                calculator.tan();
                break;
            case 'log':
                calculator.log();
                break;
            case 'sqrt':
                calculator.sqrt();
                break;
            case '^':
                calculator.power();
                break;
            default:
                return;
        }
        calculator.updateDisplay();
    });
});
