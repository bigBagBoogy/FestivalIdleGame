import { ethers } from "./ethers-5.6.esm.min.js";
import { abiCheatpay } from "./constantsCheatpay.js"; // fund, withdraw, balance
import { contractAddressCheatpay } from "./constantsCheatpay.js";

import { abiGameProgressAndTopFive } from "./constants.js"; //  save progress, top5
import { contractAddressGameProgressAndTopFive } from "./constants.js";

//import { abi, contractAddress } from "./constantsCheatpay.js";

const withdrawButton = document.getElementById("withdrawButton");
const balanceButton = document.getElementById("balanceButton");
const connectButton = document.getElementById("connectButton");
const saveProgressButton = document.getElementById("saveProgressButton");
const getPlayerProgressButton = document.getElementById(
  "getPlayerProgressButton"
);
const getTopPlayersButton = document.getElementById("getTopPlayersButton");

withdrawButton.onclick = withdraw;
balanceButton.onclick = getBalance;
connectButton.onclick = connect;
saveProgressButton.onclick = saveProgress;
getPlayerProgressButton.onclick = getPlayerProgress;
getTopPlayersButton.onclick = getTopFivePlayers;

async function connect() {
  console.log("Button clicked");
  if (typeof window.ethereum !== "undefined") {
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
      //Metamask is connected, update the image source
      document.getElementById("connectButton").src =
        "images/metamaskConnected.svg";
    } catch (error) {
      console.log(error);
    }
    connectButton.innerHTML = "Connected";
    const accounts = await ethereum.request({ method: "eth_accounts" });
    console.log(accounts);
  } else {
    connectButton.innerHTML = "Please install MetaMask";
  }
}

async function withdraw() {
  console.log(`Withdrawing...`);
  console.log(`Contract address: ${contractAddressCheatpay}`);
  if (typeof window.ethereum !== "undefined") {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const requestAccountsResult = await provider.send(
        "eth_requestAccounts",
        []
      );
      if (requestAccountsResult.length > 0) {
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        console.log(`Owner address: ${address}`);
        const contractPay = new ethers.Contract(
          contractAddressCheatpay,
          abiCheatpay,
          signer
        );
        const contractBalance = await provider.getBalance(
          contractAddressCheatpay
        );
        console.log(`contractBalance: ${contractBalance}`);
        // Call the contract's withdraw function without the value parameter
        const transactionResponse = await contractPay
          .connect(signer)
          .cheaperWithdraw();
        await listenForTransactionMine(transactionResponse, provider);
        // await transactionResponse.wait(1)
      }
    } catch (error) {
      console.log(error.message); // Log the error message
    }
  } else {
    withdrawButton.innerHTML = "Please install MetaMask";
  }
}

async function cheatPay(cheatAmount) {
  const ethAmount = cheatAmount.toString(); // Convert cheatAmount to string
  console.log(`cheating with ${ethAmount}...`);
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractPay = new ethers.Contract(
      contractAddressCheatpay,
      abiCheatpay,
      signer
    );
    try {
      const transactionResponse = await contractPay.payForScullies({
        value: ethers.utils.parseEther(ethAmount),
      });
      await listenForTransactionMine(transactionResponse, provider);
      ////   cheat functionality start
      baseScore = totalScore * 5;
      console.log("cheater!");
      ////   cheat functionality end
    } catch (error) {
      console.log(error);
    }
  } else {
    cheatButton.innerHTML = "Please install MetaMask";
  }
}

async function getBalance() {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    try {
      const balance = await provider.getBalance(contractAddressCheatpay);
      console.log(ethers.utils.formatEther(balance));
    } catch (error) {
      console.log(error);
    }
  } else {
    balanceButton.innerHTML = "Please install MetaMask";
  }
}

function listenForTransactionMine(transactionResponse, provider) {
  console.log(`Mining ${transactionResponse.hash}`);
  return new Promise((resolve, reject) => {
    try {
      provider.once(transactionResponse.hash, (transactionReceipt) => {
        console.log(
          `Completed with ${transactionReceipt.confirmations} confirmations. `
        );
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}

// end of functions that rely on ethers library
// start of GameProgressAndTopFive functions

//test to see if this file knows about score.js:
function testImport() {
  console.log("connection with connectWeb3.js made!");
}
testImport();

////////////////////////////////
///    game  functionality    //
////////////////////////////////

// const rpcUrl = process.env.SEPOLIA_RPC_URL;  this does not work yet.  Might need npm install --save-dev dotenv-webpack
const provider = new ethers.providers.JsonRpcProvider(
  "https://eth-sepolia.g.alchemy.com/v2/69txysSR3src6m4REhIftFAI2BYyEgcN"
); // Replace with your Ethereum RPC URL
const contractCheat = new ethers.Contract(
  contractAddressGameProgressAndTopFive,
  abiGameProgressAndTopFive,
  provider
);
////////////////////
////   top5      ///
////////////////////
async function getTopFivePlayers() {
  try {
    console.log("fetching top players...");
    const [topPlayers, topScores] = await contractCheat.getTopFivePlayers();

    const topPlayersList = document.getElementById("topPlayersList");
    topPlayersList.innerHTML = ""; // Clear previous list

    for (let i = 0; i < topPlayers.length; i++) {
      const player = topPlayers[i];
      const score = topScores[i];

      const listItem = document.createElement("li");
      listItem.textContent = `${player}: ${score}`;
      topPlayersList.appendChild(listItem);
    }

    console.log(topPlayers, topScores);

    return { topPlayers, topScores };
  } catch (error) {
    console.error("Error fetching top players:", error);
    throw error;
  }
}
// uncomment below function call to auto-load top5. Or add an "onLoad" function to top-score.js
// getTopFivePlayers();

////////////////////
////   load      ///
////////////////////

async function getPlayerProgress() {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contractCheat = new ethers.Contract(
      contractAddressGameProgressAndTopFive,
      abiGameProgressAndTopFive,
      provider
    );

    try {
      const playerAddress = await provider.getSigner().getAddress();
      console.log("loading player's progress...");
      const [totalScoreBigNumber, concatenatedValueBigNumber] =
        await contractCheat.getPlayerProgress(playerAddress);

      const totalScore = totalScoreBigNumber.toNumber(); // Convert to a regular number
      const concatenatedValue = concatenatedValueBigNumber.toString(); // Convert to a string

      console.log("totalScore:", totalScore);
      console.log("concatenatedValue:", concatenatedValue);
      deconstructConcatenatedValue(concatenatedValue);
      return { totalScore, concatenatedValue };
    } catch (error) {
      console.error("Error fetching player progress:", error);
      throw error;
    }
  } else {
    console.error("Web3 provider not found (e.g., MetaMask)");
  }
}

////////////////////
////   save      ///
////////////////////
// async function saveProgress() {
//   const provider = new ethers.providers.JsonRpcProvider(
//     "https://eth-sepolia.g.alchemy.com/v2/69txysSR3src6m4REhIftFAI2BYyEgcN"
//   );
//   // const provider = new ethers.providers.JsonRpcProvider(
//   //   "http://localhost:8545"
//   // );
//   const contractCheat = new ethers.Contract(
//     contractAddressGameProgressAndTopFive,
//     abiGameProgressAndTopFive,
//     provider
//   );
//   try {
//     const roundedTotalScore = Math.round(totalScore);
//     console.log(
//       `saving concatenatedValue: ${concatenatedValue} and totalScore: ${roundedTotalScore}`
//     );
//     const signer = provider.getSigner();
//     const contractWithSigner = contractCheat.connect(signer);
//     const tx = await contractWithSigner.saveProgress(
//       roundedTotalScore,
//       concatenatedValue
//     );
//     await tx.wait();
//     console.log("Progress saved successfully");
//   } catch (error) {
//     console.error("Error saving progress:", error);
//     throw error;
//   }
// }

async function saveProgress() {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contractCheat = new ethers.Contract(
      contractAddressGameProgressAndTopFive,
      abiGameProgressAndTopFive,
      provider
    );

    try {
      const roundedTotalScore = Math.round(totalScore);
      console.log(
        `saving concatenatedValue: ${concatenatedValue} and totalScore: ${roundedTotalScore}`
      );

      const signer = provider.getSigner();
      const contractWithSigner = contractCheat.connect(signer);
      const tx = await contractWithSigner.saveProgress(
        roundedTotalScore,
        concatenatedValue
      );
      await tx.wait();
      console.log("Progress saved successfully");
    } catch (error) {
      console.error("Error saving progress:", error);
      throw error;
    }
  } else {
    console.error("Web3 provider not found (e.g., MetaMask)");
  }
}

function removeLeadingZeroes(str) {
  return str.replace(/^0+/, "");
}

function deconstructConcatenatedValue(concatenatedValue) {
  let canBeAddedFunctionalityLaterLvl;
  let podiumLvl;
  let drinksLvl;
  let foodLvl;
  let tshirtLvl;
  let audioLvl;
  let campingLvl;
  let stageStartOverLvl;
  // If concatenatedValue starts with a digit, directly assign it to canBeAddedFunctionalityLaterLvl
  if (!isNaN(parseInt(concatenatedValue.charAt(0), 10))) {
    canBeAddedFunctionalityLaterLvl = parseInt(concatenatedValue.charAt(0), 10);
    concatenatedValue = concatenatedValue.slice(1); // Remove the first character
  } else {
    canBeAddedFunctionalityLaterLvl = parseInt(
      removeLeadingZeroes(concatenatedValue.substr(0, 3))
    );
    concatenatedValue = concatenatedValue.slice(3); // Remove the first 3 characters
  }

  podiumLvl = parseInt(removeLeadingZeroes(concatenatedValue.substr(0, 3)), 10);
  drinksLvl = parseInt(removeLeadingZeroes(concatenatedValue.substr(3, 3)), 10);
  foodLvl = parseInt(removeLeadingZeroes(concatenatedValue.substr(6, 3)), 10);
  tshirtLvl = parseInt(removeLeadingZeroes(concatenatedValue.substr(9, 3)), 10);
  audioLvl = parseInt(removeLeadingZeroes(concatenatedValue.substr(12, 3)), 10);
  campingLvl = parseInt(
    removeLeadingZeroes(concatenatedValue.substr(15, 3)),
    10
  );
  stageStartOverLvl = parseInt(
    removeLeadingZeroes(concatenatedValue.substr(18, 3)),
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

// console.log(stageStartOverLvl, totalScore, calculateCombinedScore);
export { getTopFivePlayers, getPlayerProgress, saveProgress, cheatPay };
