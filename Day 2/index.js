// Node.js File System module
// https://nodejs.org/api/fs.html
const fs = require("fs");

// Read input file and split into policy/password lines
// fs.readFileSync: https://nodejs.org/api/fs.html#fsreadfilesyncpath-options
// String.split: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
const lines = fs.readFileSync("input.txt", "utf8").trim().split("\n");

let validPart1 = 0;
let validPart2 = 0;

// Process each policy/password entry
for (const line of lines) {

  // Format: "min-max letter: password"
  const [policy, password] = line.split(": ");
  const [range, letter] = policy.split(" ");
  const [min, max] = range.split("-").map(Number);

  //=======================================================//
  //----------- Part 1: Frequency-based policy -----------//
  //=====================================================//

  // Count how many times the letter appears in the password
  // String.split used as a simple counting technique
  const count = password.split(letter).length - 1;

  if (count >= min && count <= max) {
    validPart1++;
  }

  //======================================================//
  //----------- Part 2: Position-based policy -----------//
  //====================================================//

  // Positions are 1-based, so subtract 1 for string indexing
  // String indexing: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#character_access
  const firstMatch = password[min - 1] === letter;
  const secondMatch = password[max - 1] === letter;

  // Exactly one position must match (XOR logic)
  if (firstMatch !== secondMatch) {
    validPart2++;
  }
}

// Output results
// console.log: https://developer.mozilla.org/en-US/docs/Web/API/console/log
console.log("Part 1 - Valid passwords:", validPart1);
console.log("Part 2 - Valid passwords:", validPart2);
