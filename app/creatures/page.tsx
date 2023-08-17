"use client";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import Link from "next/link";
import data from "../../public/creatures/creatures.json";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SecurityIcon from "@mui/icons-material/Security";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import * as React from "react";
import TextField from "@mui/material/TextField";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { styled } from "@mui/material/styles";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const Creatures = () => {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [sortType, setSortType] = React.useState("");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const handleAgeChange = (event: SelectChangeEvent) => {
    setSortType(event.target.value as string);
  };

  return (
    <>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        sx={{ mt: 2 }}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Filtres</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            id="outlined-basic"
            label="Nom de la créature"
            variant="outlined"
            onChange={(e: any) => {
              setSearchTerm(e.target.value);
            }}
          />
          <FormControl>
            <InputLabel id="demo-simple-select-label">Trier par</InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sortType}
              label="Trier par"
              onChange={handleAgeChange}
            >
              <MenuItem value={1}>A - Z</MenuItem>
              <MenuItem value={2}>Z - A</MenuItem>
              <MenuItem value={3}>NC le plus bas</MenuItem>
              <MenuItem value={4}>NC le plus haut</MenuItem>
            </Select>
          </FormControl>
        </AccordionDetails>
      </Accordion>
      <Grid container spacing={3} sx={{ mt: 1, mb: 10 }}>
        {data
          .filter((monster: any) => {
            if (monster?.name[0]?.value.toLowerCase().match(searchTerm)) {
              return monster;
            }
          })
          .map((monster: any, index: any) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card sx={{ borderRadius: 2 }}>
                <Link
                  href={`/creatures/${encodeURIComponent(
                    monster?.name[0]?.value
                  )}`}
                >
                  <CardMedia
                    component="img"
                    alt={monster?.picture[0]?.alt}
                    height="350"
                    image={monster?.picture[0]?.creature_token_url}
                    sx={{ backgroundColor: "#c5c5c5" }}
                  />
                </Link>
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="h5" color={"primary"}>
                    {monster?.name[0]?.value}
                  </Typography>
                  {/* Archétype */}
                  <Typography
                    variant="body2"
                    fontWeight={300}
                    fontFamily={"Roboto"}
                    sx={{ color: "#212529" }}
                  >
                    Archétype {monster?.archetype[0]?.label}
                  </Typography>
                  {/* Catégorie et taille */}
                  <Typography
                    variant="body2"
                    fontWeight={300}
                    fontFamily={"Roboto"}
                    sx={{ color: "#212529", mb: 1 }}
                  >
                    Créature {monster?.category[0]?.label},{" "}
                    {monster?.size[0]?.label}
                  </Typography>
                  {/* Niveau */}
                  <Typography
                    variant="body2"
                    fontWeight={300}
                    fontFamily={"Roboto"}
                    sx={{ color: "#212529", mb: 1 }}
                  >
                    <b>NC:</b>
                    {monster?.level[0]?.value}
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight={300}
                    fontFamily={"Roboto"}
                    sx={{
                      color: "#212529",
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <b>DEF</b>
                    <SecurityIcon sx={{ color: "#256eff" }} />
                    {monster?.defense[0]?.value}
                    <b>PV</b>
                    <FavoriteIcon sx={{ color: "#fc440f" }} />
                    {monster?.health_point[0]?.value}
                    <b>INIT</b>
                    <DirectionsRunIcon sx={{ color: "#06a77d" }} />
                    {monster?.init[0]?.value}
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight={300}
                    fontFamily={"Roboto"}
                    sx={{
                      color: "#212529",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <b>FOR</b>+{monster?.str_mod[0]?.value}
                    <b>DEX</b>+{monster?.dex_mod[0]?.value}
                    <b>CON</b>+{monster?.con_mod[0]?.value}
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight={300}
                    fontFamily={"Roboto"}
                    sx={{
                      color: "#212529",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <b>INT</b>
                    <span>+{monster?.int_mod[0]?.value}</span>
                    <b>SAG</b>+{monster?.wis_mod[0]?.value}
                    <b>CHA</b>+{monster?.cha_mod[0]?.value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default Creatures;
