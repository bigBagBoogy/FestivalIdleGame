# instant push copy paste all below in one go:

git init
git branch -M main
git add .
git commit -m "test added"
git push -u origin main

# todo:

totalScore (skullies) must me capped at 1e50!!!! in JS/score.js
to cap this, let's add a function that triggers at 1e50 skullies and sets all elements
to lvl10, which in term will trigger the function: levelUpStage() {
podiumLvl = 1;
drinksLvl = 1;
etc, etc,
stageStartOverLvl++;

To otherwise call levelUpStage() though, we'll have to add a "checker" that looks for:
All elementsLvl = 10 to be true

}

The keyboard shortcut to toggle word wrap is Alt+Z
The keyboard shortcut to zoom is Ctrl+ + and/or Ctrl+ - (on the num-pad)

forge test --mt <nameOfTest> -vvv
forge script script/DeployGameProgress.s.sol

# bigBagBoogie interim note:

As of now, when still working on the code, I can see no event being emitted for the
health factor being broken. See below deliberation with chatGPT3:

# bigBagBoogie:

In the above contract, users should be able to liquidate other users when their health factor is broken. I see no event being emitted of a health factor being broken though. How can users (listen) for this event and find out what users are elligable for liquidation?

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
