# instant push copy paste all below in one go:

git init
git branch -M main
git add .
git commit -m "test added"
git push -u origin main

# todo:

at line 253 in css @keyframe foodUpgradeArrow need tobe unique to each arrow

integrate the combinedScore.js functions into the save and load functions

# install npm install --save-dev dotenv-webpack

totalScore (skullies) must me capped at 1e50!!!! in JS/score.js
to cap this, let's add a function that triggers at 1e50 skullies and sets all elements
to lvl10, which in term will trigger the function: levelUpStage() {
podiumLvl = 1;
drinksLvl = 1;
etc, etc,
stageStartOverLvl++;

To otherwise call levelUpStage() though, we'll have to add a "checker" that looks for:
All elementsLvl = 10 to be true

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
