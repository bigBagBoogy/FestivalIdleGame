// Game variables
let scullies = 0;
let playingFieldLevel = 1;
let foodStandLevel = 1;
let drinkStandLevel = 1;
let tshirtStandLevel = 1;
let podiumLevel = 1;

// Upgrade costs
const playingFieldUpgradeCost = 10;
const foodStandUpgradeCost = 20;
const drinkStandUpgradeCost = 30;
const tshirtStandUpgradeCost = 40;
const podiumUpgradeCost = 50;

// Function to update the displayed values
function updateDisplay() {
  document.getElementById("scullies").textContent = scullies;
  document.getElementById("playingFieldLevel").textContent = playingFieldLevel;
  document.getElementById("foodStandLevel").textContent = foodStandLevel;
  document.getElementById("drinkStandLevel").textContent = drinkStandLevel;
  document.getElementById("tshirtStandLevel").textContent = tshirtStandLevel;
  document.getElementById("podiumLevel").textContent = podiumLevel;
}

// Function to handle the upgrade of the playing field
function upgradePlayingField() {
  if (scullies >= playingFieldUpgradeCost) {
    scullies -= playingFieldUpgradeCost;
    playingFieldLevel++;
    playingFieldUpgradeCost *= 2;
    updateDisplay();
  }
}

// Function to handle the upgrade of the food stand
function upgradeFoodStand() {
  // Implement a similar function to upgrade the food stand
}

// Function to handle the upgrade of the drink stand
function upgradeDrinkStand() {
  // Implement a similar function to upgrade the drink stand
}

// Function to handle the upgrade of the t-shirt stand
function upgradeTshirtStand() {
  // Implement a similar function to upgrade the t-shirt stand
}

// Function to handle the upgrade of the podium
function upgradePodium() {
  // Implement a similar function to upgrade the podium
}

// Function to update the income per second based on the current levels
function updateIncome() {
  // Implement the calculation of income based on levels and update the income display
}

// Function to increment the scullies based on the income per second
function collectIncome() {
  // Implement the collection of income and update the scullies display
}

// Set up event listeners for the upgrade buttons
document
  .getElementById("upgradePlayingFieldBtn")
  .addEventListener("click", upgradePlayingField);
document
  .getElementById("upgradeFoodStandBtn")
  .addEventListener("click", upgradeFoodStand);
document
  .getElementById("upgradeDrinkStandBtn")
  .addEventListener("click", upgradeDrinkStand);
document
  .getElementById("upgradeTshirtStandBtn")
  .addEventListener("click", upgradeTshirtStand);
document
  .getElementById("upgradePodiumBtn")
  .addEventListener("click", upgradePodium);

// Start the income collection loop
setInterval(function () {
  collectIncome();
}, 1000);

// Initial display update
updateDisplay();
