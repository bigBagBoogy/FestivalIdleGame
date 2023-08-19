// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {AggregatorV3Interface} from "lib/forge-std/src/interfaces/AggregatorV3Interface.sol";
import {console} from "lib/forge-std/src/console.sol";

// function getPrice() internal view returns (uint256) {
//     AggregatorV3Interface priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
//     (, int256 price,,,) = priceFeed.latestRoundData();
//     //console.log(price); //price of eth in terms of usd. with 8 decimals 1e8
//     //since msg.value is in 1e18 we're doing:
//     return uint256(price * 1e10); // to match decimals
// }

/* @dev getting the chainlink pricefeed:*/
// we need the pricefeed address for eth/usd sepolia 0x694AA1769357215DE4FAC081bf1f309aDC325306 and/or mocks
// and the abi, but... in stead of looking for the ABI, we're going to us an interface.abi
// the AggregatorV3Interface
library PriceConvertor {
    // from ETH to USD
    function getPrice(AggregatorV3Interface priceFeed) internal view returns (uint256) {
        (, int256 answer,,,) = priceFeed.latestRoundData();
        // ETH/USD rate in 18 digit
        return uint256(answer * 10000000000);
    }

    // from USD to ETH
    function getConversionRate(uint256 ethAmount, AggregatorV3Interface priceFeed) internal view returns (uint256) {
        uint256 ethPrice = getPrice(priceFeed);
        uint256 ethAmountInUsd = (ethPrice * ethAmount) / 1000000000000000000;
        // the actual ETH/USD conversation rate, after adjusting the extra 0s.
        return ethAmountInUsd;
    }

    function getVersion() internal view returns (uint256) {
        return AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306).version();
    }
}
