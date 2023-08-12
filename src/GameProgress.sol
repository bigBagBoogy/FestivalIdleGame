// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract GameProgress {
    // progress can be a struct with all the scores as key/value pairs,
    // but, to save gas, it can also be a code where the first 3 digits are the podiumLvl, the second 3 digits are the drinksLvl, ect, etc, and the last 2 digits are the audioLvl are the stageStartOverLvl
    // 00100100100100100101    20-digit number
    // [001]podium[001]drinks[001]food[001]tshirt[001]audio[001]camping[01]stageStartOver
    // This code can constucted in the frontend JS and then written to the blockchain
    // Later it can we read from the blockchain an deconstructed into the struct.
    // This will be a project for a later day

    //     UINT digits
    // uint8   myUint8     =  3
    // uint16  myUint16    =  5
    // uint32  myUint32    = 10
    // uint64  myUint64    = 20
    // uint128 myUint128   = 39
    // uint256 myUint256   = 77

    struct Progress {
        uint8 totalScore; //    In frontend, lvl should be capped to max 999
        uint8 podiumLvl;
        uint8 drinksLvl;
        uint8 foodLvl;
        uint8 tshirtLvl;
        uint8 audioLvl;
        uint8 campingLvl;
        uint8 stageStartOverLvl;
        uint8 canBeAddedFunctionalityLaterLvl; // for possible added functionality
    }

    mapping(address => Progress) private s_playerProgress;

    // Function to write/save player progress data (to the contract)
    function saveProgress(
        uint8 _totalScore,
        uint8 _podiumLvl,
        uint8 _drinksLvl,
        uint8 _foodLvl,
        uint8 _tshirtLvl,
        uint8 _audioLvl,
        uint8 _campingLvl,
        uint8 _stageStartOverLvl,
        uint8 _canBeAddedFunctionalityLaterLvl
    ) external {
        s_playerProgress[msg.sender] = Progress({
            totalScore: _totalScore,
            podiumLvl: _podiumLvl,
            drinksLvl: _drinksLvl,
            foodLvl: _foodLvl,
            tshirtLvl: _tshirtLvl,
            audioLvl: _audioLvl,
            campingLvl: _campingLvl,
            stageStartOverLvl: _stageStartOverLvl,
            canBeAddedFunctionalityLaterLvl: _canBeAddedFunctionalityLaterLvl
        });
    }

    // Function to read player progress data
    function getProgress(address _player) external view returns (Progress memory) {
        return s_playerProgress[_player];
    }

    // Function to get the top five players with the highest scores
    function getTopFivePlayers() external view returns (address[5] memory players, uint256[5] memory scores) {
        address[5] memory topPlayers;
        uint256[5] memory topScores;

        for (uint256 i = 0; i < 5; i++) {
            address currentPlayer = address(0);
            uint256 currentScore = 0;

            for (uint256 j = 0; j < 5; j++) {
                address player = getAddressAtIndex(j);
                uint256 score = s_playerProgress[player].totalScore;

                if (score > currentScore && !isPlayerInArray(player, topPlayers, i)) {
                    currentPlayer = player;
                    currentScore = score;
                }
            }

            topPlayers[i] = currentPlayer;
            topScores[i] = currentScore;
        }

        return (topPlayers, topScores);
    }

    // // Internal function to get the address at a specific index in the s_playerProgress mapping
    // function getAddressAtIndex(uint256 index) internal pure returns (address) {
    //     if (index == 0) return address(0); // Replace with actual address
    //         // Add logic to get addresses at different indices
    // }

    // Internal function to check if a player is already in the array
    function isPlayerInArray(address player, address[5] memory array, uint256 size) internal pure returns (bool) {
        for (uint256 i = 0; i < size; i++) {
            if (array[i] == player) {
                return true;
            }
        }
        return false;
    }
}
