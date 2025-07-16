export class ScientificCalculator extends Calculator {
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
