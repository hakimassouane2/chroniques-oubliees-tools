"use client";
import HeroSection from "@/components/HeroSection";
import MonsterEncounterBlock from "@/components/encounter/MonsterEncounterBlock";
import { useLoading } from "@/contexts/LoadingContext";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import * as React from "react";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  fontFamily: "Roboto",
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

const Encounters = () => {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const [creatures, setCreatures] = React.useState([]);
  const [selectedCreature, setSelectedCreature] = React.useState(null);
  const [creatureCounters, setCreatureCounters] = React.useState({});
  const [quantity, setQuantity] = React.useState(1);
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

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const handleAddCreature = () => {
    if (selectedCreature) {
      const newMonsters: any[] = [];
      for (let i = 0; i < quantity; i++) {
        newMonsters.push(selectedCreature);
      }
      setCreatureCounters((prev: any) => ({
        ...prev,
        // @ts-ignore
        [selectedCreature._id]: quantity,
      }));

      const currentEncounter = localStorage.getItem("encounter");
      if (!currentEncounter) {
        localStorage.setItem("encounter", JSON.stringify(newMonsters));
      } else {
        localStorage.setItem(
          "encounter",
          JSON.stringify([...JSON.parse(currentEncounter), ...newMonsters])
        );
      }
    }
  };

  const handleDeleteAll = () => {
    // Clear encounter data from state
    setCreatureCounters({});

    // Clear encounter data from localStorage
    localStorage.removeItem("encounter");
  };

  return (
    <>
      <HeroSection
        imageSrc="/heroes/encounter.webp"
        title="Générateur de rencontres"
      />
      <Container maxWidth="xl">
        <Card sx={{ borderRadius: 0, position: "relative", mt: -10, mb: 10 }}>
          <CardContent>
            <Accordion
              defaultExpanded={true}
              onChange={handleChange("panel1")}
              sx={{ mt: 2 }}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography
                  variant="body2"
                  sx={{ fontFamily: "roboto", fontWeight: 300 }}
                >
                  Gérer les créatures
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box
                  display={"flex"}
                  gap={2}
                  sx={{ flexDirection: { xs: "column", md: "row" } }}
                >
                  <Autocomplete
                    options={creatures}
                    fullWidth
                    // @ts-ignore
                    getOptionLabel={(option) =>
                      // @ts-ignore
                      `${option?.name[0]?.label} - NC ${option?.level[0]?.value}`
                    }
                    sx={{
                      width: { xs: "100%", md: "30%", lg: "25%" },
                      "& .MuiAutocomplete-input, & .MuiInputLabel-root": {
                        fontFamily: "Roboto",
                        fontWeight: 300,
                      },
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Créature" />
                    )}
                    ListboxProps={{
                      sx: {
                        fontFamily: "Roboto",
                        fontWeight: 300,
                      },
                    }}
                    onChange={(_, value) => setSelectedCreature(value)} // Update selectedCreature state
                  />
                  <TextField
                    type="number"
                    inputProps={{
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                      min: 1,
                    }}
                    sx={{
                      width: { xs: "100%", md: "10%", lg: "10%" },
                    }}
                    InputProps={{
                      sx: {
                        fontFamily: "Roboto",
                        fontWeight: 300,
                      },
                    }}
                    value={quantity} // Bind the value of the input field to the state
                    onChange={(e) => setQuantity(parseInt(e.target.value))} // Update the state when the input changes
                  />
                  <Button
                    variant="contained"
                    onClick={handleAddCreature}
                    sx={{
                      fontFamily: "Roboto",
                      fontWeight: 300,
                      color: "white",
                      textTransform: "none",
                    }}
                  >
                    Ajouter
                  </Button>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Grid container spacing={2} sx={{ mt: 2 }}>
              {localStorage.getItem("encounter") &&
                JSON.parse(localStorage.getItem("encounter")!).map(
                  (monster: any, index: number) => (
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      lg={4}
                      key={monster.name[0].label}
                    >
                      <MonsterEncounterBlock monster={monster} />
                    </Grid>
                  )
                )}
            </Grid>
            <Divider />
            <Button
              variant="contained"
              color="error"
              sx={{
                mt: 2,
                fontFamily: "Roboto",
                fontWeight: 300,
                textTransform: "capitalize",
              }}
              onClick={handleDeleteAll} // Attach the handleDeleteAll function to the button click event
            >
              Tout supprimer
            </Button>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default Encounters;
