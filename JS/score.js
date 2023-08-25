var totalScore;
var upgradeLevel = 1;
// var drinksLevel = 1;
var podiumUpgradeCost = 10;
var drinksUpgradeCost = 100;
var foodUpgradeCost = 700;
var baseScore = 0;
var increment = 1;
var nextLoop;
var concatenatedValue;
var podiumBaseCost = 10;
var podiumGrowthFactor = 1.25;
var drinksBaseCost = 100;
var drinksGrowthFactor = 3;
var foodBaseCost = 700;
var foodGrowthFactor = 2.5;

const levelData = {
  Level: {
    canBeAddedFunctionalityLater: "1",
    podium: "1",
    drinks: "1",
    food: "1",
    tshirt: "1",
    audio: "1",
    camping: "1",
    stageStartOver: "1",
  },
};
let isUpdatingScore = false; // Flag to track if a score update is in progress
// Function to calculate the score based on time passed
function calculateScore() {
  // In this example, we'll use a simple counter to represent time
  setInterval(() => {
    if (!isUpdatingScore) {
      isUpdatingScore = true; // Set the flag to indicate an update is in progress
      nextLoop = baseScore + increment; // 1,2,3,4,5  after 1st upgrade increment will be 1.1 so baseScore: 1 + 1.1 = 2.1    then next loop:  2.1 + 1.1 = 3.2   then: 3.2 + 1.1 = 4.3
      totalScore = nextLoop;
      // console.log("Calling updateScore from calculateScore", totalScore);
      updateScore(totalScore);
      getConcatenatedValue();
      baseScore = nextLoop;
      isUpdatingScore = false; // Reset the flag after the update is complete
    }
  }, 1000); // Update score every quarter of a second (500 milliseconds)
}
// Function to update the score in the scoreboard bar
function updateScore(totalScore) {
  // console.log("updateScore called with totalScore:", totalScore);
  const scoreElement = document.getElementById("totalScore"); // Get the score element
  const formattedScore = formatNumberAbbreviated(totalScore);
  scoreElement.innerHTML = formattedScore;

  const upgradeArrowImg = document.getElementById("upgradeArrow");
  if (totalScore >= drinksUpgradeCost) {
    // console.log("show arrow!");
    upgradeArrowImg.style.display = "block"; //show
  } else {
    upgradeArrowImg.style.display = "none"; // Hide the image
  }
  const foodUpgradeArrowImg = document.getElementById("foodUpgradeArrow");
  if (totalScore >= foodUpgradeCost) {
    // console.log("show arrow!");
    foodUpgradeArrowImg.style.display = "block"; //show
  } else {
    foodUpgradeArrowImg.style.display = "none"; // Hide the image
  }
  const podiumUpgradeArrowImg = document.getElementById("podiumUpgradeArrow");
  if (totalScore >= podiumUpgradeCost) {
    // console.log("show arrow!");
    podiumUpgradeArrowImg.style.display = "block"; //show
  } else {
    podiumUpgradeArrowImg.style.display = "none"; // Hide the image
  }
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^//
//         PODIUM              //
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

function updatePodiumLevel() {
  var podiumLevel = levelData.Level.podium;
  // Get the level element and update its innerHTML with the current level
  const levelElement = document.getElementById("podiumLevel");
  levelElement.innerHTML = `lvl ${podiumLevel}`; // lvlup: ${podiumUpgradeCost}`; this is optional
}

//    podiumBaseCost = 10; podiumGrowthFactor = 2;
function calculatePodiumUpgradeCost() {
  const podiumLvl = levelData.Level.podium;
  // Calculate the cost using exponential growth formula
  var podiumUpgradeCost =
    podiumBaseCost * Math.pow(podiumGrowthFactor, podiumLvl);
  return podiumUpgradeCost;
}

function upgradePodium() {
  if (totalScore < podiumUpgradeCost) {
    /// below we turn 1234567 into 1.234m
    const formattedPodiumUpgradeCost =
      formatNumberAbbreviated(podiumUpgradeCost);
    ///                               ///
    openPopup(`Not enough Skullies!  need: ${formattedPodiumUpgradeCost}`);
  } else {
    totalScore -= podiumUpgradeCost;
    baseScore = totalScore;
    increment = increment * (15 / 10);
    levelData.Level.podium++;
    podiumUpgradeCost = calculatePodiumUpgradeCost();
    updateScore(totalScore);
    updatePodiumLevel();
    console.log(`Upgraded podium to level: ${levelData.Level.podium}`);
  }
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^//
//         DRINKS              //
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

function updateDrinksLevel() {
  var drinksLevel = levelData.Level.drinks;
  // Get the level element and update its innerHTML with the current level
  const levelElement = document.getElementById("drinksLevelText");
  levelElement.innerHTML = `lvl ${drinksLevel}`; // lvlup: ${drinksUpgradeCost}`; this is optional
}

// function calculateDrinksUpgradeCost() {
//   drinksUpgradeCost = drinksUpgradeCost * levelData.Level.drinks;
//   return drinksUpgradeCost;
// }
function calculateDrinksUpgradeCost() {
  const drinksLvl = levelData.Level.drinks;
  // Calculate the cost using exponential growth formula
  var drinksUpgradeCost =
    drinksBaseCost * Math.pow(drinksGrowthFactor, drinksLvl);
  return drinksUpgradeCost;
}

function upgradeDrinks() {
  if (totalScore < drinksUpgradeCost) {
    /// below we turn 1234567 into 1.234m
    const formattedDrinksUpgradeCost =
      formatNumberAbbreviated(drinksUpgradeCost);
    ///
    openPopup(`Not enough Skullies!  need: ${formattedDrinksUpgradeCost}`);
    console.log(totalScore);
  } else {
    console.log("upgraded drinks!");
    totalScore -= drinksUpgradeCost;
    baseScore = totalScore;
    console.log("new totalScore: ", totalScore);
    increment = increment * (19 / 10);
    console.log("new increment: ", increment);
    levelData.Level.drinks++;
    console.log("drinks level: ", levelData.Level.drinks);
    drinksUpgradeCost = calculateDrinksUpgradeCost();
    console.log("upgrade to next level costs: ", drinksUpgradeCost);
    updateScore(totalScore);
    updateDrinksImage();
    updateDrinksLevel(drinksUpgradeCost);
  }
}
function updateDrinksImage() {
  var drinksLevel = levelData.Level.drinks;
  console.log("updatedDrinksLevelAndImage", drinksLevel);

  // Determine filter color based on food level
  let filterColor = "green"; // Default color

  if (drinksLevel > 5 && drinksLevel < 7) {
    filterColor = "purple";
  } else if (drinksLevel > 4 && drinksLevel < 6) {
    filterColor = "purple";
  } else if (drinksLevel > 3 && drinksLevel < 5) {
    filterColor = "red";
  } else if (drinksLevel > 2 && drinksLevel < 4) {
    filterColor = "yellow";
  } else if (drinksLevel > 1 && drinksLevel < 3) {
    filterColor = "blue";
  }
  // Update the image class and filter
  drinksStall.className = filterColor; // Assign the class to the element
  // console.log(`images/drinks.png#${filterColor}`);
  return;
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^//
//         foods               //
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

//  finish altering this///////////////////////////////////////

function updateFoodLevel() {
  var foodLevel = levelData.Level.food;
  // Get the level element and update its innerHTML with the current level
  const foodLevelElement = document.getElementById("foodLevelText");
  foodLevelElement.innerHTML = `lvl ${foodLevel}`; // lvlup: ${foodUpgradeCost}`; this is optional
}
function calculateFoodUpgradeCost() {
  const foodLvl = levelData.Level.food;
  // Calculate the cost using exponential growth formula
  var foodUpgradeCost = foodBaseCost * Math.pow(foodGrowthFactor, foodLvl);
  return foodUpgradeCost;
}

function updateFoodImage() {
  var foodLevel = levelData.Level.food;
  console.log("updateFoodLevelAndImage", foodLevel);
  // Determine filter color based on food level
  let filterColor = "green"; // Default color
  if (foodLevel > 5 && foodLevel < 7) {
    filterColor = "purple";
  } else if (foodLevel > 4 && foodLevel < 6) {
    filterColor = "purple";
  } else if (foodLevel > 3 && foodLevel < 5) {
    filterColor = "red";
  } else if (foodLevel > 2 && foodLevel < 4) {
    filterColor = "yellow";
  } else if (foodLevel > 1 && foodLevel < 3) {
    filterColor = "blue";
  }
  // Update the image class and filter
  foodStall.className = filterColor; // Assign the class to the element
  console.log(`images/food.png#${filterColor}`);
  return;
}

function upgradeFood() {
  if (totalScore < foodUpgradeCost) {
    /// below we turn 1234567 into 1.234m
    const formattedFoodUpgradeCost = formatNumberAbbreviated(foodUpgradeCost);
    ///
    openPopup(`Not enough Skullies!  need: ${formattedFoodUpgradeCost}`);
    console.log(totalScore);
  } else {
    console.log("upgraded food!");
    totalScore -= foodUpgradeCost;
    baseScore = totalScore;
    console.log("new totalScore: ", totalScore);
    increment = increment * (16 / 10);
    console.log("new increment: ", increment);
    levelData.Level.food++;
    console.log("food level: ", levelData.Level.food);
    foodUpgradeCost = calculateFoodUpgradeCost();
    console.log("upgrade to next level costs: ", foodUpgradeCost);
    updateScore(totalScore);
    updateFoodImage();
    updateFoodLevel(foodUpgradeCost);
  }
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^//
//      HELPER FUNCTIONS       //
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

// Call the calculateScore function to start updating the score
calculateScore();

// Get elements
const openPopupButton = document.getElementById("openPopupButton");
const closePopupButton = document.getElementById("closePopupButton");
const popupContainer = document.getElementById("popupContainer");

function openPopup(message) {
  popupContainer.querySelector(".popup-content").textContent = message;
  popupContainer.style.display = "flex";
  setTimeout(closePopup, 2000); // Auto-close after 2 seconds
}
// Close popup
function closePopup() {
  popupContainer.style.display = "none";
}
function formatNumberAbbreviated(number) {
  const SI_SYMBOL = ["", "k", "M", "B", "T", "P", "E", "AA", "AB", "AC", "AE"];

  if (number < 1000) {
    // Handle numbers below 1000
    return String(Math.floor(number));
  } else {
    const tier = (Math.log10(number) / 3) | 0; // Determine the appropriate scale (e.g., "k", "M", etc.) and value
    const scaledValue = number / Math.pow(10, tier * 3);
    const formattedValue = scaledValue.toFixed(
      3 - Math.max(0, Math.floor(Math.log10(scaledValue)))
    ); // Format the value
    return `${formattedValue}${SI_SYMBOL[tier]}`;
  }
}

function freeCheat() {
  baseScore = totalScore * 5;
  console.log("cheater!");
}
/////////////////////////////////////////////////////////////
/////////        helpers for web3  traffic        //////////
/////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////
//   Pack all lvl data into one string to save gas //
/////////////////////////////////////////////////////

// Function to prepend zeroes to a number until it has a certain length
function prependZeroes(number, length) {
  const stringValue = number.toString();
  return stringValue.padStart(length, "0");
}

function getConcatenatedValue() {
  const canBeAddedFunctionalityLaterLvl =
    levelData.Level.canBeAddedFunctionalityLater;
  const podiumLvl = levelData.Level.podium;
  const drinksLvl = levelData.Level.drinks;
  const foodLvl = levelData.Level.food;
  const tshirtLvl = levelData.Level.tshirt;
  const audioLvl = levelData.Level.audio;
  const campingLvl = levelData.Level.camping;
  const stageStartOverLvl = levelData.Level.stageStartOver;
  // Format the values with leading zeroes and concatenate them
  concatenatedValue =
    prependZeroes(canBeAddedFunctionalityLaterLvl, 3) +
    prependZeroes(podiumLvl, 3) +
    prependZeroes(drinksLvl, 3) +
    prependZeroes(foodLvl, 3) +
    prependZeroes(tshirtLvl, 3) +
    prependZeroes(audioLvl, 3) +
    prependZeroes(campingLvl, 3) +
    prependZeroes(stageStartOverLvl, 3);

  //console.log(concatenatedValue); // Output: "001003005002001004007006" (example)
}

////////////////////////
///    load           //
////////////////////////

// Important! It seems like in solidity, the first prepended zero(s) get lost.
// so 003005002001004007006001  comes back as 3005002001004007006001
// This may not be a real problem, but it's important to keep in mind
//  EDIT: it IS a real problem. One solution might be to start with an element
// that has no leading zeroes(never goes beyond one digit(max lvl9))
// for now we we solve this by leading with our wildcard variable "canBeAddedFunctionalityLaterLvl"
// Function to remove leading zeroes from a string
function removeLeadingZeroes(str) {
  return str.replace(/^0+/, "");
}

// Deconstruct the concatenated value and assign to variables
// this function needs to be inside the "getPlayerProgress" function in connectWeb3.js
function deconstructConcatenatedValue(concatenatedValue) {
  canBeAddedFunctionalityLaterLvl = parseInt(
    removeLeadingZeroes(concatenatedValue.substr(0, 3))
  );
  podiumLvl = parseInt(removeLeadingZeroes(concatenatedValue.substr(3, 3)), 10);
  drinksLvl = parseInt(removeLeadingZeroes(concatenatedValue.substr(6, 3)), 10);
  foodLvl = parseInt(removeLeadingZeroes(concatenatedValue.substr(9, 3)), 10);
  tshirtLvl = parseInt(
    removeLeadingZeroes(concatenatedValue.substr(12, 3)),
    10
  );
  audioLvl = parseInt(removeLeadingZeroes(concatenatedValue.substr(15, 3)), 10);
  campingLvl = parseInt(
    removeLeadingZeroes(concatenatedValue.substr(18, 3)),
    10
  );
  stageStartOverLvl = parseInt(
    removeLeadingZeroes(concatenatedValue.substr(21, 3)),
    10
  );

  console.log(
    `canBeAddedFunctionalityLaterLvl: ${canBeAddedFunctionalityLaterLvl}`
  );
  console.log(`podiumLvl: ${podiumLvl}`);
  console.log(`drinksLvl: ${drinksLvl}`);
  console.log(`foodLvl: ${foodLvl}`);
  console.log(`tshirtLvl: ${tshirtLvl}`);
  console.log(`audioLvl: ${audioLvl}`);
  console.log(`campingLvl: ${campingLvl}`);
  console.log(`stageStartOverLvl: ${stageStartOverLvl}`);
}
// deconstructConcatenatedValue(concatenatedValue);

//Write to blockchain in connectWeb3.js: concatenatedValue
