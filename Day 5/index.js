// Node.js File System module
// https://nodejs.org/api/fs.html
const fs = require("fs");

// Read input (one boarding pass per line)
// String.split: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
const passes = fs.readFileSync("input.txt", "utf8").trim().split("\n");


//=======================================================//
//----------------------- Part 1 -----------------------//
//=====================================================//

let highestSeatId = 0;
const seatIds = []; // We'll also use this for Part 2

for (const pass of passes) {
    // First 7 characters determine the row (F=0, B=1)
    // String.replace: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
    // parseInt with radix 2: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
    const row = parseInt(pass.slice(0, 7).replace(/F/g, "0").replace(/B/g, "1"), 2);

    // Last 3 characters determine the column (L=0, R=1)
    const column = parseInt(pass.slice(7).replace(/L/g, "0").replace(/R/g, "1"), 2);

    // Seat ID calculation
    const seatId = row * 8 + column;
    seatIds.push(seatId);

    // Track highest seat ID
    if (seatId > highestSeatId) {
        highestSeatId = seatId;
    }
}

// Output result for Part 1
console.log("Highest seat ID:", highestSeatId);



//=======================================================//
//----------------------- Part 2 -----------------------//
//=====================================================//

// Sort all seat IDs in ascending order
// Array.sort: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
seatIds.sort((a, b) => a - b);

let mySeat = null;

// Find the missing seat where the next ID is 2 higher
for (let i = 0; i < seatIds.length - 1; i++) {
    if (seatIds[i + 1] === seatIds[i] + 2) {
        mySeat = seatIds[i] + 1;
        break;
    }
}

// Output result for Part 2
console.log("My seat ID:", mySeat);
