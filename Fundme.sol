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

    /* @dev getting the chainlink pricefeed:*/
    // we need the pricefeed address for eth/usd sepolia 0x694AA1769357215DE4FAC081bf1f309aDC325306 and/or mocks
    // and the abi, but... in stead of lokking for the ABI, we're going to us an interface.abi
    // the AggregatorV3Interface
    function getPrice() public view returns (uint256) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        (, int256 price,,,) = priceFeed.latestRoundData();
        console.log(price); //price of eth in terms of usd. with 8 decimals 1e8
        //since msg.value is in 1e18 we're doing:
        return uint256(price * 1e10); // to match decimals
    }

    function getConversionRate(uint256 ethAmount) public view returns (uint256) {
        uint256 ethPrice = getPrice();
        // rule for math in solidity is to always multiply before you divide (to keep whole numbers).
        uint256 ethAmountInUsd = (ethAmountInUsd * ethPrice) / 1e18;
    }

    function getminimumFundAmountUsd() public returns (uint256) {
        return minimumFundAmountUsd;
    }

    function getVersion() public view returns (uint256) {
        return AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306).version();
    }
}
