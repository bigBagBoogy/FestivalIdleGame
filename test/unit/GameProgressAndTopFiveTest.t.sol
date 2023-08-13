// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// import {DeployGameProgress} from "../../script/DeployGameProgress.s.sol";
import {GameProgressAndTopFive} from "../../src/GameProgressAndTopFive.sol";

import {Test, console} from "forge-std/Test.sol";
import {StdCheats} from "forge-std/StdCheats.sol";

contract GameProgressAndTopFiveTest is StdCheats, Test {
    // Declare your contract instance
    GameProgressAndTopFive public gameProgressAndTopFive;

    // Deploy your contract before each test case
    function setUp() public {
        gameProgressAndTopFive = new GameProgressAndTopFive();
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

        gameProgressAndTopFive.saveProgress(
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

        GameProgressAndTopFive.ProgressStruct memory playerProgress =
            gameProgressAndTopFive.getPlayerProgress(address(this));

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


    function test_UpdateTopPlayers() public {
        // Prank initial top 5 players and scores
        vm.prank(dummyAddress1, initialScore1);
        vm.prank(dummyAddress2, initialScore2);
        vm.prank(dummyAddress3, initialScore3);
        vm.prank(dummyAddress4, initialScore4);
        vm.prank(dummyAddress5, initialScore5);
        // Prank "to be added" user
        vm.prank(newUserAddress, newUserScore);
        // Perform actions to update top players
        game.updateTopPlayers();
        // Assert that the top players have been updated as expected
        // ...
    }
}

}
