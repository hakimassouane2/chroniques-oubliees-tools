"use client";
import HeroSection from "@/components/HeroSection";
import { useLoading } from "@/contexts/LoadingContext";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SecurityIcon from "@mui/icons-material/Security";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  FormHelperText,
  Grid,
  Typography,
} from "@mui/material";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import * as React from "react";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  fontFamily: "Roboto !important",
  fontWeight: 300,
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
  "&.Mui-expanded:first-of-type": {
    marginTop: 16,
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  fontFamily: "Roboto !important",
  fontWeight: 300,
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
  fontFamily: "Roboto !important",
  fontWeight: 300,
}));

const Creatures = () => {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [sortType, setSortType] = React.useState(1);
  const [creatures, setCreatures] = React.useState([]);
  const { setIsLoading } = useLoading();

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const response = await fetch("/api/creatures");
      const data = await response.json();
      setCreatures(data);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  React.useEffect(() => {
    // Sort creatures based on sortType
    let sortedCreatures = [...creatures]; // Create a copy of creatures array

    switch (sortType) {
      case 1: // A - Z
        sortedCreatures.sort((a, b) =>
          // @ts-ignore
          a.name[0].label.localeCompare(b.name[0].label)
        );
        break;
      case 2: // Z - A
        sortedCreatures.sort((a, b) =>
          // @ts-ignore
          b.name[0].label.localeCompare(a.name[0].label)
        );
        break;
      case 3: // NC le plus bas
        // @ts-ignore
        sortedCreatures.sort((a, b) => a.level[0].value - b.level[0].value);
        break;
      case 4: // NC le plus haut
        // @ts-ignore
        sortedCreatures.sort((a, b) => b.level[0].value - a.level[0].value);
        break;
      default:
        break;
    }

    setCreatures(sortedCreatures);
  }, [sortType]); // Add sortType as a dependency so it triggers the sorting when it changes

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <>
      <HeroSection
        imageSrc="/heroes/creatures-min.png.webp"
        buttonText="En savoir plus"
        buttonLink="/game/rules"
        title="Créatures"
        subtitle="Retrouvez l'ensemble des créatures du bestiaire public de Chroniques Oubliées Fantasy !"
      />
      <Container maxWidth="xl">
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          sx={{ mt: 2 }}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography sx={{ fontFamily: "roboto", fontWeight: 300 }}>
              Filtres
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box display={"flex"} flexDirection={"row"} gap={5}>
              <TextField
                id="outlined-basic"
                label="Nom de la créature"
                variant="standard"
                inputProps={{
                  style: { fontFamily: "roboto", fontWeight: 300 },
                }} // font size of input text
                InputLabelProps={{
                  shrink: true,
                  style: { fontFamily: "roboto", fontWeight: 300 },
                }} // font size of input label
                onChange={(e: any) => {
                  setSearchTerm(e.target.value);
                }}
              />
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={sortType}
                label="Nom de la créature"
                variant="standard"
                autoWidth
                sx={{ fontFamily: "roboto", fontWeight: 300 }}
                onChange={(e: any) => {
                  setSortType(e.target.value);
                }}
              >
                <MenuItem value={1}>A - Z</MenuItem>
                <MenuItem value={2}>Z - A</MenuItem>
                <MenuItem value={3}>NC le plus bas</MenuItem>
                <MenuItem value={4}>NC le plus haut</MenuItem>
              </Select>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Grid container spacing={3} sx={{ mt: 1, mb: 10 }}>
          {creatures
            .filter((monster: any) => {
              if (
                monster?.name[0]?.label
                  .toLowerCase()
                  .match(searchTerm.toLowerCase().trim())
              ) {
                return monster;
              }
            })
            .map((monster: any, index: any) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card sx={{ borderRadius: 2 }}>
                  <Link
                    href={`creatures/${encodeURIComponent(
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
                    <Typography
                      variant="h5"
                      color={"primary"}
                      title={monster?.name[0]?.label}
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {monster?.name[0]?.label}
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
                      <b>FOR</b>
                      {monster?.str_mod[0]?.value > 0 ? "+" : ""}
                      {monster?.str_mod[0]?.value}
                      <b>DEX</b>
                      {monster?.dex_mod[0]?.value > 0 ? "+" : ""}
                      {monster?.dex_mod[0]?.value}
                      <b>CON</b>
                      {monster?.con_mod[0]?.value > 0 ? "+" : ""}
                      {monster?.con_mod[0]?.value}
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
                      {monster?.int_mod[0]?.value > 0 ? "+" : ""}
                      {monster?.int_mod[0]?.value}
                      <b>SAG</b>
                      {monster?.wis_mod[0]?.value > 0 ? "+" : ""}
                      {monster?.wis_mod[0]?.value}
                      <b>CHA</b>
                      {monster?.cha_mod[0]?.value > 0 ? "+" : ""}
                      {monster?.cha_mod[0]?.value}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Container>
    </>
  );
};

export default Creatures;
