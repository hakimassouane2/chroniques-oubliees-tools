import { Box, Button, LinearProgress, Typography } from "@mui/material";
import React from "react";

interface LifeBarProps {
  maxHP: number;
  currentHP: number;
  color: string;
  setCurrentHP: any;
}

const LifeBar: React.FC<LifeBarProps> = ({
  maxHP,
  currentHP,
  color,
  setCurrentHP,
}) => {
  const hpPercentage: number = (currentHP / maxHP) * 100;

  return (
    <Box display="flex" alignItems="center">
      <Button
        variant="contained"
        sx={{
          backgroundColor: "rgb(188, 44, 2)",
          borderColor: "rgb(188, 44, 2)",
          color: "white",
          maxWidth: 30,
          maxHeight: 30,
          minWidth: 30,
          minHeight: 30,
          borderRadius: 0,
          borderTopLeftRadius: 5,
          borderBottomLeftRadius: 5,
          boxShadow: "none",
          fontFamily: "Roboto",
          fontWeight: 300,
        }}
        onClick={() => setCurrentHP((prev: any) => Math.max(0, prev - 1))}
      >
        -
      </Button>
      <Box flexGrow={1} position="relative">
        <Box
          position="absolute"
          top={0}
          left="45%"
          sx={{ zIndex: 50, color: "white" }}
        >
          <Typography
            variant="subtitle2"
            sx={{ fontFamily: "Roboto", fontWeight: 300 }}
          >
            {currentHP} / {maxHP}
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={hpPercentage}
          sx={{
            height: 30,
            borderRadius: 0,
            backgroundColor: "rgba(0,0,0,.25)",
            "& .MuiLinearProgress-bar": {
              backgroundColor: color,
            },
          }}
        />
      </Box>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "rgb(3, 94, 70)",
          borderColor: "rgb(3, 94, 70)",
          color: "white",
          maxWidth: 30,
          maxHeight: 30,
          minWidth: 30,
          minHeight: 30,
          borderRadius: 0,
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5,
          boxShadow: "none",
          fontFamily: "Roboto",
          fontWeight: 300,
        }}
        onClick={() => setCurrentHP((prev: any) => Math.min(maxHP, prev + 1))}
      >
        +
      </Button>
    </Box>
  );
};

export default LifeBar;