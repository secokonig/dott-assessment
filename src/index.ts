import * as readline from 'readline';
import { Node } from './Node';
import { Tree } from './Tree';
import * as fs from 'fs';

let rl = readline.createInterface({
    input: (process.env.FILE_INPUT ? fs.createReadStream(process.env.FILE_INPUT) : process.stdin),
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
        if (inputMatrix) {
            arrayOfMatrices.push(inputMatrix);
            inputMatrix = [];
        }
        if (currrentTestCase == testCases) {
            arrayOfMatrices.forEach( matrix => {
                outputResults(calculateDistanceMatrix(matrix, n, m));
            });
            process.exit(0);
        }
        currrentTestCase = currrentTestCase+1;
        m = 0;
        n = 0;
    } else {
        if (testCases == 0) {
            testCases = +input;
            currrentTestCase = 1;
        } else {
            if (testCases != 0 && (m == 0 || n == 0)) {
                try {
                    [n, m] = input.trim().split(" ").map(value => +value);
                    if (!(n && m)) throw 'Yes, a bad input';
                } catch (error) {
                    console.log(`Caught a bad input? - ${error}`);
                    process.exit(0);
                }
            } else {
                if (testCases != 0 && m != 0 && n != 0) {
                    try {
                        inputMatrix.push(Array.from(input).map(value => +value))
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
const calculateDistanceMatrix = (matrix: number[][], n: number, m: number) => {
    let results: number[][] = [];
    for (let i = 0; i < matrix.length; i++) {
        results.push([]);
        for (let j = 0; j < matrix[0].length; j++) {
            let groot = new Tree(new Node(i,j,0), matrix, matrix.length, matrix[0].length);
            results[i].push(groot.iterateSearchTree());
        }
    }
    return results;
}

const outputResults = (matrix: number[][]) => {
    matrix.forEach( row => {
        let outputLine = '';
        row.forEach( (distance, index) => {
            outputLine = outputLine + (index == row.length-1 ? `${distance} ` : `${distance}`);
        });
        console.log(outputLine);
    });
    console.log('');
}