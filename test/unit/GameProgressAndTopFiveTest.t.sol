// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {DeployGameProgressAndTopFive} from "../../script/DeployGameProgressAndTopFive.s.sol";
import {GameProgressAndTopFive} from "../../src/GameProgressAndTopFive.sol";
import {HelperConfig} from "../../script/HelperConfig.s.sol";
import {Test, console} from "forge-std/Test.sol"; //You can call console.log with up to 4 parameters in any order of following types: uint, string, bool,address
import {StdCheats} from "forge-std/StdCheats.sol";

contract GameProgressAndTopFiveTest is StdCheats, Test {
    // Declare your contract instance
    GameProgressAndTopFive public game;
    HelperConfig public helperConfig;

    address public constant USER = address(1);
    address public constant USER2 = address(2);

    // Deploy your contract before each test case
    function setUp() public {
        game = new GameProgressAndTopFive();
    }
    //  function setUp() public {
    //     DeployGameProgressAndTopFive deployer = new DeployGameProgressAndTopFive();
    //     (game, helperConfig) = deployer.run();
    // }

    function test_saveProgressAndTopPlayers() public {
        uint256 totalScore = 100;
        uint256 concatenatedValue = 3005002001004007006001;

        game.saveProgress(totalScore, concatenatedValue);
        uint256 stageStartOverLvl = game.getStageStartoverLvl(concatenatedValue);
        console.log(stageStartOverLvl);

        (address[5] memory topPlayers, uint256[5] memory topScores) = game.getTopFivePlayers();

        assertEq(topPlayers[0], address(this), "Top player should be this test contract");
        assertEq(topScores[0], stageStartOverLvl * 1e51 + totalScore, "Top player's combined score is incorrect");
    }

    function test_saveProgressWithHigherScore() public {
        // Add initial player with a lower score
        vm.prank(USER);
        uint256 initialTotalScore = 3e30;
        uint256 initialConcatenatedValue = 3005002001004007006001;
        game.saveProgress(initialTotalScore, initialConcatenatedValue);

        // Add player with higher score
        vm.prank(USER2);
        uint256 totalScore = 5e32;
        uint256 concatenatedValue = 1005002001004007007001;
        game.saveProgress(totalScore, concatenatedValue);
        uint256 stageStartOverLvl = game.getStageStartoverLvl(concatenatedValue);
        console.log("stageStartOverLvl of user2: ", stageStartOverLvl);
        uint256 stageStartOverLvlUser1 = game.getStageStartoverLvl(initialConcatenatedValue);
        console.log("stageStartOverLvl of user1: ", stageStartOverLvlUser1);

        (, uint256[5] memory topScores) = game.getTopFivePlayers();

        assertEq(topScores[0], stageStartOverLvl * 1e51 + totalScore, "Top player's combined score is incorrect");
        assertEq(
            topScores[1], stageStartOverLvlUser1 * 1e51 + initialTotalScore, "moved player's score should not change"
        );
    }

    function test_getPlayerProgress() public {
        uint256 totalScore = 5e32;
        uint256 concatenatedValue = 1005002001004007007001;
        game.saveProgress(totalScore, concatenatedValue);

        GameProgressAndTopFive.ProgressStruct memory progress = game.getPlayerProgress(address(this));
        console.log("address: ", address(this));
        console.log("totalScore: ", totalScore);
        console.log("to be sent back to frontend: ", concatenatedValue);
        assertEq(progress.totalScore, totalScore, "Player's total score is incorrect");
        assertEq(progress.concatenatedValue, concatenatedValue, "Player's concatenated value is incorrect");
    }
}
