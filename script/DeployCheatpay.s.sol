// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {Script} from "forge-std/Script.sol";
import {HelperConfig} from "./HelperConfig.s.sol";
import {Cheatpay} from "../src/Cheatpay.sol";

contract DeployCheatpay is Script {
    function run() external returns (Cheatpay, HelperConfig) {
        HelperConfig helperConfig = new HelperConfig(); // This comes with our mocks!
        address priceFeed = helperConfig.activeNetworkConfig();

        vm.startBroadcast();
        Cheatpay cheatpay = new Cheatpay(priceFeed);
        vm.stopBroadcast();
        return (cheatpay, helperConfig);
    }
}
// below for deploying without pricefeed

// pragma solidity ^0.8.19;

// import {Script} from "forge-std/Script.sol";
// import {Cheatpay} from "../src/Cheatpay.sol";

// contract DeployCheatpay is Script {
//     function run() external returns (Cheatpay) {
//         vm.startBroadcast();
//         Cheatpay cheatpay = new Cheatpay();
//         vm.stopBroadcast();
//         return (cheatpay);
//     }
// }
