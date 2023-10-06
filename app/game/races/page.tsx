"use client";
import HeroSection from "@/components/HeroSection";
import { useLoading } from "@/contexts/LoadingContext";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import Link from "next/link";
import * as React from "react";

const Races = () => {
  const [races, setRaces] = React.useState([]);
  const { setIsLoading } = useLoading();

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const response = await fetch("/api/races");
      const data = await response.json();
      setRaces(data);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  return (
    <div>
      <HeroSection
        imageSrc="/heroes/races-min.png.webp"
        title="Races"
        buttonText="Lire les règles"
        buttonLink="/game/rules"
        subtitle="Votre personnage peut être humain ou appartenir à une autre des races disponibles. La Race choisie influe sur le caractère du PJ et sur ses rapports avec les autres peuples humanoïdes."
      />
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
          sx={{ position: "relative", mt: -10, mb: 10 }}
        >
          {races.map((race: any, index: any) => (
            <Grid item xs={12} sm={12} md={12} lg={12} key={index}>
              <Card sx={{ borderRadius: 2 }}>
                <Grid
                  container
                  sx={{ flexDirection: { xs: "column-reverse", md: "row" } }}
                >
                  <Grid item xs={12} sm={12} md={8} lg={8}>
                    <CardContent sx={{ p: 2, height: "16rem" }}>
                      <Typography variant="h5" color={"primary"} gutterBottom>
                        {race?.label}
                      </Typography>
                      {/* Archétype */}
                      <Typography
                        variant="body2"
                        fontFamily={"Roboto"}
                        fontWeight={300}
                        gutterBottom
                      >
                        {race?.mainDescription}
                      </Typography>
                      <Typography
                        variant="body2"
                        fontFamily={"Roboto"}
                        fontWeight={300}
                      >
                        {race?.secondDescription}
                      </Typography>
                      <Link
                        href={`races/${encodeURIComponent(
                          (race?.slug).toLowerCase()
                        )}`}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{
                            mt: 3,
                            color: "white",
                            fontFamily: "Roboto",
                            fontWeight: 300,
                            textTransform: "none",
                          }}
                        >
                          En savoir plus
                        </Button>
                      </Link>
                    </CardContent>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Link
                      href={`races/${encodeURIComponent(
                        (race?.slug).toLowerCase()
                      )}`}
                    >
                      <CardMedia
                        component="img"
                        alt={race?.name}
                        height="350"
                        image={race?.imageUrl}
                        sx={{ backgroundColor: "white" }}
                      />
                    </Link>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Races;
