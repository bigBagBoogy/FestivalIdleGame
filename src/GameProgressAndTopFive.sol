// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {console} from "forge-std/Test.sol";
//import "solidity-stringutils/strings.sol";

contract GameProgressAndTopFive {
    // these are the top5 state variables:
    address[5] public topPlayers; // initialize array of players
    uint256[5] public topScores; // initialize array of combinedScore scores

    // this is for all player's progress
    mapping(address => ProgressStruct) private s_playerProgress;

    struct ProgressStruct {
        uint256 totalScore; //skullies
        uint256 concatenatedValue; // all the lvl data in one integer
    }

    // Function to write/save player progress data (to the contract) and update topPlayers
    //1. saveProgress to mapping, 2. getStageStartoverLvl, 3. calculateCombinedScore, 4. updateTopPlayers
    function saveProgress(uint256 _totalScore, uint256 _concatenatedValue) external {
        address newPlayer = msg.sender;
        s_playerProgress[newPlayer] = ProgressStruct({totalScore: _totalScore, concatenatedValue: _concatenatedValue});
        uint256 stageStartOverLvl = getStageStartoverLvl(_concatenatedValue);
        uint256 combinedScore = calculateCombinedScore(stageStartOverLvl, _totalScore);
        updateTopPlayers(newPlayer, combinedScore);
    }

    function getStageStartoverLvl(uint256 _concatenatedValue) public pure returns (uint256) {
        string memory concatenatedStr = uint256ToString(_concatenatedValue);

        uint256 start = 16; // Start index of the desired substring
        uint256 length = 3; // Length of the desired substring
        uint256 stageStartOverLvl = parseSubstring(concatenatedStr, start, length);

        return stageStartOverLvl;
    }

    function parseSubstring(string memory str, uint256 start, uint256 length) internal pure returns (uint256) {
        uint256 result = 0;
        for (uint256 i = start; i < start + length; i++) {
            require(bytes(str).length > i, "Invalid index");
            result = result * 10 + uint256(uint8(bytes(str)[i]) - 48); // Convert ASCII to uint
        }
        return result;
    }

    function calculateCombinedScore(uint256 stageStartOverLvl, uint256 totalScore) internal view returns (uint256) {
        uint256 combinedScore = stageStartOverLvl * 1e51 + totalScore;
        // for this calculation to work, totalScore (skullies) must me capped at 1e50!!!! see bigBagBoogy.md
        console.log(combinedScore);
        return combinedScore;
    }

    //  check if the player even needs to be added to the top 5.
    function updateTopPlayers(address newPlayer, uint256 combinedScore) internal {
        if (combinedScore > topScores[4]) {
            uint256 insertIndex; // initialize the index position the player will be inserted

            for (uint256 i = 0; i < 5; i++) {
                if (combinedScore > topScores[i]) {
                    insertIndex = i; // we find out where the player will be inserted
                    break;
                }
            }
            console.log("Inserting player at index:", insertIndex);
            console.log("Player's address:", newPlayer);
            console.log("Player's combined score:", combinedScore);

            if (insertIndex < 4) {
                console.log("Shifting players to make space...");

                for (uint256 i = 4; i > insertIndex; i--) {
                    console.log("Moving player from index", i - 1, "to index", i);
                    topPlayers[i] = topPlayers[i - 1]; // important! read from right to left!!!
                    topScores[i] = topScores[i - 1]; // so 4 - 1 = 3 (so the player in index 4 (5th) will now have it's place taken (gets overwritten) by the player in index 3 (4th))
                }
                console.log("Inserted player at index", insertIndex);
            }
            console.log("Updating top player at index 0");
            topPlayers[insertIndex] = newPlayer;
            topScores[insertIndex] = combinedScore;
        }
    }

    function getTopFivePlayers() external view returns (address[5] memory, uint256[5] memory) {
        return (topPlayers, topScores);
    }

    function getPlayerProgress(address _player) external view returns (uint256, uint256) {
        ProgressStruct memory progress = s_playerProgress[_player];
        return (progress.totalScore, progress.concatenatedValue); // Return individual fields of the struct
    }

    function removeLeadingZeroes(string memory inputStr) internal pure returns (string memory) {
        bytes memory strBytes = bytes(inputStr);
        uint256 i = 0;
        while (i < strBytes.length && strBytes[i] == "0") {
            i++;
        }
        bytes memory result = new bytes(strBytes.length - i);
        for (uint256 j = i; j < strBytes.length; j++) {
            result[j - i] = strBytes[j];
        }
        return string(result);
    }

    function parseInt(string memory numString) internal pure returns (uint256) {
        uint256 val = 0;
        bytes memory stringBytes = bytes(numString);
        for (uint256 i = 0; i < stringBytes.length; i++) {
            uint256 exp = stringBytes.length - i;
            bytes1 ival = stringBytes[i];
            uint8 uval = uint8(ival);
            uint256 jval = uval - uint256(0x30);

            val += (uint256(jval) * (10 ** (exp - 1)));
        }
        return val;
    }

    function uint256ToString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint8(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }
}
