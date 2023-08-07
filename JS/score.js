var totalScore;
var upgradeLevel = 1;
var podiumUpgradeCost = 10;
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
function updateLevel() {
  var podiumLevel = levelData.Level.podium;
  // Get the level element and update its innerHTML with the current level
  const levelElement = document.getElementById("podiumLevel");
  levelElement.innerHTML = podiumLevel;
}
function calculateUpgradeCost() {
  podiumUpgradeCost = podiumUpgradeCost * levelData.Level.podium;
  return podiumUpgradeCost;
}

function upgradePodium() {
  if (totalScore < podiumUpgradeCost) {
    openPopup("Not enough Skullies!", totalScore);
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
    podiumUpgradeCost = calculateUpgradeCost();
    console.log("upgrade to next level costs: ", podiumUpgradeCost);
    updateScore(totalScore);
    updateLevel();

    console.log("new totalScore: ", totalScore);
  }
}
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

// openPopupButton.addEventListener('click', () => {
//   upgradePodium();
// });
