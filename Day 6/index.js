// Node.js File System module
// https://nodejs.org/api/fs.html
const fs = require("fs");

// Split groups safely (handles both LF and CRLF)
// String.split (regex): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
const groups = fs.readFileSync("input.txt", "utf8").trim().split(/\r?\n\r?\n/);


//=======================================================//
//----------------------- Part 1 -----------------------//
//=====================================================//

let sumAnyYes = 0;

for (const group of groups) {
    // Remove all whitespace (new lines, spaces) inside group
    const allAnswers = group.replace(/\s+/g, "");

    // Use Set to count unique answers
    // Set: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
    const uniqueAnswers = new Set(allAnswers);
    sumAnyYes += uniqueAnswers.size;
}

// Prints output for Part 1
console.log("Sum of counts (anyone answered yes):", sumAnyYes);


//=======================================================//
//----------------------- Part 2 -----------------------//
//=====================================================//

let sumEveryoneYes = 0;

for (const group of groups) {
    // Split group into individual person answers
    // String.split: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
    const people = group.trim().split(/\r?\n/);

    // Initialize a Set with the answers of the first person
    // Set: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
    let commonAnswers = new Set(people[0]);

    // Iterate over remaining people in the group
    for (let i = 1; i < people.length; i++) {
        const personSet = new Set(people[i]);

        // Intersection of sets: keep only answers everyone has
        // Array.from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
        commonAnswers = new Set([...commonAnswers].filter(x => personSet.has(x)));
    }

    sumEveryoneYes += commonAnswers.size;
}

// Prints output for Part 2
console.log("Sum of counts (everyone answered yes):", sumEveryoneYes);
