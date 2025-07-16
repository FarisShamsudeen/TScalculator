class Calculator {
    protected currentOperand: string;
    protected previousOperand: string;
    protected operation: string | undefined;
    private currentOperandTextElement: HTMLElement;
    private previousOperandTextElement: HTMLElement;

    constructor(previousOperandTextElement: HTMLElement, currentOperandTextElement: HTMLElement) {
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

    appendNumber(number: string) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation: string) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation: number;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
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

    getDisplayNumber(number: string) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay: string;
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
    constructor(previousOperandTextElement: HTMLElement, currentOperandTextElement: HTMLElement) {
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

const numberButtons = document.querySelectorAll<HTMLButtonElement>('[data-number]');
const operatorButtons = document.querySelectorAll<HTMLButtonElement>('[data-operator]');
const equalsButton = document.querySelector<HTMLButtonElement>('[data-equals]');
const deleteButton = document.querySelector<HTMLButtonElement>('[data-delete]');
const allClearButton = document.querySelector<HTMLButtonElement>('[data-all-clear]');
const scientificFunctionButtons = document.querySelectorAll<HTMLButtonElement>('[data-scientific-function]');
const previousOperandTextElement = document.querySelector<HTMLDivElement>('[data-previous-operand]');
const currentOperandTextElement = document.querySelector<HTMLDivElement>('[data-current-operand]');

// Initialize with a ScientificCalculator to include all functionalities
const calculator = new ScientificCalculator(previousOperandTextElement!, currentOperandTextElement!);

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

equalsButton?.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton?.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton?.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});

scientificFunctionButtons.forEach(button => {
    button.addEventListener('click', () => {
        const func = button.innerText;
        switch (func) {
            case 'sin':
                (calculator as ScientificCalculator).sin();
                break;
            case 'cos':
                (calculator as ScientificCalculator).cos();
                break;
            case 'tan':
                (calculator as ScientificCalculator).tan();
                break;
            case 'log':
                (calculator as ScientificCalculator).log();
                break;
            case 'sqrt':
                (calculator as ScientificCalculator).sqrt();
                break;
            case '^':
                (calculator as ScientificCalculator).power();
                break;
            default:
                return;
        }
        calculator.updateDisplay();
    });
});