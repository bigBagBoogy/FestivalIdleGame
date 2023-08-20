export const contractAddress = "0xA8452Ec99ce0C64f20701dB7dD3abDb607c00496";
export const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_player",
        type: "address",
      },
    ],
    name: "getPlayerProgress",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "totalScore",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "concatenatedValue",
            type: "uint256",
          },
        ],
        internalType: "struct GameProgressAndTopFive.ProgressStruct",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_concatenatedValue",
        type: "uint256",
      },
    ],
    name: "getStageStartoverLvl",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getTopFivePlayers",
    outputs: [
      {
        internalType: "address[5]",
        name: "",
        type: "address[5]",
      },
      {
        internalType: "uint256[5]",
        name: "",
        type: "uint256[5]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_totalScore",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_concatenatedValue",
        type: "uint256",
      },
    ],
    name: "saveProgress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "topPlayers",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "topScores",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
