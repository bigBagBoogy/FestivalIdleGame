var totalScore;
var upgradeLevel = 1;
// var drinksLevel = 1;
var podiumUpgradeCost = 10;
var drinksUpgradeCost = 500;
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
  }, 250); // Update score every quarter of a second (250 milliseconds)
}
// Function to update the score in the scoreboard bar
function updateScore(totalScore) {
  // Get the score element and update its innerHTML with the current score
  const scoreElement = document.getElementById("totalScore");
  scoreElement.innerHTML = Math.floor(totalScore);
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
    openPopup(`Not enough Skullies!  need: ${podiumUpgradeCost}`);
    console.log(totalScore);
  } else {
    console.log("upgraded podium!");
    totalScore -= podiumUpgradeCost;
    baseScore = totalScore;
    console.log("new totalScore: ", totalScore);
    increment = increment * (15 / 10);
    console.log("new increment: ", increment);
    levelData.Level.podium++;
    console.log("podium level: ", levelData.Level.podium);
    podiumUpgradeCost = calculatePodiumUpgradeCost();
    console.log("upgrade to next level costs: ", podiumUpgradeCost);
    updateScore(totalScore);
    updatePodiumLevel();
    console.log("new totalScore: ", totalScore);
  }
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^//
//         DRINKS              //
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
function updateDrinksLevel() {
  var drinksLevel = levelData.Level.drinks;
  // Get the level element and update its innerHTML with the current level
  const drinksLevelElement = document.getElementById("drinksLevel");
  drinksLevelElement.innerHTML = drinksLevel;

  if (levelData.Level.drinks > 1 && levelData.Level.drinks < 3) {
    document.getElementById("drinksLevelImage").src =
      "images/beer-bar-3d-yellow.png"; //update img src to src="images/drinks3.png"
  } else {
    document.getElementById("drinksLevelImage").src = "images/beer-bar-3d.png";
  }
}
function calculateDrinksUpgradeCost() {
  drinksUpgradeCost = drinksUpgradeCost * levelData.Level.podium;
  return drinksUpgradeCost;
}
function upgradeDrinks() {
  if (totalScore < drinksUpgradeCost) {
    openPopup(`Not enough Skullies!  need: ${drinksUpgradeCost}`);
    console.log(totalScore);
  } else {
    console.log("upgraded drinks!");
    totalScore -= drinksUpgradeCost;
    baseScore = totalScore;
    console.log("new totalScore: ", totalScore);
    increment = increment * (19 / 10);
    console.log("new increment: ", increment);
    levelData.Level.drinks++;
    console.log("podium level: ", levelData.Level.drinks);
    drinksUpgradeCost = calculateDrinksUpgradeCost();
    console.log("upgrade to next level costs: ", drinksUpgradeCost);
    updateScore(totalScore);
    updateDrinksLevel();
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
  popupContainer.querySelector(".popup-content p").textContent = message;
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
