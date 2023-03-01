import { Component } from '@angular/core';

interface Operator {
  symbol: string;
  calculate: (x: number, y: number) => number;
}

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {
  result = '0';
  currentNumber = 0;
  operator: Operator | null = null;
  operatorMap: { [key: string]: Operator } = {
    '+': { symbol: '+', calculate: (x, y) => x + y },
    '-': { symbol: '-', calculate: (x, y) => x - y },
    '*': { symbol: '*', calculate: (x, y) => x * y },
    '/': { symbol: '/', calculate: (x, y) => x / y },
  };

  numberClicked(num: number) {
      if (this.result === '0' || (this.result === '-0' && num !== 0)) {
        this.result = num.toString();
      } else {
        this.result += num.toString();
      }
      this.currentNumber = +this.result;
 }


  operatorClicked(operatorSymbol: string) {
    if (this.operator !== null) {
      this.calculate();
    }
    this.operator = this.operatorMap[operatorSymbol];
    this.result = '0';
  }

  clear() {
    this.result = '0';
    this.currentNumber = 0;
    this.operator = null;
  }

  calculate() {
    if (this.operator === null) {
      return;
    }
    const result = this.operator.calculate(this.currentNumber, +this.result);
    this.result = result.toString();
    this.currentNumber = result;
    this.operator = null;
  }
}

