// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract GameProgressAndTopFive {
    // progress can be a struct with all the scores as key/value pairs,
    // but, to save gas, it can also be a code where the first 3 digits are the podiumLvl, the second 3 digits are the drinksLvl, ect, etc, and the last 2 digits are the audioLvl are the stageStartOverLvl
    // 00100100100100100101    20-digit number
    // [001]podium[001]drinks[001]food[001]tshirt[001]audio[001]camping[01]stageStartOver
    // This code can constucted in the frontend JS and then written to the blockchain
    // Later it can we read from the blockchain an deconstructed into the struct.
    // This will be a project for a later day

    // this is only top5 stuff:
    address[5] public topPlayers; // initialize array of players
    uint256[5] public topScores; // initialize array of scores

    // this is for all player's progress
    mapping(address => ProgressStruct) private s_playerProgress;
    //     UINT digits    // uint8   myUint8     =  3    // uint16  myUint16    =  5    // uint32  myUint32    = 10    // uint64  myUint64    = 20    // uint128 myUint128   = 39    // uint256 myUint256   = 77

    struct ProgressStruct {
        uint256 totalScore; //skullies
        uint8 podiumLvl; //    In frontend, lvl should be capped to max 999
        uint8 drinksLvl; //    In frontend, lvl should be capped to max 999
        uint8 foodLvl; //    In frontend, lvl should be capped to max 999
        uint8 tshirtLvl; //  etc.
        uint8 audioLvl;
        uint8 campingLvl;
        uint8 stageStartOverLvl; // tierLvl
        uint8 canBeAddedFunctionalityLaterLvl; // for possible future added functionality
    }

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
        s_playerProgress[msg.sender] = ProgressStruct({
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
        updateTopPlayers(msg.sender); // run this function inside the saveProgress function
    }
    // now check if players stageStartOverLvl >= than stageStartOverLvl[topPlayers[4]] && totalScore >= than totalScore[topPlayers[4]] ([4] is fifth place...)
    // meaning:  check if the player even needs to be added to the top 5.

    function updateTopPlayers(address currentPlayer) internal {
        for (uint256 i = 0; i < 5; i++) {
            if (
                s_playerProgress[currentPlayer].stageStartOverLvl >= s_playerProgress[topPlayers[i]].stageStartOverLvl
                    && s_playerProgress[currentPlayer].totalScore >= s_playerProgress[topPlayers[i]].totalScore
            ) {
                // Insert the current player and shift other players down
                for (uint256 j = 4; j > i; j--) {
                    topPlayers[j] = topPlayers[j - 1];
                    topScores[j] = topScores[j - 1];
                }
                topPlayers[i] = currentPlayer;
                topScores[i] = s_playerProgress[currentPlayer].totalScore;
                break;
            }
        }
    }

    function getTopFivePlayers() external view returns (address[5] memory, uint256[5] memory) {
        return (topPlayers, topScores);
    }

    function getPlayerProgress(address _player) external view returns (ProgressStruct memory) {
        return s_playerProgress[_player];
    }
}
