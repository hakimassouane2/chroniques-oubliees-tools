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
import { cloneDeep } from "lodash";
import * as React from "react";
import * as crypto from "crypto";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
  const [triggerRerender, setTriggerRerender] = React.useState(false);
  const [creatures, setCreatures] = React.useState([]);
  const [selectedCreature, setSelectedCreature] = React.useState(null);
  const [quantity, setQuantity] = React.useState(1);
  const { setIsLoading } = useLoading();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const monstersQuerryParams = searchParams.get("monsters");
  const quantitiesQuerryParams = searchParams.get("quantities");

  const handleExpand =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const response = await fetch("/api/creatures");
      const data = await response.json();
      setCreatures(data);
      if (monstersQuerryParams && quantitiesQuerryParams) {
        const monsters = monstersQuerryParams.split(",");
        const quantities = quantitiesQuerryParams.split(",");
        monsters.forEach((monster, index) => {
          const monsterToAdd = data.find(
            // @ts-ignore
            (creature) => creature.name[0].value === monster
          );
          if (monsterToAdd) {
            for (let i = 0; i < parseInt(quantities[index]); i++) {
              const currentEncounter = localStorage.getItem("encounter");
              if (!currentEncounter) {
                localStorage.setItem(
                  "encounter",
                  JSON.stringify([
                    {
                      ...monsterToAdd,
                      randomEncounterId: crypto.randomBytes(16).toString("hex"),
                      currentHP: parseInt(monsterToAdd.health_point[0].value),
                      name: [
                        {
                          value: monsterToAdd.name[0].value,
                          label:
                            monsterToAdd.name[0].label +
                            " " +
                            (i + 1).toString(),
                        },
                      ],
                    },
                  ])
                );
              } else {
                localStorage.setItem(
                  "encounter",
                  JSON.stringify([
                    ...JSON.parse(currentEncounter),
                    {
                      ...monsterToAdd,
                      randomEncounterId: crypto.randomBytes(16).toString("hex"),
                      currentHP: parseInt(monsterToAdd.health_point[0].value),
                      name: [
                        {
                          value: monsterToAdd.name[0].value,
                          label:
                            monsterToAdd.name[0].label +
                            " " +
                            (i + 1).toString(),
                        },
                      ],
                    },
                  ])
                );
              }
            }
            router.replace(pathname);
          }
        });
      }
      setIsLoading(false);
    }

    fetchData();
  }, []);

  const handleAddCreature = () => {
    if (selectedCreature && typeof window !== "undefined") {
      const newMonsters: any[] = [];
      for (let i = 0; i < quantity; i++) {
        // use lodash cloneDeep to avoid mutating the original object
        const selectedCreatureCopy: any = cloneDeep(selectedCreature);
        newMonsters.push({
          ...selectedCreatureCopy,
          randomEncounterId: crypto.randomBytes(16).toString("hex"),
          name: [
            {
              value: selectedCreatureCopy.name[0].value,
              label: selectedCreatureCopy.name[0].label + " " + (i + 1),
            },
          ],
          currentHP: parseInt(selectedCreatureCopy.health_point[0].value),
        });
      }
      const currentEncounter = localStorage.getItem("encounter");
      if (!currentEncounter) {
        localStorage.setItem("encounter", JSON.stringify(newMonsters));
      } else {
        localStorage.setItem(
          "encounter",
          JSON.stringify([...JSON.parse(currentEncounter), ...newMonsters])
        );
      }
      setTriggerRerender((prev) => !prev);
    }
  };

  const handleDeleteAll = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("encounter");
      setTriggerRerender((prev) => !prev);
    }
  };

  const handleDeleteMonster = (monsterRamdomEncounterId: string) => {
    if (typeof window !== "undefined") {
      const currentEncounter = localStorage.getItem("encounter");
      if (currentEncounter) {
        const newEncounter = JSON.parse(currentEncounter).filter(
          (monster: any) =>
            monster.randomEncounterId !== monsterRamdomEncounterId
        );
        localStorage.removeItem("encounter");
        localStorage.setItem("encounter", JSON.stringify(newEncounter));
        setTriggerRerender((prev) => !prev);
      }
    }
  };

  const handleRenameMonster = (
    monsterRamdomEncounterId: string,
    newName: string
  ) => {
    if (typeof window !== "undefined") {
      const currentEncounter = localStorage.getItem("encounter");
      if (currentEncounter) {
        const newEncounter = JSON.parse(currentEncounter).map(
          (monster: any) => {
            if (monster.randomEncounterId === monsterRamdomEncounterId) {
              monster.name = [
                {
                  value: monster.name[0].value,
                  label: newName,
                },
              ];
            }
            return monster;
          }
        );
        localStorage.removeItem("encounter");
        localStorage.setItem("encounter", JSON.stringify(newEncounter));
        setTriggerRerender((prev) => !prev);
      }
    }
  };

  const targetReRender = () => {
    setTriggerRerender((prev) => !prev);
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
              onChange={handleExpand("panel1")}
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
              {typeof window !== "undefined" &&
                localStorage.getItem("encounter") &&
                JSON.parse(localStorage.getItem("encounter")!).map(
                  (monster: any, index: number) => (
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      lg={4}
                      key={monster.randomEncounterId}
                    >
                      <MonsterEncounterBlock
                        monster={monster}
                        onDeleteMonster={handleDeleteMonster}
                        onRenameMonster={handleRenameMonster}
                        targetReRender={targetReRender}
                      />
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
