"use client";
import { DiceKey } from "@/types/profile";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

const diceIconMap: Record<DiceKey, string> = {
  "1d4": "/dices/d4.png",
  "1d6": "/dices/d6.png",
  "1d8": "/dices/d8.png",
  "1d10": "/dices/d10.png",
  "1d12": "/dices/d12.png",
  "1d20": "/dices/d20.png",
};

function Dice(props: { hitDie: DiceKey }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ mr: 1 }}>
        <Image
          src={diceIconMap[props.hitDie]}
          alt="dice-icon"
          width={50}
          height={50}
        />
      </Box>
      <Typography
        variant="body2"
        sx={{ fontFamily: "roboto", fontWeight: 300 }}
      >
        {props.hitDie}
      </Typography>
    </Box>
  );
}
export default Dice;
