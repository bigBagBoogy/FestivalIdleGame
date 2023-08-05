// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {AggregatorV3Interface} from "./AggregatorV3Interface.sol";
import {console} from "./lib/forge-std/console.sol";

contract Fundme {
    uint256 public minimumFundAmountUsd = 5e18; // $5

    address[] public funders;
    mapping(address funder => uint256 amountFunded) public s_addressToAmountFunded;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    function fund() public payable {
        require(getConversionRate(msg.value) >= 1e16, "Minimal amount is 0.01 ether"); // = 0.01e18 or 0.01 eth
        funders.push(msg.sender);
        s_addressToAmountFunded[msg.sender] = s_addressToAmountFunded[msg.sender] + msg.value;
    }

    function withdraw() onlyOwner {}

    function getminimumFundAmountUsd() public returns (uint256) {
        return minimumFundAmountUsd;
    }

    function getVersion() public view returns (uint256) {
        return AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306).version();
    }
}
