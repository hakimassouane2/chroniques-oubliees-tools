"use client";
import HeroSection from "@/components/HeroSection";
import { Race } from "@/types/race";
import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { useLoading } from "../../../contexts/LoadingContext";

const RaceDetail = ({ params }: { params: { race: string } }) => {
  const [currentRace, setCurrentRace] = React.useState<Race | null>(null);
  const { setIsLoading } = useLoading();

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const response = await fetch(`/api/races/${params.race}`);
      const data = await response.json();
      setCurrentRace(data);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  return (
    <>
      <HeroSection
        imageSrc="/heroes/races-min.png.webp"
        title={currentRace?.label || ""}
        subtitle={currentRace?.mainDescription || ""}
      />
      <Container maxWidth="xl">
        <Grid container sx={{ mb: 10 }}>
          <Card>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Grid item xs={12} sm={12} md={8} lg={8}>
                <Typography
                  variant="body2"
                  sx={{ fontFamily: "roboto", fontWeight: 300 }}
                >
                  {currentRace?.secondDescription}
                </Typography>
                <Typography variant="h5" color={"primary"}>
                  Repères
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontFamily: "roboto", fontWeight: 300 }}
                >
                  reperes
                </Typography>
                <Typography variant="h5" color={"primary"}>
                  Caractéristiques
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontFamily: "roboto", fontWeight: 300 }}
                >
                  {currentRace?.statistics}
                </Typography>
                <Typography variant="h5" color={"primary"}>
                  Capacités
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontFamily: "roboto", fontWeight: 300 }}
                >
                  capacités
                </Typography>
                <Typography variant="h5" color={"primary"}>
                  Noms Typiques
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontFamily: "roboto", fontWeight: 300 }}
                >
                  {currentRace?.usualNames}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <Image
                  src={currentRace?.imageUrl || ""}
                  alt={currentRace?.label || ""}
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

export default RaceDetail;
