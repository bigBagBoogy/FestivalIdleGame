var totalScore;
var upgradeLevel = 1;
var upgradeCost = 30;
var baseScore = 1;
var increment = 1;
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
    // Increment the baseScore and update the score
    totalScore = baseScore + increment; // 1,2,3,4,5  after 1st upgrade increment will be 1.1 so baseScore: 1 + 1.1 = 2.1    then next loop:  2.1 + 1.1 = 3.2   then: 3.2 + 1.1 = 4.3
    updateScore(totalScore);
  }, 500); // Update score every half second (500 milliseconds)
}

// Function to update the score in the scoreboard bar
function updateScore(totalScore) {
  // Get the score element and update its innerHTML with the current score
  const scoreElement = document.getElementById("totalScore");
  scoreElement.innerHTML = totalScore;
}
function calculateUpgradeCost() {
  upgradeCost = upgradeCost * levelData.Level.podium; // upgradeCost = 100 * 1
  return upgradeCost; // upgradeCost = 100 * 2
}

function upgradePodium() {
  podiumUpgradeCost = calculateUpgradeCost();
  if (totalScore < podiumUpgradeCost) {
    openPopup("Not enough Skullies!");
  } else {
    console.log("upgraded podium!");
    totalScore -= podiumUpgradeCost;
    console.log("new totalScore: ", totalScore);
    baseScore = baseScore * (11 / 10);
    levelData.Level.podium++;
    console.log("podium level: ", levelData.Level.podium);
    interimCal = calculateUpgradeCost(upgradeCost);
    console.log("upgrade to next level costs: ", interimCal);
    updateScore(totalScore);
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
