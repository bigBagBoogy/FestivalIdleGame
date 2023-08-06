// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {PriceConvertor} from "./PriceConvertor.sol";
import {console} from "lib/forge-std/src/console.sol";
import {AggregatorV3Interface} from "lib/forge-std/src/interfaces/AggregatorV3Interface.sol";

contract Fundme {
    using PriceConvertor for uint256;

    error FundMe__NotOwner();

    // State variables
    uint256 public constant MINIMUM_USD = 5 * 10 ** 18;
    address private immutable i_owner;
    address[] private s_funders;
    AggregatorV3Interface private s_priceFeed;

    mapping(address funder => uint256 amountFunded) public s_addressToAmountFunded;

    // modifiers
    modifier onlyOwner() {
        // require(msg.sender == i_owner);
        if (msg.sender != i_owner) revert FundMe__NotOwner();
        _;
    }

    constructor(address priceFeed) {
        s_priceFeed = AggregatorV3Interface(priceFeed);
        i_owner = msg.sender;
    }

    function fund() public payable {
        require(msg.value.getConversionRate() >= 1e16, "Minimal amount is 0.01 ether"); // = 0.01e18 or 0.01 eth
        s_funders.push(msg.sender);
        s_addressToAmountFunded[msg.sender] = s_addressToAmountFunded[msg.sender] + msg.value;
    }

    function withdraw() public onlyOwner {
        for (uint256 fundersIndex = 0; fundersIndex < s_funders.length; fundersIndex++) {
            address funder = s_funders[fundersIndex];
            s_addressToAmountFunded[funder] = 0;
        }
        s_funders = new address[](0);
        (bool succes,) = i_owner.call{value: address(this).balance}("");
        require(succes, "Failed to withdraw funds");
    }

    function cheaperWithdraw() public onlyOwner {
        address[] memory funders = s_funders; // in stead of looping and then reading from storage each loop, we read from storage once, take the array inside the function an the loop over it thus saving gas.
        for (uint256 funderIndex = 0; funderIndex < funders.length; funderIndex++) {
            address funder = funders[funderIndex];
            s_addressToAmountFunded[funder] = 0;
        }
        s_funders = new address[](0);
        (bool success,) = i_owner.call{value: address(this).balance}("");
        require(success, "Failed to withdraw funds");
    }

    /**
     * Getter Functions
     */

    /**
     * @notice Gets the amount that an address has funded
     *  @param fundingAddress the address of the funder
     *  @return the amount funded
     */
    function getAddressToAmountFunded(address fundingAddress) public view returns (uint256) {
        return s_addressToAmountFunded[fundingAddress];
    }

    function getMINIMUM_USD() public pure returns (uint256) {
        return MINIMUM_USD;
    }

    function getVersion() public view returns (uint256) {
        return s_priceFeed.version();
    }

    function getFunder(uint256 index) public view returns (address) {
        return s_funders[index];
    }

    function getOwner() public view returns (address) {
        return i_owner;
    }

    function getPriceFeed() public view returns (AggregatorV3Interface) {
        return s_priceFeed;
    }
}
