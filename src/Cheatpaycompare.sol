// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Cheatpay {
    error Cheatpay__NotOwner();

    // State variables
    uint256 public constant MINIMUM_CHEAT = 0.0025 ether;
    address payable private immutable i_owner;
    address[] private s_cheaters;

    mapping(address cheater => uint256 amountPayed) public s_addressToAmountPayed;

    // modifiers
    // modifier onlyOwner() {
    //     // require(msg.sender == i_owner);
    //     if (msg.sender != i_owner) revert Cheatpay__NotOwner();
    //     _;
    // }
    modifier onlyOwner() {
        require(msg.sender == i_owner, "Cheatpay__NotOwner");
        _;
    }

    modifier moreThanZero() {
        require(address(this).balance > 0, "Amount must be greater than zero");
        _;
    }

    constructor() {
        i_owner = payable(msg.sender);
    }

    function payForScullies() public payable {
        require(msg.value >= MINIMUM_CHEAT, "Amount is wrong");
        s_addressToAmountPayed[msg.sender] += msg.value;
        s_cheaters.push(msg.sender);
    }

    function withdraw() public onlyOwner {
        for (uint256 cheatersIndex = 0; cheatersIndex < s_cheaters.length; cheatersIndex++) {
            address cheater = s_cheaters[cheatersIndex];
            s_addressToAmountPayed[cheater] = 0;
        }
        s_cheaters = new address[](0);
        (bool success,) = i_owner.call{value: address(this).balance}("");
        require(success, "Failed to withdraw funds");
    }

    function cheaperWithdraw() public onlyOwner moreThanZero {
        address[] memory cheaters = s_cheaters; // in stead of looping and then reading from storage each loop, we read from storage once, take the array inside the function an the loop over it thus saving gas.
        for (uint256 cheatersIndex = 0; cheatersIndex < cheaters.length; cheatersIndex++) {
            address cheater = cheaters[cheatersIndex];
            s_addressToAmountPayed[cheater] = 0;
        }
        // s_cheaters = new address[](0);
        // bool success = payable(i_owner).send(address(this).balance);
        // require(success, "Failed to withdraw funds");

        s_cheaters = new address[](0);
        (bool success,) = i_owner.call{value: address(this).balance}("");
        require(success, "Failed to withdraw funds");
        //0xbe2693f0   <--  function selector of cheaperWithdraw
    }

    /**
     * Getter Functions
     */

    /**
     * @notice Gets the amount that an address has payed
     *  @param payingAddress the address of the payer
     *  @return the amount payed
     */
    function getAddressToAmountPayed(address payingAddress) public view returns (uint256) {
        return s_addressToAmountPayed[payingAddress];
    }

    function getMINIMUM_CHEAT() public pure returns (uint256) {
        return MINIMUM_CHEAT;
    }

    function getCheater(uint256 index) public view returns (address) {
        return s_cheaters[index];
    }

    function getOwner() public view returns (address) {
        return i_owner;
    }

    function getOwnerBalance() public view returns (uint256) {
        return i_owner.balance;
    }
}
