
import React from 'react';
import { useNavigate } from 'react-router-dom';
import WalletConnectPopup from '../Components/WalletConnectPopup';

const Play = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>🎮 Welcome to Memory Game</h2>

      <button
        onClick={() => navigate("/easy")}
        style={{
          padding: "12px 30px",
          marginTop: "20px",
          backgroundColor: "#4CAF50",
          color: "white",
          borderRadius: "8px",
          fontSize: "16px"
        }}
      >
        Play Game
      </button>

      {/* Wallet Connect Component */}
      <WalletConnectPopup />
    </div>
  );
};

export default Play;
