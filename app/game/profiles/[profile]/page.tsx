"use client";
import Dice from "@/components/Dice";
import HeroSection from "@/components/HeroSection";
import { Profile } from "@/types/profile";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AccordionSummaryProps,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import { useLoading } from "../../../contexts/LoadingContext";

import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";

import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";

import MuiAccordionSummary from "@mui/material/AccordionSummary";

import MuiAccordionDetails from "@mui/material/AccordionDetails";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 10,
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
    theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : "white",
  flexDirection: "row",
  borderRadius: 10,
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(-180deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  paddingTop: 0,
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const ProfileDetail = ({ params }: { params: { profile: string } }) => {
  const [currentProfile, setCurrentProfile] = React.useState<Profile | null>(
    null
  );
  const { setIsLoading } = useLoading();

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const response = await fetch(`/api/profiles/${params.profile}`);
      const data = await response.json();
      setCurrentProfile(data);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  return (
    <>
      <HeroSection
        imageSrc="/heroes/profiles-min.png.webp"
        title={currentProfile?.label || ""}
        subtitle={currentProfile?.description || ""}
      />
      <Container maxWidth="xl">
        <Grid container sx={{ position: "relative", mt: -10, mb: 10 }}>
          <Card>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Grid item xs={12} sm={12} md={8} lg={8}>
                <Typography variant="h6" color={"primary"}>
                  Dé de vie{" "}
                </Typography>
                {currentProfile?.hd && <Dice hitDie={currentProfile?.hd} />}
                {currentProfile?.hasMagicAttackModifier && (
                  <Typography
                    variant="body2"
                    sx={{ fontFamily: "roboto", fontWeight: 300 }}
                  >
                    Modificateur de l&apos;attaque magique:{" "}
                    {currentProfile?.magicAttackModifier}
                  </Typography>
                )}
                <Typography variant="h6" color={"primary"}>
                  Armes et armures
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontFamily: "roboto", fontWeight: 300 }}
                >
                  {currentProfile?.weaponsAndArmor}
                </Typography>
                <Typography variant="h6" color={"primary"}>
                  Equipement de départ
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontFamily: "roboto", fontWeight: 300 }}
                >
                  {currentProfile?.startingEquipment}
                </Typography>
                {currentProfile?.ways?.map((way: any, index: any) => (
                  <Accordion
                    sx={{
                      mt: 2,
                    }}
                    key={way.name}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      className="MainAccordion"
                      sx={{ mb: 0, pb: 0 }}
                    >
                      <Typography
                        variant="h6"
                        color={"primary"}
                        sx={{ mb: 0, pb: 0 }}
                      >
                        {way.name}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {way.abilities.map((ability: any, index: any) => (
                        <Accordion sx={{ mt: 2 }} key={ability.name}>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography
                              variant="body2"
                              color={"primary"}
                              sx={{
                                fontFamily: "roboto",
                                fontWeight: 400,
                              }}
                            >
                              {index + 1}. {ability.name}
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography
                              variant="body2"
                              sx={{
                                fontFamily: "roboto",
                                fontWeight: 300,
                                mt: 2,
                              }}
                            >
                              {ability.description}
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <Image
                  src={currentProfile?.imageUrl || ""}
                  alt={currentProfile?.slug || ""}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }} // optional
                />
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </>
  );
};

export default ProfileDetail;
