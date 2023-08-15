// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract GameProgressAndTopFive {
    // these are the top5 state variables:
    address[5] public topPlayers; // initialize array of players
    uint256[5] public topScores; // initialize array of scores

    // this is for all player's progress
    mapping(address => ProgressStruct) private s_playerProgress;
    //     UINT digits    // uint8   myUint8     =  3    // uint16  myUint16    =  5    // uint32  myUint32    = 10    // uint64  myUint64    = 20    // uint128 myUint128   = 39    // uint256 myUint256   = 77

    struct ProgressStruct {
        uint256 totalScore; //skullies
        uint256 concatenatedValue; // all the lvl data in one integer
    }

    // Function to write/save player progress data (to the contract) and update topPlayers
    //1. saveProgress to mapping, 2. getStageStartoverLvl, 3. calculateCombinedScore, 4. updateTopPlayers
    function saveProgress(uint256 _totalScore, uint256 _concatenatedValue) external {
        s_playerProgress[msg.sender] = ProgressStruct({totalScore: _totalScore, concatenatedValue: _concatenatedValue});
        uint256 stageStartOverLvl = getStageStartoverLvl(_concatenatedValue);
        uint 256 combinedScore = calculateCombinedScore(stageStartOverLvl, _totalScore)
        updateTopPlayers(msg.sender, calculateCombinedScore); 
        
    }
    // now check if players stageStartOverLvl >= than stageStartOverLvl[topPlayers[4]] && totalScore >= than totalScore[topPlayers[4]] ([4] is fifth place...)
    // meaning:  check if the player even needs to be added to the top 5.
function getStageStartoverLvl(concatenatedValue) external view returns (uint256) {
    stageStartOverLvl = parseInt(
    removeLeadingZeroes(concatenatedValue.substr(18, 3)),
    10
  );

    function calculateCombinedScore(uint256 stageStartOverLvl, uint256 totalScore) {
        uint256 combinedScore = stageStartOverLvl * 1e51 + totalScore;
        // for this calculation to work, totalScore (skullies) must me capped at 1e50!!!! see bigBagBoogy.md
        console.log(combinedScore);
        return combinedScore;
    }

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
// old:

//  uint8 podiumLvl; //    In frontend, lvl should be capped to max 999
//         uint8 drinksLvl; //    In frontend, lvl should be capped to max 999
//         uint8 foodLvl; //    In frontend, lvl should be capped to max 999
//         uint8 tshirtLvl; //  etc.
//         uint8 audioLvl;
//         uint8 campingLvl;
//         uint8 stageStartOverLvl; // tierLvl
//         uint8 canBeAddedFunctionalityLaterLvl; // for possible future added functionality
