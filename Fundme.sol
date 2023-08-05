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

    /* @dev getting the chainlink pricefeed:*/
    // we need the pricefeed address for eth/usd sepolia and/or mocks
    // and the abi, but... in stead of lokking for the ABI, we're going to us an interface.abi
    // the AggregatorV3Interface
    function getPrice() public {}
    function getConversionRate() public {}

    function getMinimalFundAmountUsd() public returns (uint256) {
        return minimalFundAmountUsd;
    }
}
