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
  }
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^//
//         DRINKS              //
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

function updateDrinksImage() {
  var drinksLevel = levelData.Level.drinks;
  const drinksStallElement = document.getElementById("drinksStall");
  const drinksLevelBox = document.getElementById("drinksLevelBox");

  drinksStallElement.innerHTML = drinksLevel;
  drinksLevelBox.style.display = "inline-block"; // Show the level box

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

  // Update the image class and filter
  drinksStallElement.className = filterColor;

  // Update the text of the drinksLevelBox
  const drinksLevelText = document.getElementById("drinksLevelText");
  drinksLevelText.textContent = drinksLevel; // Update with the drinks level
  return;
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
  }
}
function updateDrinksImage() {
  var drinksLevel = levelData.Level.drinks;
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
  return;
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^//
//         foods               //
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

//  finish altering this///////////////////////////////////////
function updateFoodLevel() {
  var foodLevel = levelData.Level.food;
  // Get the level element and update its innerHTML with the current level
  const foodLevelElement = document.getElementById("foodLevel");
  foodLevelElement.innerHTML = foodLevel;

  if (levelData.Level.food > 1 && levelData.Level.food < 3) {
    document.getElementById("foodStall").src = "images/food-blue.png"; //update img upon leveling"
  } else if (levelData.Level.food > 2 && levelData.Level.food < 4) {
    document.getElementById("foodStall").src = "images/food-yellow.png";
  } else if (levelData.Level.food > 3 && levelData.Level.food < 5) {
    document.getElementById("foodStall").src = "images/food-red.png";
  } else if (levelData.Level.food > 4 && levelData.Level.food < 6) {
    document.getElementById("foodStall").src = "images/food-purple.png";
  } else {
  }
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
    console.log("podium level: ", levelData.Level.food);
    foodUpgradeCost = calculateFoodUpgradeCost();
    console.log("upgrade to next level costs: ", foodUpgradeCost);
    updateScore(totalScore);
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
    return String(number);
  } else {
    const tier = (Math.log10(number) / 3) | 0; // Determine the appropriate scale (e.g., "k", "M", etc.) and value
    const scaledValue = number / Math.pow(10, tier * 3);
    const formattedValue = scaledValue.toFixed(
      3 - Math.max(0, Math.floor(Math.log10(scaledValue)))
    ); // Format the value
    return `${formattedValue}${SI_SYMBOL[tier]}`;
  }
}

function cheat() {
  baseScore = totalScore * 2;
}
