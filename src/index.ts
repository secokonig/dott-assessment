import * as readline from 'readline';
import { Node } from './Node';
import { Tree } from './Tree';

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ''
});

let testCases: number = 0;
let m: number = 0;
let n: number = 0;
let arrayOfMatrices: number[][][] = [];
let inputMatrix: number[][] = [];
let currrentTestCase: number = 0;

rl.on('line', input => {

    if (input == '') {
        console.log(`new matrix detected! We are at input ${currrentTestCase}/${testCases}`);
        if (inputMatrix) {
            arrayOfMatrices.push(inputMatrix);
            inputMatrix = [];
        }
        if (currrentTestCase == testCases) {
            console.log('calculate output!');
            arrayOfMatrices.forEach( matrix => {
                console.log(`Oh hey, the distance from the first pixel is ${calculateDistance(matrix)}`);
            })
        }
        currrentTestCase = currrentTestCase++;
        m = 0;
        n = 0;
    } else {
        if (testCases == 0) {
            testCases = +input;
            currrentTestCase = 1;
            console.log(`Setting test cases to: ${testCases}`);
        } else {
            if (testCases != 0 && (m == 0 || n == 0)) {
                try {
                    [n, m] = input.trim().split(" ").map(value => +value);
                    if (!(n && m)) throw 'Yes, a bad input';
                    console.log(`Setting n and m to ${n}, ${m}`);
                } catch (error) {
                    console.log(`Bad input? - ${error}`);
                    process.exit(0);
                }
            } else {
                if (testCases != 0 && m != 0 && n != 0) {
                    try {
                        inputMatrix.push(Array.from(input).map(value => +value))
                        console.log(`Inputted this: ${Array.from(input).map(value => +value)}`)
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        }
    } 
})

/** Build a tree structure Breadth First where each vertex corresponds to a pixel 
*   in the input matrix and two vertices are connected with an edge if the distance
*   between them is 1;
*   The first white pixel encountered is the closest to the root of the tree.
*/
const calculateDistance = (matrix: number[][]) => {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            let groot = new Tree(new Node(i,j,0), matrix, n, m);
            return groot.calculateDistanceToNearestWhite(groot.root);
        }
    }
}