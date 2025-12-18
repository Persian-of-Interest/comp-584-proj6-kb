// Node.js File System module
// https://nodejs.org/api/fs.html
const fs = require("fs");

// Read and clean the map input (handles Windows CRLF line endings)
const map = fs.readFileSync("input.txt", "utf8").trim().split("\n").map(line => line.trim());

const width = map[0].length;

//=======================================================//
//----------------------- Part 1 -----------------------//
//=====================================================//

function countTrees(right, down) {
    let row = 0;
    let col = 0;
    let trees = 0;

    // Move first, then check, until reaching the bottom
    while (true) {
        row += down;
        col += right;

        if (row >= map.length) break;
        
        // Wrap horizontally using modulo
        // Remainder operator: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder
        if (map[row][col % width] === "#") {
            trees++;
        }
    }

    return trees;
}

const part1 = countTrees(3, 1);
// Print Part 1 output
console.log("Part 1:", part1);

//=======================================================//
//----------------------- Part 2 -----------------------//
//=====================================================//

// Slopes to evaluate
const slopes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

// Calculate the product of trees encountered on each slope
// Array.reduce: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
const product = slopes.reduce((result, [right, down]) => {
  return result * countTrees(right, down);
}, 1);

// Print part 2 output
console.log("Part 2:", product);