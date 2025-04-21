const hre = require("hardhat");

async function main() {
  const GameRewardNFT = await hre.ethers.getContractFactory("GameRewardNFT");
  const nft = await GameRewardNFT.deploy();
  await nft.deployed();
  console.log("✅ Contract deployed to:", nft.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
