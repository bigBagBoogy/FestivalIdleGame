// Replace 'YOUR_CONTRACT_ADDRESS' with the actual address of your smart contract
const contractAddress = "YOUR_CONTRACT_ADDRESS";
const abi = [
  // Replace this with the ABI of your smart contract
  {
    constant: true,
    inputs: [],
    name: "getTopFivePlayers",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "player1",
            type: "address",
          },
          {
            internalType: "address",
            name: "player2",
            type: "address",
          },
          {
            internalType: "address",
            name: "player3",
            type: "address",
          },
          {
            internalType: "address",
            name: "player4",
            type: "address",
          },
          {
            internalType: "address",
            name: "player5",
            type: "address",
          },
        ],
        internalType: "struct TopFive",
        name: "",
        type: "tuple",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

// Initialize Web3.js
let web3 = new Web3(Web3.givenProvider);

// Replace 'YOUR_CONTRACT_ABI' with the ABI of your smart contract
const contract = new web3.eth.Contract(abi, contractAddress);

// Function to retrieve and display the top 5 players
async function displayTopPlayers() {
  try {
    // Call the getTopFivePlayers function to get the top 5 players from the blockchain
    const topFive = await contract.methods.getTopFivePlayers().call();

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
