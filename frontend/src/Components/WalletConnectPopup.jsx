
import React, { useState } from 'react';
import { ethers } from 'ethers';

const WalletConnectPopup = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask extension!");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      setWalletAddress(address);
      setShowPopup(true);
    } catch (error) {
      console.error("MetaMask connection error:", error);
    }
  };

  return (
    <div style={{ marginTop: "20px", textAlign: "center" }}>
      <button
        onClick={connectWallet}
        style={{
          padding: "10px 20px",
          backgroundColor: "#2c2c54",
          color: "#fff",
          border: "2px solid #00d9ff",
          borderRadius: "8px",
          cursor: "pointer",
          fontFamily: "monospace",
          marginBottom: "10px"
        }}
      >
        Connect Wallet
      </button>

      {showPopup && (
        <div
          style={{
            backgroundColor: "#1e1e2f",
            color: "#00ffcc",
            padding: "15px",
            borderRadius: "10px",
            border: "2px dashed #00ffcc",
            fontFamily: "monospace"
          }}
        >
          ✅ Wallet Connected:<br />
          <strong>{walletAddress}</strong>
        </div>
      )}
    </div>
  );
};

export default WalletConnectPopup;
