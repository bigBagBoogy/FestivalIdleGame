// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {Script} from "forge-std/Script.sol";
import {HelperConfig} from "./HelperConfig.s.sol";
import {Fundme} from "../src/Fundme.sol";

contract DeployFundme is Script {
    function run() external returns (Fundme, HelperConfig) {
        HelperConfig helperConfig = new HelperConfig(); // This comes with our mocks!
        address priceFeed = helperConfig.activeNetworkConfig();

        vm.startBroadcast();
        Fundme fundme = new Fundme(priceFeed);
        vm.stopBroadcast();
        return (fundme, helperConfig);
    }
}
