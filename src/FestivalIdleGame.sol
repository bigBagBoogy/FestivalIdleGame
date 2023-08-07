// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract FestivalIdleGame {
    struct Player {
        uint256 festivalPoints;
        uint256 lastActionTimestamp;
    }

    struct TopFive {
        address player1;
        address player2;
        address player3;
        address player4;
        address player5;
    }

    mapping(address => Player) public players;
    uint256 public totalFestivalPoints;
    uint256 public festivalEndTime;
    uint256 public rewardPerPoint;
    uint256 public currentBalance;

    address public owner;

    event FestivalJoined(address indexed player, uint256 festivalPoints);
    event FestivalRewardClaimed(address indexed player, uint256 rewardPoints);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    constructor(uint256 _festivalEndTime, uint256 _rewardPerPoint) {
        owner = msg.sender;
        festivalEndTime = _festivalEndTime;
        rewardPerPoint = _rewardPerPoint;
    }

    function joinFestival() external {
        require(block.timestamp <= festivalEndTime, "The festival has ended");
        Player storage player = players[msg.sender];
        if (player.festivalPoints == 0) {
            // First time joining the festival
            player.lastActionTimestamp = block.timestamp;
            emit FestivalJoined(msg.sender, 0);
        }

        // Calculate the additional festival points earned since the last action
        uint256 timeElapsed = block.timestamp - player.lastActionTimestamp;
        player.festivalPoints += timeElapsed;
        totalFestivalPoints += timeElapsed;

        player.lastActionTimestamp = block.timestamp;
        emit FestivalJoined(msg.sender, player.festivalPoints);
    }

    function claimReward() external {
        Player storage player = players[msg.sender];
        require(player.festivalPoints > 0, "No festival points to claim");

        uint256 pointsToClaim = player.festivalPoints;
        player.festivalPoints = 0;

        uint256 rewardAmount = pointsToClaim * rewardPerPoint;
        // Transfer the reward to the player (implementation not shown here)
        // You should implement a function to transfer tokens or Ether as rewards
        // For example, using the ERC20 transfer function or directly using Ether transfer.

        emit FestivalRewardClaimed(msg.sender, rewardAmount);
    }

    function setRewardPerPoint(uint256 _rewardPerPoint) external onlyOwner {
        rewardPerPoint = _rewardPerPoint;
    }

    function setFestivalEndTime(uint256 _festivalEndTime) external onlyOwner {
        festivalEndTime = _festivalEndTime;
    }

    // Additional functions and game logic can be added here

    modifier enoughScullies(uint256 upgradeCost) {
        require(currentBalance >= upgradeCost, "Not enough Scullies to cover the upgrade cost.");
        _;
    }

    function calculateUpgradeCost(uint256 elementLevel) internal pure returns (uint256) {
        uint256 upgradeCost = elementLevel * 13 / 10; // Instead of 1.3, use 13 / 10 to avoid floating-point inaccuracies.
        return upgradeCost;
    }

    function getTopFivePlayers() public view returns (TopFive) {
        return TopFive;
    }
}
