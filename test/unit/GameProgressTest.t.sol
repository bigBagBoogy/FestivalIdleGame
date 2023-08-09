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
        uint256 expectedTotalScore = 100;
        uint256 expectedPodiumLvl = 2;
        uint256 expectedDrinksLvl = 3;
        uint256 expectedAudioLvl = 1;
        uint256 expectedStageStartOverLvl = 0;

        gameProgress.saveProgress(
            expectedTotalScore, expectedPodiumLvl, expectedDrinksLvl, expectedAudioLvl, expectedStageStartOverLvl
        );

        GameProgress.Progress memory playerProgress = gameProgress.getProgress(address(this));

        assertEq(playerProgress.totalScore, expectedTotalScore, "Total score not saved correctly");
        assertEq(playerProgress.podiumLvl, expectedPodiumLvl, "Podium level not saved correctly");
        assertEq(playerProgress.drinksLvl, expectedDrinksLvl, "Drinks level not saved correctly");
        assertEq(playerProgress.audioLvl, expectedAudioLvl, "Audio level not saved correctly");
        assertEq(
            playerProgress.stageStartOverLvl, expectedStageStartOverLvl, "Stage start over level not saved correctly"
        );
    }

    // Add more test cases as needed
}
