
import { ethers } from 'ethers';

export async function getConnectedWalletAddress() {
  if (!window.ethereum) {
    alert("MetaMask not installed. Please install it to use this app.");
    return null;
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    return address;
  } catch (error) {
    console.error("Error connecting to wallet:", error);
    return null;
  }
}
