import { useState } from 'react';
import { ethers } from 'ethers';

function WalletConnect({ onAddressConnected }) {
  const [address, setAddress] = useState("");

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      setAddress(userAddress);
      onAddressConnected(userAddress);
      localStorage.setItem("walletAddress", userAddress); // ✅ Save for Congrats screen
      console.log("Wallet Address Saved:", userAddress);  // ✅ Debug log
    } catch (err) {
      console.error("Wallet connection error:", err);
    }
  };

  return (
    <div style={{ padding: "10px" }}>
      <button onClick={connectWallet}>Connect Wallet</button>
      {address && <p>Connected: {address}</p>}
    </div>
  );
}

export default WalletConnect;
