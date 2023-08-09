// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract GameProgress {
    struct Progress {
        uint256 totalScore;
        uint256 podiumLvl;
        uint256 drinksLvl;
        uint256 audioLvl;
        uint256 stageStartOverLvl;
    }

    mapping(address => Progress) private playerProgress;

    // Function to write/save player progress data
    function saveProgress(
        uint256 _totalScore,
        uint256 _podiumLvl,
        uint256 _drinksLvl,
        uint256 _audioLvl,
        uint256 _stageStartOverLvl
    ) external {
        playerProgress[msg.sender] = Progress({
            totalScore: _totalScore,
            podiumLvl: _podiumLvl,
            drinksLvl: _drinksLvl,
            audioLvl: _audioLvl,
            stageStartOverLvl: _stageStartOverLvl
        });
    }

    // Function to read player progress data
    function getProgress(address _player) external view returns (Progress memory) {
        return playerProgress[_player];
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
                uint256 score = playerProgress[player].totalScore;

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

    // Internal function to get the address at a specific index in the playerProgress mapping
    function getAddressAtIndex(uint256 index) internal view returns (address) {
        if (index == 0) return address(0); // Replace with actual address
            // Add logic to get addresses at different indices
    }

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
