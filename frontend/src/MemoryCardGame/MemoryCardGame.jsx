
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import { styled } from "@mui/system";
import { ethers } from "ethers";
import background from "../assets/images/mode1.gif";

const cardImages = [
  { id: 1, image: "/images/earth.png" }, { id: 2, image: "/images/earth.png" },
  { id: 3, image: "/images/jupiter.png" }, { id: 4, image: "/images/jupiter.png" },
  { id: 5, image: "/images/mars.png" }, { id: 6, image: "/images/mars.png" },
  { id: 7, image: "/images/mercury.png" }, { id: 8, image: "/images/mercury.png" },
  { id: 9, image: "/images/neptune.png" }, { id: 10, image: "/images/neptune.png" },
  { id: 11, image: "/images/saturn.png" }, { id: 12, image: "/images/saturn.png" }
];

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const StyledGameContainer = styled(Box)(({ mouseDisabled }) => ({
  minHeight: "100vh",
  width: "100vw",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundImage: `url(${background})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  position: "relative",
  pointerEvents: mouseDisabled ? "none" : "auto",
}));

const MemoryCardGame = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  useEffect(() => {
    // 👇 Only try wallet if ethereum exists AND user already connected
    const saveWalletToLocalStorage = async () => {
      try {
        if (window.ethereum && window.ethereum.selectedAddress) {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const wallet = await signer.getAddress();
          localStorage.setItem("walletAddress", wallet);
          console.log("✅ Wallet saved:", wallet);
        } else {
          console.log("⛔ No wallet connected yet.");
        }
      } catch (err) {
        console.error("⚠️ Error saving wallet:", err.message);
      }
    };
    saveWalletToLocalStorage();
  }, []);

  useEffect(() => {
    setCards(shuffleArray(cardImages));
  }, []);

  const handleCardClick = (card) => {
    console.log("Card clicked:", card);
  };

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      localStorage.setItem("gameCompleted", "true");
      setTimeout(() => navigate("/congratulations"), 1000);
    }
  }, [matchedCards]);

  return (
    <StyledGameContainer>
      <Grid container spacing={2} justifyContent="center" sx={{ maxWidth: 700 }}>
        {cards.map(card => (
          <Grid item xs={3} key={card.id}>
            <Box onClick={() => handleCardClick(card)} sx={{ backgroundColor: "#444", height: 100 }} />
          </Grid>
        ))}
      </Grid>
    </StyledGameContainer>
  );
};

export default MemoryCardGame;
