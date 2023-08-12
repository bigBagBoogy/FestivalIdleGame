// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// import {DeployGameProgress} from "../../script/DeployGameProgress.s.sol";
import {GameProgress} from "../../src/GameProgress.sol";

import {Test, console} from "forge-std/Test.sol";
import {StdCheats} from "forge-std/StdCheats.sol";

contract GameProgressTest is StdCheats, Test {
    // Declare your contract instance
    GameProgress public gameProgress;

    // Deploy your contract before each test case
    function setUp() public {
        gameProgress = new GameProgress();
    }

    function testSaveAndGetProgress() public {
        uint8 expectedTotalScore = 100;
        uint8 expectedPodiumLvl = 2;
        uint8 expectedDrinksLvl = 3;
        uint8 expectedFoodLvl = 4;
        uint8 expectedTshirtLvl = 5;
        uint8 expectedAudioLvl = 1;
        uint8 expectedCampingLvl = 1;
        uint8 expectedStageStartOverLvl = 1;
        uint8 expectedCanBeAddedFunctionalityLaterLvl = 1;

        gameProgress.saveProgress(
            expectedTotalScore,
            expectedPodiumLvl,
            expectedDrinksLvl,
            expectedFoodLvl,
            expectedTshirtLvl,
            expectedAudioLvl,
            expectedCampingLvl,
            expectedStageStartOverLvl,
            expectedCanBeAddedFunctionalityLaterLvl
        );

        GameProgress.Progress memory playerProgress = gameProgress.getProgress(address(this));

        assertEq(playerProgress.totalScore, expectedTotalScore, "Total score not saved correctly");
        assertEq(playerProgress.podiumLvl, expectedPodiumLvl, "Podium level not saved correctly");
        assertEq(playerProgress.drinksLvl, expectedDrinksLvl, "Drinks level not saved correctly");
        assertEq(playerProgress.foodLvl, expectedFoodLvl, "Food level not saved correctly");
        assertEq(playerProgress.tshirtLvl, expectedTshirtLvl, "T-shirt level not saved correctly");
        assertEq(playerProgress.audioLvl, expectedAudioLvl, "Audio level not saved correctly");
        assertEq(playerProgress.campingLvl, expectedCampingLvl, "Camping level not saved correctly");
        assertEq(
            playerProgress.stageStartOverLvl, expectedStageStartOverLvl, "Stage start over level not saved correctly"
        );
        assertEq(
            playerProgress.canBeAddedFunctionalityLaterLvl,
            expectedCanBeAddedFunctionalityLaterLvl,
            "Can be added functionality later level not saved correctly"
        );
    }

    // Add more test cases as needed
}
