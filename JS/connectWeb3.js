import { ethers } from "./ethers-5.6.esm.min.js";
import { abi } from "./constants.js";
import { contractAddress } from "./constantsCheatpay.js";

//import { abi, contractAddress } from "./constantsCheatpay.js";

const withdrawButton = document.getElementById("withdrawButton");
const balanceButton = document.getElementById("balanceButton");
const connectButton = document.getElementById("connectButton");
const saveProgressButton = document.getElementById("saveProgressButton");
const getPlayerProgressButton = document.getElementById(
  "getPlayerProgressButton"
);
// const getTopPlayersButton = document.getElementById("getTopPlayersButton");

withdrawButton.onclick = withdraw;
balanceButton.onclick = getBalance;
connectButton.onclick = connect;
saveProgressButton.onclick = saveProgress;
getPlayerProgressButton.onclick = getPlayerProgress;
// getTopPlayersButton.onclick = getTopFivePlayers;

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

// async function connect() {
//   console.log("Button clicked");
//   if (window.ethereum) {
//     try {
//       await ethereum.request({ method: "eth_requestAccounts" });
//       // Metamask is connected, update the image source
//       document.getElementById("connectButton").src =
//         "images/metamaskConnected.svg";
//     } catch (e) {
//       console.log(e);
//     }
//     // connectButton.innerHTML = "Connected!";
//     const accounts = await ethereum.request({
//       method: "eth_requestAccounts",
//     });
//     console.log(accounts);
//   } else {
//     connectButton.innerHTML = "Install Metamask";
//   }
// }

async function withdraw() {
  console.log(`Withdrawing...`);
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      const transactionResponse = await contract.withdraw();
      await listenForTransactionMine(transactionResponse, provider);
      // await transactionResponse.wait(1)
    } catch (error) {
      console.log(error);
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
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      const transactionResponse = await contract.payForScullies({
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
      const balance = await provider.getBalance(contractAddress);
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
const contract = new ethers.Contract(contractAddress, abi, provider);
////////////////////
////   top5      ///
////////////////////
async function getTopFivePlayers() {
  try {
    console.log("fetching top players...");
    const [topPlayers, topScores] = await contract.getTopFivePlayers();

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

async function getPlayerProgress(playerAddress) {
  try {
    console.log("loading player's progress...");
    const progress = await contract.getPlayerProgress(playerAddress);
    console.log(progress);
    return progress;
  } catch (error) {
    console.error("Error fetching player progress:", error);
    throw error;
  }
}
////////////////////
////   save      ///
////////////////////
async function saveProgress() {
  try {
    const roundedTotalScore = Math.round(totalScore);
    console.log(
      `saving concatenatedValue: ${concatenatedValue} and totalScore: ${roundedTotalScore}`
    );
    const signer = provider.getSigner();
    const contractWithSigner = contract.connect(signer);
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
}
// console.log(stageStartOverLvl, totalScore, calculateCombinedScore);
export { getTopFivePlayers, getPlayerProgress, saveProgress, cheatPay };
