// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Splitter {
    event LogSplit(address indexed sender, uint256 value, address indexed recipient1, address indexed recipient2);

    function split(address payable website, address payable receiver) external payable {
        require(msg.value > 0, "Value must be greater than 0");

        uint256 fee = msg.value * 5 / 1000;
        uint256 fund = msg.value - fee;

        website.transfer(fee);
        receiver.transfer(fund);

        emit LogSplit(msg.sender, msg.value, website, receiver);
    }
}