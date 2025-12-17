// Node.js File System module for reading input files
// https://nodejs.org/api/fs.html
const fs = require("fs");

// Read input file, split by line, and convert each entry to a number
// fs.readFileSync: https://nodejs.org/api/fs.html#fsreadfilesyncpath-options
// String.split: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
// Array.map: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
const numbers = fs.readFileSync("input.txt", "utf8").trim().split("\n").map(Number);

// Target sum specified by the problem
const TARGET = 2020;

//========================================================//
//----------- Part 1: Two numbers sum to 2020 -----------//
//======================================================//

// Use a Set for fast lookups when checking complements
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
const seen = new Set();

// Single-pass two-sum algorithm (O(n))
for (const num of numbers) {
    const needed = TARGET - num;

    // If the complement exists, the solution is found
    // Set.has: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has
    if (seen.has(needed)) {
        console.log("Part 1:", num * needed);
        break;
    }

    // Store current value for future checks
    // Set.add: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add
    seen.add(num);
}

//==========================================================//
//----------- Part 2: Three numbers sum to 2020 -----------//
//========================================================//

// Fix one number, then reduce the problem to a two-sum search (O(n²))
for (let i = 0; i < numbers.length; i++) {
    const first = numbers[i];
    const remainder = TARGET - first;

    // New Set for each outer iteration
    const seenTwo = new Set();

    for (let j = i + 1; j < numbers.length; j++) {
        const current = numbers[j];
        const needed = remainder - current;

        // Check if the third value completes the sum
        if (seenTwo.has(needed)) {
            console.log("Part 2:", first * current * needed);

            // Exit once the correct combination is found
            // process.exit: https://nodejs.org/api/process.html#processexitcode
            process.exit(0);
        }

        // Track current value for the two-sum check
        seenTwo.add(current);
    }
}
