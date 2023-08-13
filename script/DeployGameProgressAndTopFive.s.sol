// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {Script} from "forge-std/Script.sol";
import {HelperConfig} from "./HelperConfig.s.sol";
import {GameProgressAndTopFive} from "../src/GameProgressAndTopFive.sol";

contract DeploygameProgressAndTopFive is Script {
    function run() external returns (GameProgressAndTopFive, HelperConfig) {
        HelperConfig helperConfig = new HelperConfig();

        vm.startBroadcast();
        GameProgressAndTopFive gameProgressAndTopFive = new GameProgressAndTopFive();
        vm.stopBroadcast();
        return (gameProgressAndTopFive, helperConfig);
    }
}

// Even though the HelperConfig was originally written for FundMe.sol and has a lot of pricefeed stuff in it, it can still be used by Gameprogress as well. It will simply only use the settings of the nework config and ignore the rest.
