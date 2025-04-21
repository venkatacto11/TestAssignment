// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GameRewardNFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter = 1;

    constructor() ERC721("GameWinner", "GWNFT") Ownable() {}

    function mintReward(address to, string memory uri) external onlyOwner {
        uint256 tokenId = _tokenIdCounter++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }
}