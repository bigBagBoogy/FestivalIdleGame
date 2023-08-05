// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Fundme {
    uint256 public minimalFundAmountUsd = 5;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    function fund() public payable {
        require(msg.value > 1e16, "Minimal amount is 0.01 ether"); // = 0.01e18 or 0.01 eth
    }

    function withdraw() onlyOwner {}

    function getPrice() {}
    function getConversionRate() {}

    function getMinimalFundAmountUsd() returns (uint256) {
        return minimalFundAmountUsd;
    }
}
