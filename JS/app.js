// Specify your contract address and ABI
const contractAddress = "CONTRACT_ADDRESS";
// const contractABI = [...]; // Replace with your contract's ABI

const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

// import { getTotalScore } from "./JS/score.js";
// const totalScore = getTotalScore();
// console.log(totalScore);

const GameProgress = new web3.eth.Contract(contractABI, contractAddress);

document.getElementById("getTopPlayers").addEventListener("click", async () => {
  const result = await GameProgress.methods.getTopFivePlayers().call();

  const topPlayersDiv = document.getElementById("topPlayers");
  topPlayersDiv.innerHTML = "";

  for (let i = 0; i < result[0].length; i++) {
    const player = result[0][i];
    const score = result[1][i];

    const playerDiv = document.createElement("div");
    playerDiv.innerHTML = `Player: ${player}<br>Score: ${score}<br><br>`;
    topPlayersDiv.appendChild(playerDiv);
  }
});
// ... Previous code ...

async function web3save() {
  console.log("web3save called");
  const totalScore = document.getElementById("totalScore");
  console.log(`going to write to blockchain a totalScore of: ${totalScore}`);
  const podiumLvl = parseInt(prompt("Enter podium level:"));
  const drinksLvl = parseInt(prompt("Enter drinks level:"));
  const audioLvl = parseInt(prompt("Enter audio level:"));
  const stageStartOverLvl = parseInt(prompt("Enter stage start over level:"));

  try {
    await GameProgress.methods
      .saveProgress(
        totalScore,
        podiumLvl,
        drinksLvl,
        audioLvl,
        stageStartOverLvl
      )
      .send({ from: web3.eth.defaultAccount });
    alert("Progress saved successfully!");
  } catch (error) {
    console.error("Error saving progress:", error);
  }
}

async function web3load() {
  document
    .getElementById("loadProgress")
    .addEventListener("click", async () => {
      try {
        const result = await GameProgress.methods
          .getProgress(web3.eth.defaultAccount)
          .call();
        const progressResultDiv = document.getElementById("progressResult");
        progressResultDiv.innerHTML = `
            Total Score: ${result.totalScore}<br>
            Podium Level: ${result.podiumLvl}<br>
            Drinks Level: ${result.drinksLvl}<br>
            Audio Level: ${result.audioLvl}<br>
            Stage Start Over Level: ${result.stageStartOverLvl}
        `;
      } catch (error) {
        console.error("Error loading progress:", error);
      }
    });
}
