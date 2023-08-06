// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {AggregatorV3Interface} from "lib/forge-std/src/interfaces/AggregatorV3Interface.sol";
import {console} from "lib/forge-std/src/console.sol";

library PriceConvertor {
    /* @dev getting the chainlink pricefeed:*/
    // we need the pricefeed address for eth/usd sepolia 0x694AA1769357215DE4FAC081bf1f309aDC325306 and/or mocks
    // and the abi, but... in stead of looking for the ABI, we're going to us an interface.abi
    // the AggregatorV3Interface
    function getPrice() internal view returns (uint256) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        (, int256 price,,,) = priceFeed.latestRoundData();
        //console.log(price); //price of eth in terms of usd. with 8 decimals 1e8
        //since msg.value is in 1e18 we're doing:
        return uint256(price * 1e10); // to match decimals
    }

    function getConversionRate(uint256 ethAmount) internal view returns (uint256) {
        uint256 ethPrice = getPrice();
        uint256 ethAmountInUsd;
        // rule for math in solidity is to always multiply before you divide (to keep whole numbers).
        ethAmountInUsd = (ethAmountInUsd * ethPrice) / 1e18;
        return ethAmountInUsd;
    }

    function getVersion() internal view returns (uint256) {
        return AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306).version();
    }
}
