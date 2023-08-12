// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {Script} from "forge-std/Script.sol";
import {HelperConfig} from "./HelperConfig.s.sol";
import {GameProgress} from "../src/GameProgress.sol";

contract DeployGameProgress is Script {
    function run() external returns (GameProgress, HelperConfig) {
        HelperConfig helperConfig = new HelperConfig();

        vm.startBroadcast();
        GameProgress gameProgress = new GameProgress();
        vm.stopBroadcast();
        return (gameProgress, helperConfig);
    }
}

// Even though the HelperConfig was originally written for FundMe.sol and has a lot of pricefeed stuff in it, it can still be used by Gameprogress as well. It will simply only use the settings of the nework config and ignore the rest.
