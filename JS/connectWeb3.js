import { ethers } from "./ethers-5.6.esm.min.js";
import { abi, contractAddress } from "./constants.js";
// import "./score.js";

const withdrawButton = document.getElementById("withdrawButton");
// const cheatButton = document.getElementById("cheatButton"); need to be changed, has other function now
const balanceButton = document.getElementById("balanceButton");
const connectButton = document.getElementById("connectButton");
connectButton.onclick = connect;
withdrawButton.onclick = withdraw;
// cheatButton.onclick = cheatPay;   need to be changed, has other function now
balanceButton.onclick = getBalance;

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
// async function cheatPay() {
//   const ethAmount = document.getElementById("ethAmount").value;
//   console.log(`cheating with ${ethAmount}...`);
//   if (typeof window.ethereum !== "undefined") {
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const signer = provider.getSigner();
//     const contract = new ethers.Contract(contractAddress, abi, signer);
//     try {
//       const transactionResponse = await contract.cheat({
//         value: ethers.utils.parseEther(ethAmount),
//       });
//       await listenForTransactionMine(transactionResponse, provider);
//     } catch (error) {
//       console.log(error);
//     }
//   } else {
//     cheatButton.innerHTML = "Please install MetaMask";
//   }
// }

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

const rpcUrl = process.env.SEPOLIA_RPC_URL;
const provider = new ethers.providers.JsonRpcProvider(rpcUrl); // Replace with your Ethereum RPC URL
const contract = new ethers.Contract(contractAddress, abi, provider);

async function getTopFivePlayers() {
  try {
    const topPlayers = await contract.getTopFivePlayers();
    const topScores = await contract.topScores();
    console.error(topPlayers, topScores);
    return { topPlayers, topScores };
  } catch (error) {
    console.error("Error fetching top players:", error);
    throw error;
  }
}

async function getPlayerProgress(playerAddress) {
  try {
    const progress = await contract.getPlayerProgress(playerAddress);
    console.error(progress);
    return progress;
  } catch (error) {
    console.error("Error fetching player progress:", error);
    throw error;
  }
}

async function saveProgress(totalScore, concatenatedValue) {
  try {
    const signer = provider.getSigner();
    const contractWithSigner = contract.connect(signer);
    const tx = await contractWithSigner.saveProgress(
      totalScore,
      concatenatedValue
    );
    await tx.wait();
    console.log("Progress saved successfully");
  } catch (error) {
    console.error("Error saving progress:", error);
    throw error;
  }
}

export { getTopFivePlayers, getPlayerProgress, saveProgress };
