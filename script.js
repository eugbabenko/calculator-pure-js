class Calculator {
  constructor(previousNumberOnOutput, currentNumberOnOutput) {
    this.previousNumberOnOutput = previousNumberOnOutput;
    this.currentNumberOnOutput = currentNumberOnOutput;
    this.operations = {
      '+': (previousVariable, currentVariable) => previousVariable + currentVariable,
      '-': (previousVariable, currentVariable) => previousVariable - currentVariable,
      '×': (previousVariable, currentVariable) => previousVariable * currentVariable,
      '÷': (previousVariable, currentVariable) => previousVariable / currentVariable,
    }
    this.clearOutput();
  }

  clearOutput() {
    this.previousNumber = "";
    this.currentNumber = "";
    this.operator = undefined;
  }

  deleteNumberFromOutput() {
    this.currentNumber = this.currentNumber.toString().slice(0, -1);
  }

  addNumberToOutput(number) {
    if (number === "." && this.currentNumber.includes(".")) return;
    this.currentNumber += number.toString();
  }

  chooseOperator(operator) {
    if (this.currentNumber === "") return;
    if (this.previousNumber !== "") this.calculateResult();
    this.operator = operator;
    this.previousNumber = this.currentNumber;
    this.currentNumber = "";
  }

  calculateResult() {
    const previousVariable = parseFloat(this.previousNumber);
    const currentVariable = parseFloat(this.currentNumber);
    if (isNaN(previousVariable) || isNaN(currentVariable)) return;
    this.currentNumber = this.operations[this.operator](previousVariable, currentVariable);
    this.operator = undefined;
    this.previousNumber = "";
  }

  updateOutput() {
    this.currentNumberOnOutput.textContent = this.currentNumber;
    if (this.operator !== undefined) {
      this.previousNumberOnOutput.textContent = `${this.previousNumber} ${this.operator}`;
    } else {
      this.previousNumberOnOutput.textContent = "";
    }
  }
}

const numberBtn = document.querySelectorAll("[data-number]");
const operationBtn = document.querySelectorAll("[data-operation]");
const equalBtn = document.querySelector("[data-equal]");
const clearBtn = document.querySelector("[data-clear]");
const deleteBtn = document.querySelector("[data-delete]");
const previousNumberOnOutput = document.querySelector("[data-previous-number]");
const currentNumberOnOutput = document.querySelector("[data-current-number]");

const calculator = new Calculator(
  previousNumberOnOutput,
  currentNumberOnOutput
);

numberBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    calculator.addNumberToOutput(btn.textContent);
    calculator.updateOutput();
  });
});

operationBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    calculator.chooseOperator(btn.textContent);
    calculator.updateOutput();
  });
});

equalBtn.addEventListener("click", () => {
  calculator.calculateResult();
  calculator.updateOutput();
});

clearBtn.addEventListener("click", () => {
  calculator.clearOutput();
  calculator.updateOutput();
});

deleteBtn.addEventListener("click", () => {
  calculator.deleteNumberFromOutput();
  calculator.updateOutput();
});
