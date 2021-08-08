import * as readline from 'readline';

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ''
});

let testCases: number = 0;
let m: Number = 0;
let n: Number = 0;
let inputsArray: any[] = [];
let inputMatrix: Number[][] = [];
let currrentTestCase: number = 0;

rl.on('line', input => {
    if (isNaN(+input)) console.log(`Input: ${input} is NaN.`);
    else {
        if (testCases == 0) {
            testCases = +input;
        } 
        if (testCases != 0 && (m == 0 || n == 0)) {
            try {
                [n, m] = input.trim().split(" ").map(value => +value);
            } catch (error) {
                console.log(`Bad input? - ${error}`)
            }
        }
        if (testCases != 0 && m != 0 && n != 0) {
            inputMatrix.push(Array.from(input).map(value => +value))
            console.log(`Inputted this: ${Array.from(input).map(value => +value)}`)
        }
        if (input == '\n') {
            console.log('new matrix detected!');
            currrentTestCase += 1;
            if (currrentTestCase == testCases) {
                console.log('calculate output');
            }
            m = 0;
            n = 0;
        }
    }

})