const express = require("express");
const router = express.Router();
const NFT = require("../models/nfts");
const { ethers } = require("ethers");
require("dotenv").config();

// Smart Contract Setup
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const ABI = require("../abi/RewardNFT.json");
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

// POST /claim
router.post("/claim", async (req, res) => {
  const { wallet } = req.body;
  if (!wallet) return res.status(400).json({ error: "Wallet required" });

  try {
    const uri = "ipfs://QmPlaceholderMetadataHash"; // replace with real IPFS URI
    const tx = await contract.mintReward(wallet, uri);
    await tx.wait();

    let existing = await NFT.findOne({ wallet });
    let count;
    if (existing) {
      existing.count += 1;
      await existing.save();
      count = existing.count;
    } else {
      const newNFT = new NFT({ wallet, count: 1 });
      await newNFT.save();
      count = 1;
    }

    res.json({ message: "NFT Minted & Count Updated", count });
  } catch (err) {
    console.error("❌ Error minting:", err.message);
    res.status(500).json({ error: "Mint failed", detail: err.message });
  }
});

// GET /count/:wallet
router.get("/count/:wallet", async (req, res) => {
  const wallet = req.params.wallet;
  const record = await NFT.findOne({ wallet });

  if (!record) return res.json({ count: 0 });
  return res.json({ count: record.count });
});

module.exports = router;
