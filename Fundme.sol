// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {PriceConvertor} from "./PriceConvertor.sol";
import {console} from "lib/forge-std/src/console.sol";

contract Fundme {
    using PriceConvertor for uint256;

    uint256 public minimumFundAmountUsd = 5e18; // $5

    address[] public funders;
    mapping(address funder => uint256 amountFunded) public s_addressToAmountFunded;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    function fund() public payable {
        require(msg.value.getConversionRate() >= 1e16, "Minimal amount is 0.01 ether"); // = 0.01e18 or 0.01 eth
        funders.push(msg.sender);
        s_addressToAmountFunded[msg.sender] = s_addressToAmountFunded[msg.sender] + msg.value;
    }

    function withdraw() onlyOwner {}

    function getminimumFundAmountUsd() public returns (uint256) {
        return minimumFundAmountUsd;
    }
}
