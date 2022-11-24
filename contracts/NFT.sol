//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
//This contract will be using ERC721 standard

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
//This library gives additional functional which is 'setToken' to set token for URI

import "@openzeppelin/contracts/utils/Counters.sol";

// Would be used for incrementing numbers

contract NFT is ERC721URIStorage {
    //Inheriting this contract from ERC721URIStorage

    using Counters for Counters.Counter; //Assigning values to counter struct from counters library
    Counters.Counter private _tokenIds; //Using a counter variable
    address contractAddress; //To manipulate or change the address of tokens

    constructor(address marketplaceAddress) ERC721("Metaverse Tokens", "METT") {
        contractAddress = marketplaceAddress;
    }

    function createToken(string memory tokenURI) public returns (uint) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        setApprovalForAll(contractAddress, true); //Giving approval to transact token between users
        return newItemId;
    }
}
