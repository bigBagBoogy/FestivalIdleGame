var totalScore;
var upgradeLevel = 1;
// var drinksLevel = 1;
var podiumUpgradeCost = 10;
var drinksUpgradeCost = 500;
var foodUpgradeCost = 800;
var baseScore = 0;
var increment = 1;
var nextLoop;
const levelData = {
  Level: {
    podium: "1",
    drinks: "1",
    food: "1",
    audio: "1",
    tshirts: "1",
    camping: "1",
  },
};
// Function to calculate the score based on time passed
function calculateScore() {
  // In this example, we'll use a simple counter to represent time
  setInterval(() => {
    nextLoop = baseScore + increment; // 1,2,3,4,5  after 1st upgrade increment will be 1.1 so baseScore: 1 + 1.1 = 2.1    then next loop:  2.1 + 1.1 = 3.2   then: 3.2 + 1.1 = 4.3
    totalScore = nextLoop;
    updateScore(totalScore);
    baseScore = nextLoop;
  }, 500); // Update score every quarter of a second (500 milliseconds)
}
// Function to update the score in the scoreboard bar
function updateScore(totalScore) {
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
    console.log("show arrow!");
    foodUpgradeArrowImg.style.display = "block"; //show
  } else {
    foodUpgradeArrowImg.style.display = "none"; // Hide the image
  }
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^//
//         PODIUM              //
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

function updatePodiumLevel() {
  var podiumLevel = levelData.Level.podium;
  // Get the level element and update its innerHTML with the current level
  const levelElement = document.getElementById("podiumLevel");
  levelElement.innerHTML = podiumLevel;
}
function calculatePodiumUpgradeCost() {
  podiumUpgradeCost = podiumUpgradeCost * levelData.Level.podium;
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

function updateDrinksImage() {
  console.log("updateDrinksLevelAndImage", drinksLevel);
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
}

function calculateDrinksUpgradeCost() {
  drinksUpgradeCost = drinksUpgradeCost * levelData.Level.drinks;
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

function calculateFoodUpgradeCost() {
  foodUpgradeCost = foodUpgradeCost * levelData.Level.food;
  return foodUpgradeCost;
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
  const SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

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
function calculateCombinedScore(stageStartOverLvl, totalScore) {
  const combinedScore = stageStartOverLvl * 1e51 + totalScore;
  // for this calculation to work, totalScore (skullies) must me capped at 1e50!!!! see bigBagBoogy.md
  return combinedScore; // This score(number) needs to be sent to src/GameProgressAndTopFive.sol
}

function cheat() {
  baseScore = totalScore * 5;
  console.log("cheater!");
}
