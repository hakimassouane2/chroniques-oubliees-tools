"use client";
import Dice from "@/components/Dice";
import HeroSection from "@/components/HeroSection";
import { Profile } from "@/types/profile";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import { useLoading } from "../../../contexts/LoadingContext";

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
        title={
          currentProfile?.name?.charAt(0).toUpperCase() +
            currentProfile?.name?.slice(1) || ""
        }
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
                  <Accordion sx={{ mt: 2 }} key={way.name}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
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
                              sx={{ fontFamily: "roboto", fontWeight: 300 }}
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
                  alt={currentProfile?.name || ""}
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
