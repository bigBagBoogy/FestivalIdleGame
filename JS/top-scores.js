import { abiGameProgressAndTopFive } from "./constants.js";
import { contractAddressGameProgressAndTopFive } from "./constants.js";
import { ethers } from "ethers";

// Initialize ethers provider
// const provider = new ethers.providers.JsonRpcProvider(
//   "https://eth-sepolia.g.alchemy.com/v2/69txysSR3src6m4REhIftFAI2BYyEgcN"
// );
const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
//and contract
const contract = new ethers.Contract(
  contractAddressGameProgressAndTopFive,
  abiGameProgressAndTopFive,
  provider
);

// Function to retrieve and display the top 5 players
async function displayTopPlayers() {
  try {
    // Call the getTopFivePlayers function to get the top 5 players from the blockchain
    const topFive = await contract.getTopFivePlayers();

    // Display the top 5 players in the HTML list
    const topPlayersList = document.getElementById("topPlayersList");
    topPlayersList.innerHTML = `
      <li>1. Player 1: ${topFive.player1}</li>
      <li>2. Player 2: ${topFive.player2}</li>
      <li>3. Player 3: ${topFive.player3}</li>
      <li>4. Player 4: ${topFive.player4}</li>
      <li>5. Player 5: ${topFive.player5}</li>
    `;
  } catch (error) {
    console.error("Error:", error);
  }
}

// Call the displayTopPlayers function to show the top 5 players on page load
displayTopPlayers();
