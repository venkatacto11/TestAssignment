
const mongoose = require("mongoose");

const nftSchema = new mongoose.Schema({
  wallet: { type: String, required: true, unique: true },
  count: { type: Number, default: 0 }
});

module.exports = mongoose.model("NFT", nftSchema);
