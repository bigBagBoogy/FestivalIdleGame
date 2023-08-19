// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "lib/forge-std/src/interfaces/AggregatorV3Interface.sol";
import "lib/forge-std/src/console.sol";
import {PriceConvertor} from "../../src/PriceConvertor.sol";
import {HelperConfig} from "../../script/HelperConfig.s.sol";

contract PriceConvertorTest is Test {
    AggregatorV3Interface priceFeed;
    HelperConfig helperConfig;

    function setUp() public {
        helperConfig = new HelperConfig();
        priceFeed = AggregatorV3Interface(helperConfig.getOrCreateAnvilEthConfig().priceFeed);
    }

    // priceConvertor = new PriceConvertor();
    // whatever the chainid is, we'll have helperConfig's constructor
    // pick the pricefeed of that networkConfig

    function testGetConversionRate() public {
        uint256 ethAmount = 0.0025 ether;
        uint256 ethAmount2 = 0.005 ether;

        uint256 usdAmountCheatSilver = PriceConvertor.getConversionRate(ethAmount, priceFeed);
        console.log("USD Amount: ", usdAmountCheatSilver / 1000000000000000000);
        assertTrue(usdAmountCheatSilver > 0, "USD amount should be greater than 0");
        uint256 usdAmountCheatGold = PriceConvertor.getConversionRate(ethAmount2, priceFeed);
        console.log("USD Amount: ", usdAmountCheatGold / 1000000000000000000);
        assertTrue(usdAmountCheatGold > 0, "USD amount should be greater than 0");
    }

    function testGetUsdToEthConversionRate() public returns (uint256) {
        // getprice returns the price of eth in USD
        uint256 usdAmount = 5 * 1e18;
        uint256 ethPrice = PriceConvertor.getPrice(priceFeed); // the actual ETH/USD conversation rate, after adjusting the extra 0s.
        uint256 ethAmountCheatSilver = (usdAmount * 1e18 / ethPrice); // this will give WEI

        console.log("ethAmountCheatSilver in WEI: ", ethAmountCheatSilver);
        assertTrue(ethAmountCheatSilver > 0, "ETH amount should be greater than 0");

        return ethAmountCheatSilver;
    }
}
