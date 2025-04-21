
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import background from "../assets/images/celebration.gif";
import congratulationImage from "../assets/images/congrats2.png";

const PixelBox = styled(Box)(() => ({
  height: "100vh",
  width: "100vw",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundImage: "url(" + background + ")",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  fontFamily: '"Press Start 2P", cursive',
  position: "relative",
}));

const ImageContainer = styled(Box)(() => ({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0 auto",
  top: "-10%",
}));

const ButtonContainer = styled(Box)(() => ({
  position: "absolute",
  top: "80%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
  flexDirection: "column"
}));

const PixelButton = styled(Box)(() => ({
  display: "inline-block",
  backgroundColor: "#2c2c54",
  color: "#fff",
  fontFamily: '"Press Start 2P", cursive',
  fontSize: "18px",
  padding: "20px 50px",
  border: "3px solid #00d9ff",
  borderRadius: "12px",
  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.4)",
  cursor: "pointer",
  textAlign: "center",
  transition: "transform 0.3s, background-color 0.3s, box-shadow 0.3s",
  "&:hover": {
    backgroundColor: "#40407a",
    borderColor: "#00aaff",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.5)",
  },
  "&:active": {
    transform: "scale(0.95)",
  },
}));

const Congratulations = () => {
  const navigate = useNavigate();
  const walletAddress = localStorage.getItem("walletAddress");

  const handlePlayAgain = () => {
    navigate("/memory-card-game");
  };

  const handleExit = () => {
    localStorage.removeItem("gameCompleted");
    navigate("/play");
  };

  const handleClaimNFT = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/reward/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet: walletAddress }),
      });

      const mintResult = await res.json();
      if (mintResult.status !== "NFT Minted!") {
        alert("Mint failed");
        return;
      }

      const countRes = await fetch(`http://localhost:5000/api/reward/count/${walletAddress}`);
      const { count } = await countRes.json();

      alert(`NFT Claimed for ${walletAddress}\nYou now own ${count} Game Winner NFTs!`);
    } catch (error) {
      console.error("Error claiming NFT:", error);
      alert("Something went wrong while claiming NFT");
    }
  };

  return (
    <PixelBox>
      <ImageContainer>
        <img src={congratulationImage} alt="Congratulations" style={{ width: "100%", height: "89%" }} />
      </ImageContainer>

      <ButtonContainer>
        <PixelButton onClick={handlePlayAgain}>Yes</PixelButton>
        <PixelButton onClick={handleExit}>No</PixelButton>
        <PixelButton onClick={handleClaimNFT}>Claim NFT</PixelButton>
        <p style={{ fontSize: "12px", color: "#00ffcc" }}>
          Wallet: {walletAddress}
        </p>
      </ButtonContainer>
    </PixelBox>
  );
};

export default Congratulations;
