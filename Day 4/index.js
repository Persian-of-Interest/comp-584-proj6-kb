// Node.js File System module
// https://nodejs.org/api/fs.html
const fs = require("fs");

// Read input and split passports by blank lines (CRLF-safe)
// String.split (regex): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
const passports = fs.readFileSync("input.txt", "utf8").trim().split(/\n\s*\n/);

// Required fields (cid is optional)
const requiredFields = [
  "byr",
  "iyr",
  "eyr",
  "hgt",
  "hcl",
  "ecl",
  "pid",
];

//=======================================================//
//----------------------- Part 1 -----------------------//
//=====================================================//

let validCount = 0;

// Check each passport
for (const passport of passports) {

    // Normalize fields into a single space-separated string
    // String.replace: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
    const fields = passport.replace(/\s+/g, " ");

    // Ensure all required fields are present
    // Array.every: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
    const isValid = requiredFields.every(field =>
        fields.includes(field + ":")
    );

    if (isValid) {
        validCount++;
    }
}

// Output result for Part 1
console.log("Valid passports:", validCount);


//=======================================================//
//----------------------- Part 2 -----------------------//
//=====================================================//

// Reset count for Part 2
let strictValidCount = 0;

// Validation rules for each field
const validators = {
    byr: v => /^\d{4}$/.test(v) && +v >= 1920 && +v <= 2002,
    iyr: v => /^\d{4}$/.test(v) && +v >= 2010 && +v <= 2020,
    eyr: v => /^\d{4}$/.test(v) && +v >= 2020 && +v <= 2030,

    hgt: v => {
        const match = v.match(/^(\d+)(cm|in)$/);
        if (!match) return false;

        const value = +match[1];
        const unit = match[2];

        if (unit === "cm") {
            return value >= 150 && value <= 193;
        }
        
        return value >= 59 && value <= 76;          
    },

    // Hair color: # followed by exactly 6 hex characters
    hcl: v => /^#[0-9a-f]{6}$/.test(v),
    // Eye color: one of the allowed values
    ecl: v => /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(v),
    // Passport ID: exactly 9 digits
    pid: v => /^\d{9}$/.test(v),
};

// Check each passport with strict validation
for (const passport of passports) {

    // Normalize fields into a single space-separated string
    const normalized = passport.replace(/\s+/g, " ");

    // Convert fields into an object
    const fieldMap = normalized.split(" ").reduce((obj, pair) => {
        const [key, value] = pair.split(":");
        obj[key] = value;
        return obj;
    }, {});

    // Ensure all required fields are present
    const hasAllFields = requiredFields.every(field =>
        field in fieldMap
    );

    if (!hasAllFields) continue;

    // Validate each required field's value
    const isStrictlyValid = requiredFields.every(field =>
        validators[field](fieldMap[field])
    );

    if (isStrictlyValid) {
        strictValidCount++;
    }
}

// Output result for Part 2
console.log("Strictly valid passports:", strictValidCount);
