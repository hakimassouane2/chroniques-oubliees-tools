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
  const [encounterMonsters, setEncounterMonsters] = React.useState([]);
  const [creatures, setCreatures] = React.useState([]);
  const [selectedCreature, setSelectedCreature] = React.useState(null);
  const [creatureCounters, setCreatureCounters] = React.useState({});
  const [quantity, setQuantity] = React.useState(1);
  const { setIsLoading } = useLoading();

  // Load encounter data from localStorage on component mount
  React.useEffect(() => {
    const savedEncounter = localStorage.getItem("encounter");
    if (savedEncounter) {
      setEncounterMonsters(JSON.parse(savedEncounter));
    }
  }, []);

  // Save encounter data to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem("encounter", JSON.stringify(encounterMonsters));
  }, [encounterMonsters]);

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
      const numCreatures = quantity;

      const existingCreatureNames = new Set(
        // @ts-ignore
        encounterMonsters.map((monster) => monster.name[0].label)
      );

      // @ts-ignore
      const baseName = selectedCreature.name[0].label;
      // @ts-ignore
      const existingCount = creatureCounters[baseName] || 0;

      const newMonsters = Array.from({ length: numCreatures }, (_, index) => {
        const newName =
          existingCount > 0
            ? `${baseName} ${existingCount + index + 1}`
            : `${baseName} ${index + 1}`;

        let counter = 1;
        let suffix = "";
        while (existingCreatureNames.has(newName + suffix)) {
          counter++;
          suffix = ` ${counter}`;
        }

        const finalName = counter > 1 ? `${newName} ${counter}` : newName;

        setCreatureCounters((prevCounters) => ({
          ...prevCounters,
          [baseName]: existingCount + numCreatures,
        }));

        return {
          // @ts-ignore
          ...selectedCreature,
          name: [{ value: finalName, label: finalName }],
        };
      });

      // @ts-ignore
      setEncounterMonsters([...encounterMonsters, ...newMonsters]);
    }
  };

  const handleDeleteAll = () => {
    // Clear encounter data from state
    setEncounterMonsters([]);
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
              defaultExpanded={false}
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
                    // @ts-ignore
                    getOptionLabel={(option) => option?.name[0]?.label}
                    sx={{
                      width: { xs: "100%", md: "30%", lg: "25%" },
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Créature" />
                    )}
                    fullWidth
                    componentsProps={{
                      popper: {
                        style: {
                          width: "fit-content",
                        },
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
              {encounterMonsters.map((monster: any, index: any) => (
                <Grid item xs={12} sm={12} md={4} lg={4} key={index}>
                  <MonsterEncounterBlock
                    monster={monster}
                  ></MonsterEncounterBlock>
                </Grid>
              ))}
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
