// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import {DeployCheatpay} from "../../script/DeployCheatpay.s.sol";
import {Cheatpay} from "../../src/Cheatpay.sol";
import {HelperConfig} from "../../script/HelperConfig.s.sol";
import {Test, console} from "forge-std/Test.sol";
import {StdCheats} from "forge-std/StdCheats.sol";

contract CheatpayTest is StdCheats, Test {
    Cheatpay public cheatpay;
    HelperConfig public helperConfig;

    uint256 public constant SEND_VALUE = 0.1 ether; // just a value to make sure we are sending enough!
    uint256 public constant STARTING_USER_BALANCE = 10 ether;
    uint256 public constant GAS_PRICE = 1;

    address public constant USER = address(1);

    // uint256 public constant SEND_VALUE = 1e18;
    // uint256 public constant SEND_VALUE = 1_000_000_000_000_000_000;
    // uint256 public constant SEND_VALUE = 1000000000000000000;

    function setUp() external {
        DeployCheatpay deployer = new DeployCheatpay();
        (cheatpay, helperConfig) = deployer.run();
        vm.deal(USER, STARTING_USER_BALANCE);
    }

    function testPriceFeedSetCorrectly() public {
        address retreivedPriceFeed = address(cheatpay.getPriceFeed());
        // (address expectedPriceFeed) = helperConfig.activeNetworkConfig();
        address expectedPriceFeed = helperConfig.activeNetworkConfig();
        console.log(retreivedPriceFeed, expectedPriceFeed);
        assertEq(retreivedPriceFeed, expectedPriceFeed);
    }

    function testPayForSculliesFailsWithoutEnoughETH() public {
        vm.expectRevert();
        cheatpay.payForScullies();
    }

    function testPayForSculliesUpdatesCheatersDataStructure() public {
        vm.startPrank(USER);
        cheatpay.payForScullies{value: SEND_VALUE}();
        vm.stopPrank();

        uint256 amountpayed = cheatpay.getAddressToAmountPayed(USER);
        assertEq(amountpayed, SEND_VALUE);
        console.log(amountpayed);
    }

    function testAddsCheaterToArrayOfCheaters() public {
        vm.startPrank(USER);
        cheatpay.payForScullies{value: SEND_VALUE}();
        vm.stopPrank();

        address cheater = cheatpay.getCheater(0);
        assertEq(cheater, USER);
    }

    modifier PayedForScullies() {
        vm.prank(USER);
        cheatpay.payForScullies{value: SEND_VALUE}();
        assert(address(cheatpay).balance > 0);
        _;
    }

    function testOnlyOwnerCanWithdraw() public PayedForScullies {
        vm.expectRevert();
        cheatpay.withdraw();
    }

    function testWithdrawFromASingleCheater() public PayedForScullies {
        // Arrange
        uint256 startingCheatpayBalance = address(cheatpay).balance;
        uint256 startingOwnerBalance = cheatpay.getOwner().balance;

        // vm.txGasPrice(GAS_PRICE);
        // uint256 gasStart = gasleft();
        // // Act
        vm.startPrank(cheatpay.getOwner());
        cheatpay.withdraw();
        vm.stopPrank();

        // uint256 gasEnd = gasleft();
        // uint256 gasUsed = (gasStart - gasEnd) * tx.gasprice;

        // Assert
        uint256 endingCheatpayBalance = address(cheatpay).balance;
        uint256 endingOwnerBalance = cheatpay.getOwner().balance;
        assertEq(endingCheatpayBalance, 0);
        assertEq(
            startingCheatpayBalance + startingOwnerBalance,
            endingOwnerBalance // + gasUsed
        );
    }

    // Can we do our withdraw function a cheaper way?
    function testWithDrawFromMultipleCheaters() public PayedForScullies {
        uint160 numberOfCheaters = 10;
        uint160 startingCheatererIndex = 2;
        for (uint160 i = startingCheatererIndex; i < numberOfCheaters + startingCheatererIndex; i++) {
            // we get hoax from stdcheats
            // prank + deal
            hoax(address(i), STARTING_USER_BALANCE);
            cheatpay.payForScullies{value: SEND_VALUE}();
        }

        uint256 startingCheatpayBalance = address(cheatpay).balance;
        uint256 startingOwnerBalance = cheatpay.getOwner().balance;

        vm.startPrank(cheatpay.getOwner());
        cheatpay.withdraw();
        vm.stopPrank();

        assert(address(cheatpay).balance == 0);
        assert(startingCheatpayBalance + startingOwnerBalance == cheatpay.getOwner().balance);
        assert((numberOfCheaters + 1) * SEND_VALUE == cheatpay.getOwner().balance - startingOwnerBalance);
        console.log("hi");
    }
}
