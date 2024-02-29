// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.24;

error NumberOutOfRange();

contract SimpleStorage {
    uint256 private _value;

    function setValue(uint256 newValue) public {
        _value = newValue;
    }

    function getValue() public view returns (uint256) {
        return _value;
    }

    function getCurrentTime() public view returns(uint256) {
        return block.timestamp;
    }
}
