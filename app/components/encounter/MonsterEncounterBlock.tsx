import { Box, Grid, IconButton, Typography } from "@mui/material";

import CancelIcon from "@mui/icons-material/Cancel";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SecurityIcon from "@mui/icons-material/Security";
import Image from "next/image";
import { useState } from "react";
import LifeBar from "./LifeBar";

function MonsterEncounterBlock(props: any) {
  const [currentHP, setCurrentHP] = useState<number>(
    props?.monster?.health_point[0]?.value
  );
  const hpPercentage: number =
    (currentHP / props?.monster?.health_point[0]?.value) * 100;

  let color: string;
  if (hpPercentage > 50) color = "rgb(6, 167, 125)";
  else if (hpPercentage <= 50 && hpPercentage >= 25) color = "rgb(255, 136, 0)";
  else color = "rgb(252, 68, 15)";

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} sm={3} md={6} lg={4}>
        <Box
          style={{
            borderRadius: "50%",
            width: "110px" /* You can set this to whatever you prefer */,
            height:
              "110px" /* Ensure this matches the width for a perfect circle */,
            overflow: "hidden",
            WebkitBoxShadow: `${
              currentHP > 0
                ? `0px 0px 19px 2px ${color}`
                : `0px 0px 19px 2px gray`
            }  `,
            boxShadow: `${
              currentHP > 0
                ? `0px 0px 19px 2px ${color}`
                : `0px 0px 19px 2px gray`
            }  `,
            border: "3px solid lightgray",
            backgroundColor: "#bfbfbf",
            marginBottom: "1rem",
          }}
        >
          <Image
            src={props?.monster?.picture[0]?.creature_token_url}
            alt="hero second image"
            height={110}
            width={110}
          />
        </Box>
      </Grid>
      <Grid item xs={6} sm={9} md={6} lg={8} sx={{ pl: "0px !important" }}>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography variant="h6">
            {currentHP <= 0 && (
              <CancelIcon fontSize="small" sx={{ color: "red" }} />
            )}
            {props?.monster?.name[0]?.label}
          </Typography>
          <IconButton aria-label="more">
            <MoreHorizIcon />
          </IconButton>
        </Box>

        <LifeBar
          maxHP={props?.monster?.health_point[0]?.value}
          currentHP={currentHP}
          setCurrentHP={setCurrentHP}
          color={color}
        />
        <Box display={"flex"} gap={2}>
          <Typography
            sx={{
              fontFamily: "roboto",
              fontWeight: 300,
              backgroundColor: "#f9f9f9",
              py: 1,
            }}
          >
            <SecurityIcon
              fontSize="small"
              sx={{ color: "#256eff", mb: -0.5 }}
            />
            {props?.monster?.defense[0]?.value}
          </Typography>
          <Typography
            sx={{
              fontFamily: "roboto",
              fontWeight: 300,
              backgroundColor: "#f9f9f9",
              py: 1,
            }}
          >
            <DirectionsRunIcon
              fontSize="small"
              sx={{ color: "#06a77d", mb: -0.5 }}
            />
            {props?.monster?.init[0]?.value}
          </Typography>
        </Box>

        <Typography
          variant="body2"
          fontFamily={"Roboto"}
          fontWeight={300}
          dangerouslySetInnerHTML={{
            __html: props?.monster?.attacks[0].value,
          }}
          gutterBottom
        ></Typography>
      </Grid>
    </Grid>
  );
}

export default MonsterEncounterBlock;
