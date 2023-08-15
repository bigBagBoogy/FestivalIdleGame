// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {DeployGameProgressAndTopFive} from "../../script/DeployGameProgress.s.sol";
import {GameProgressAndTopFive} from "../../src/GameProgressAndTopFive.sol";
import {Test, console} from "forge-std/Test.sol";//You can call console.log with up to 4 parameters in any order of following types: uint, string, bool,address
import {StdCheats} from "forge-std/StdCheats.sol";

contract GameProgressAndTopFiveTest is StdCheats, Test {
    // Declare your contract instance
    GameProgressAndTopFive public game;

    // Deploy your contract before each test case
    function setUp() public {
        game = new GameProgressAndTopFive();
    }


contract GameProgressAndTopFiveTest is Test {
    GameProgressAndTopFive game;

    function beforeEach() public {
        game = new GameProgressAndTopFive();
    }

    function test_saveProgressAndTopPlayers() public {
        uint256 totalScore = 100;
        uint256 concatenatedValue = 123456;

        game.saveProgress(totalScore, concatenatedValue);

        (address[5] memory topPlayers, uint256[5] memory topScores) = game.getTopFivePlayers();

        assertEq(topPlayers[0], address(this), "Top player should be this test contract");
        assertEq(topScores[0], concatenatedValue * 1e51 + totalScore, "Top player's combined score is incorrect");
    }

    function test_saveProgressWithHigherScore() public {
        // Add initial player with a lower score
        uint256 initialTotalScore = 50;
        uint256 initialConcatenatedValue = 789012;
        game.saveProgress(initialTotalScore, initialConcatenatedValue);

        // Add player with higher score
        uint256 totalScore = 150;
        uint256 concatenatedValue = 123456;
        game.saveProgress(totalScore, concatenatedValue);

        (, uint256[5] memory topScores) = game.getTopFivePlayers();

        assertEq(topScores[0], concatenatedValue * 1e51 + totalScore, "Top player's combined score is incorrect");
        assertEq(topScores[4], initialConcatenatedValue * 1e51 + initialTotalScore, "Last player's score should not change");
    }

    function test_saveProgressWithEqualScore() public {
        // Add initial player
        uint256 initialTotalScore = 100;
        uint256 initialConcatenatedValue = 123456;
        game.saveProgress(initialTotalScore, initialConcatenatedValue);

        // Add player with equal score
        uint256 totalScore = 100;
        uint256 concatenatedValue = 789012;
        game.saveProgress(totalScore, concatenatedValue);

        (, uint256[5] memory topScores) = game.getTopFivePlayers();

        assertEq(topScores[0], initialConcatenatedValue * 1e51 + initialTotalScore, "Top player's score should not change");
        assertEq(topScores[4], 0, "Last player's score should be zero");
    }

    function test_getPlayerProgress() public {
        uint256 totalScore = 100;
        uint256 concatenatedValue = 123456;
        game.saveProgress(totalScore, concatenatedValue);

        GameProgressAndTopFive.ProgressStruct memory progress = game.getPlayerProgress(address(this));

        assertEq(progress.totalScore, totalScore, "Player's total score is incorrect");
        assertEq(progress.concatenatedValue, concatenatedValue, "Player's concatenated value is incorrect");
    }
}

}
    