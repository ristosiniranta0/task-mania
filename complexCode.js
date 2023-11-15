// filename: complexCode.js
// This code demonstrates a complex algorithm for evaluating mathematical expressions

function parseExpression(expression) {
  let outputQueue = [];
  let operatorStack = [];
  let operators = {
    '+': { precedence: 1 },
    '-': { precedence: 1 },
    '*': { precedence: 2 },
    '/': { precedence: 2 },
    '^': { precedence: 3 }
  };

  expression = expression.replace(/\s/g, '');

  let numberRegex = /\d+(?:\.\d+)?/g;
  let match;
  while ((match = numberRegex.exec(expression)) !== null) {
    outputQueue.push(parseFloat(match[0]));
  }

  let operatorRegex = /[+\-*/^]/g;
  while ((match = operatorRegex.exec(expression)) !== null) {
    let operator = match[0];
    let currentOperator = operators[operator];
    let previousOperator = operators[operatorStack[operatorStack.length - 1]];

    while (
      operatorStack.length > 0 &&
      previousOperator &&
      currentOperator.precedence <= previousOperator.precedence
    ) {
      outputQueue.push(operatorStack.pop());
      previousOperator = operators[operatorStack[operatorStack.length - 1]];
    }
    operatorStack.push(operator);
  }

  while (operatorStack.length > 0) {
    outputQueue.push(operatorStack.pop());
  }

  let outputStack = [];
  for (let i = 0; i < outputQueue.length; i++) {
    if (typeof outputQueue[i] === 'number') {
      outputStack.push(outputQueue[i]);
    } else if (operators[outputQueue[i]]) {
      let rightOperand = outputStack.pop();
      let leftOperand = outputStack.pop();

      let result = evaluate(
        outputQueue[i],
        leftOperand,
        rightOperand
      );
      outputStack.push(result);
    }
  }

  return outputStack[0];
}

function evaluate(operator, leftOperand, rightOperand) {
  switch (operator) {
    case '+':
      return leftOperand + rightOperand;
    case '-':
      return leftOperand - rightOperand;
    case '*':
      return leftOperand * rightOperand;
    case '/':
      return leftOperand / rightOperand;
    case '^':
      return Math.pow(leftOperand, rightOperand);
    default:
      throw Error('Invalid operator');
  }
}

let expression = "2 + 3 * (5 - 1) / 2 ^ 2";
let result = parseExpression(expression);
console.log(`The result of ${expression} is ${result}`);