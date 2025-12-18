// Node.js File System module
// https://nodejs.org/api/fs.html
const fs = require("fs");

// Read rules input and split by line
// String.split: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
const rules = fs.readFileSync("input.txt", "utf8").trim().split("\n");

// Map to store which bags can contain which other bags
// Key: bag color, Value: array of contained bag colors
const containsMap = new Map();

// Map to store counts for Part 2
// Key: bag color, Value: array of objects {color, count}
const containsCountMap = new Map();

// Parse each rule
for (const rule of rules) {
    const [outer, inner] = rule.split(" bags contain ");

    if (inner === "no other bags.") {
        containsMap.set(outer, []);
        containsCountMap.set(outer, []);
    } else {
        // Extract inner bag colors and counts
        // String.matchAll: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll
        const innerBags = Array.from(inner.matchAll(/(\d+) ([a-z ]+) bag/g)).map(match => match[2]);
        containsMap.set(outer, innerBags);

        const innerBagsWithCount = Array.from(inner.matchAll(/(\d+) ([a-z ]+) bag/g)).map(match => ({ color: match[2], count: Number(match[1]) }));
        containsCountMap.set(outer, innerBagsWithCount);
    }
}


//=======================================================//
//----------------------- Part 1 -----------------------//
//=====================================================//

// Recursive function to check if a bag can eventually contain "shiny gold"
// Set: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
function canContainShinyGold(color, memo = new Map()) {
    if (memo.has(color)) return memo.get(color);

    const contents = containsMap.get(color);
    if (contents.includes("shiny gold")) {
        memo.set(color, true);
        return true;
    }

    // Recursively check all contained bags
    for (const inner of contents) {
        if (canContainShinyGold(inner, memo)) {
            memo.set(color, true);
            return true;
        }
    }

    memo.set(color, false);
    return false;
}

// Count all bag colors that can eventually contain at least one shiny gold
let count = 0;
for (const color of containsMap.keys()) {
    if (canContainShinyGold(color)) {
        count++;
    }
}

// Output result for Part 1
console.log("Bag colors that can eventually contain at least one shiny gold bag:", count);


//=======================================================//
//----------------------- Part 2 -----------------------//
//=====================================================//

// Recursive function to count total bags inside a given bag
// Memoization map used to improve performance
function countBagsInside(color, memo = new Map()) {
    if (memo.has(color)) return memo.get(color);

    let total = 0;
    const contents = containsCountMap.get(color);

    for (const { color: innerColor, count } of contents) {
        // Total includes count of this bag plus all bags inside it
        total += count + count * countBagsInside(innerColor, memo);
    }

    memo.set(color, total);
    return total;
}

// Count all bags inside a single shiny gold bag
const totalInsideShinyGold = countBagsInside("shiny gold");

// Output result for Part 2
console.log("Total individual bags required inside 'shiny gold':", totalInsideShinyGold);