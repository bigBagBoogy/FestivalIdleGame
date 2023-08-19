# instant push copy paste all below in one go:

git init
git branch -M main
git add .
git commit -m "test added"
git push -u origin main

# todo:⭐️

Disable double tap = zoom screen -> how to?

fix fund/cheatPay function
line 84 connectWeb3.JS:
const ethAmount = document.getElementById("ethAmount").value; //string value here

# let's:

Offer 2 tiers of cheating: CheatSilver and CheatGold. Let's make these $5 and $10
These fiat amounts need to be measured against the current price of ETH/USD?
We'll write the code for this, but comment it out, since keeping track of chainlink pricefeed
funding might not be wanted.
html: button -> popup with CheatSilver and CheatGold buttons. onclick=CheatSilver()
For now we'll work off a price for ETH of $2000,
so CheatSilver = 0.0025 ETH and CheatGold = 0.005 ETH (2500000000000000 WEI and 5000000000000000)

# if needed install npm install --save-dev dotenv-webpack

totalScore (skullies) must me capped at 1e50!!!! in JS/score.js
to cap this, let's add a function that triggers at 1e50 skullies and sets all elements
to lvl10, which in term will trigger the function: levelUpStage()
podiumLvl = 1;
drinksLvl = 1;
etc, etc,
stageStartOverLvl++;

To otherwise call levelUpStage() though, we'll have to add a "checker" that looks for:
All elementsLvl = 10 to be true

look into creating ECMAScript modules. 🧩

# change ABI and contract in constants.js. Now they are dummys!

Amend the FundMe contract to a cheat contract and handel "pay-to-cheat" logic.

# end of todo..........................................

The keyboard shortcut to toggle word wrap is Alt+Z
The keyboard shortcut to zoom is Ctrl+ + and/or Ctrl+ - (on the num-pad)

forge test --mt <nameOfTest> -vvv
forge script script/DeployGameProgressAndTopFive.s.sol

# bigBagBoogie interim note:

# bigBagBoogie:

//uint8 = 3 uint16 = 5 uint32 = 10 uint64 = 20 uint128 = 39 uint256 = 77

# Layout of Contract:

// version
// imports
// interfaces, libraries, contracts
// errors
// Type declarations
// State variables
// Events
// Modifiers
// Functions

// Layout of Functions:
// constructor
// receive function (if exists)
// fallback function (if exists)
// external
// public
// internal
// private
// view & pure functions

# bug along the way to learn from:

connectWeb3.js needs to be typecasted: type="module" in it's html element and
score.js MUST not! otherwise all functions will break `undefinded`.
You can not and don't need to (if you use VAR for variables you need in both files),
do: "// import "./score.js";" in connectWeb3.js. If you do, It will call the inteval function double, with wrong arguments.

If You see this error in the browser console: `ethers-5.6.esm.min.js:16475     POST https://eth-sepolia.g.alchemy.com/v2/69txysSR3src6m4REhIftFAI2BYyEgcN net::ERR_NAME_NOT_RESOLVED`
It means you're not connected to the internet!
