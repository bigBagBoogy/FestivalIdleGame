function calculateCombinedScore(stageStartOverLvl, totalScore) {
  const combinedScore = stageStartOverLvl * 1e51 + totalScore;
  // for this calculation to work, totalScore (skullies) must me capped at 1e50!!!! see bigBagBoogy.md

  return combinedScore;
}
//We could also put this function in the solidity contract, but if we call it internally,
//it will still cost gas.

///////////////////////////////////////////////////
//  Test the calculation with different values   //
///////////////////////////////////////////////////

//run tests with cli command:  node test/unit/combinedScore.js

const x = 2;
const y = 1;
const a = 1;
const b = 1e49;

const combinedScoreX = calculateCombinedScore(x, y);
const combinedScoreOpponent = calculateCombinedScore(a, b);

console.log(`Combined Score (x = ${x}, y = ${y}): ${combinedScoreX}`);
console.log(`Combined Score (a = ${a}, y = ${b}): ${combinedScoreOpponent}`);

// Check if the rule is satisfied
console.log(`Rule satisfied: ${combinedScoreX > combinedScoreOpponent}`);

/////////////////////////////////////////////////////
//   Pack all lvl data into one string to save gas //
/////////////////////////////////////////////////////

let podiumLvl = 3;
let drinksLvl = 5;
let foodLvl = 2;
let tshirtLvl = 1;
let audioLvl = 4;
let campingLvl = 7;
let stageStartOverLvl = 6;
let canBeAddedFunctionalityLaterLvl = 1;

// Function to prepend zeroes to a number until it has a certain length
function prependZeroes(number, length) {
  const stringValue = number.toString();
  return stringValue.padStart(length, "0");
}

// Format the values with leading zeroes and concatenate them
const concatenatedValue =
  prependZeroes(podiumLvl, 3) +
  prependZeroes(drinksLvl, 3) +
  prependZeroes(foodLvl, 3) +
  prependZeroes(tshirtLvl, 3) +
  prependZeroes(audioLvl, 3) +
  prependZeroes(campingLvl, 3) +
  prependZeroes(stageStartOverLvl, 3) +
  prependZeroes(canBeAddedFunctionalityLaterLvl, 3);

console.log(concatenatedValue); // Output: "003005002001004007006001"

// Deconstruct concatenatedValue = "003005002001004007006001"; // Replace with your concatenated value

// Function to remove leading zeroes from a string
function removeLeadingZeroes(str) {
  return str.replace(/^0+/, "");
}

// Important! It seems like in solidity, the first prepended zeroe(s) get lost.
// so 003005002001004007006001  comes back as 3005002001004007006001
// This may not be a real problem, but it's important to keep in mind
function deconstructConcatenatedValue(concatenatedValue) {
  // Deconstruct the concatenated value and assign to variables
  podiumLvl = parseInt(removeLeadingZeroes(concatenatedValue.substr(0, 3)), 10);
  drinksLvl = parseInt(removeLeadingZeroes(concatenatedValue.substr(3, 3)), 10);
  foodLvl = parseInt(removeLeadingZeroes(concatenatedValue.substr(6, 3)), 10);
  tshirtLvl = parseInt(removeLeadingZeroes(concatenatedValue.substr(9, 3)), 10);
  audioLvl = parseInt(removeLeadingZeroes(concatenatedValue.substr(12, 3)), 10);
  campingLvl = parseInt(
    removeLeadingZeroes(concatenatedValue.substr(15, 3)),
    10
  );
  stageStartOverLvl = parseInt(
    removeLeadingZeroes(concatenatedValue.substr(18, 3)),
    10
  );
  canBeAddedFunctionalityLaterLvl = parseInt(
    removeLeadingZeroes(concatenatedValue.substr(21, 3))
  );

  console.log(`podiumLvl: ${podiumLvl}`);
  console.log(`drinksLvl: ${drinksLvl}`);
  console.log(`foodLvl: ${foodLvl}`);
  console.log(`tshirtLvl: ${tshirtLvl}`);
  console.log(`audioLvl: ${audioLvl}`);
  console.log(`campingLvl: ${campingLvl}`);
  console.log(`stageStartOverLvl: ${stageStartOverLvl}`);
  console.log(
    `canBeAddedFunctionalityLaterLvl: ${canBeAddedFunctionalityLaterLvl}`
  );
}
deconstructConcatenatedValue(concatenatedValue);

//Write to blockchain in app.js: concatenatedValue
