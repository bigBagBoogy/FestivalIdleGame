var totalScore;
var upgradeLevel = 1;
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
  setInterval(() => {
    nextLoop = baseScore + increment;
    totalScore = nextLoop;
    updateScore(totalScore);
    baseScore = nextLoop;
  }, 250);
}
/////////////////////////////////////////////////////////
// Functions to update the score in the scoreboard bar
////////////////////////////////////////////////////////
function updateScore(totalScore) {
  const scoreElement = document.getElementById("totalScore");
  scoreElement.innerHTML = Math.floor(totalScore);
}

/*********************** */
//   calculate cost      //
//*********************** */
function calculateUpgradeCost(item, upgradeMultiplier) {
  upgradeCost =
    levelData.Level[item] + levelData.Level[item] * upgradeMultiplier; // 1 *1 *20 =20 and 2 * 2 * 20 = 80
  console.log("upgrade to next level costs: ", upgradeCost);
  return upgradeCost;
}
///////////////////////////////
// Upgrade function template //
///////////////////////////////
function upgradeItem(item, upgradeMultiplier) {
  if (totalScore < calculateUpgradeCost(item, upgradeMultiplier)) {
    openPopup(`Not enough Skullies! Need: ${upgradeCost}`);
  } else {
    console.log(`Upgraded ${item}!`);
    totalScore -= upgradeCost;
    baseScore = totalScore;
    console.log("new totalScore: ", totalScore);
    increment = increment * (upgradeMultiplier / 10); // 2, 4, 8
    console.log("new increment: ", increment);
    levelData.Level[item]++; // 2, 3, 4
    console.log("level: ", levelData.Level[item]);
    updateScore(totalScore);

    console.log(`Updating ${item} level...`);
    updateUpgradeLevelAndImage(item);

    console.log(`${item} upgrade completed.`);
  }
}

///////////////
//  optics   //
///////////////
function updateUpgradeLevelAndImage() {
  /// text in top-bar
  const levelElement = document.getElementById(`${item}Level`);
  levelElement.innerHTML = levelData.Level[item];
  /// image
  const newDrinksImage = getDrinksImage(levelData.Level.drinks);
  updateItemImage("drinks", newDrinksImage);
}
function getDrinksImage(drinksLevel) {
  const drinksStallElement = document.getElementById("drinksStall");

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
  drinksStallElement.className = filterColor;
  console.log(`images/drinks.png#${filterColor}`);
  return `images/drinks.png#${filterColor}`;
}
///////////////
//  food     //
///////////////
function upgradeFood() {
  // 1st one to be called
  upgradeItem("food", foodUpgradeCost, 16); // id, calculated foodUpgradeCost, upgradeMultiplier
  console.log(`Food upgrade initiated. Current totalScore: ${totalScore}`);

  const newFoodImage = getFoodImage(levelData.Level.food);
  console.log(`New food image: ${newFoodImage}`);

  updateItemImage("food", newFoodImage); // id, the new level image that goes with the level calculated by the previous "upgradeItem" function.
  console.log("Food image updated.");

  console.log(getFoodImage(levelData.Level.food));
}

function getFoodImage(foodLevel) {
  const foodStallElement = document.getElementById("foodStall");

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
  foodStallElement.className = filterColor;
  console.log(`images/food.png#${filterColor}`);
  return `images/food.png#${filterColor}`;
}

// Call the calculateScore function to start updating the score
calculateScore();

// Rest of your code...
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
function cheat() {
  baseScore = totalScore + 1000;
}
