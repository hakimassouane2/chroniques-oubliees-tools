"use client";
import HeroSection from "@/components/HeroSection";
import { useLoading } from "@/contexts/LoadingContext";
import {
  Card,
  CardContent,
  Container,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import React from "react";

// Create a base MUI nextJS component with a Typohraphy h1 "HELLO WORLD"
const Abilities = () => {
  const [abilities, setAbilities] = React.useState([]);
  const { setIsLoading } = useLoading();

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const response = await fetch("/api/abilities");
      const data = await response.json();
      setAbilities(data);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  return (
    <>
      <HeroSection
        imageSrc="/heroes/capabilities-min.png.webp"
        buttonText="Lire les règles"
        buttonLink="/game/rules"
        title="Capacités"
        subtitle="Les Capacités sont assignées à des Voies et ont chacune un Rang de puissance.
      Si la capacité Limitée elle est suivie de (L). Si la capacité est magique, elle est suivi d'une étoile *."
      />
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
          sx={{ position: "relative", mt: -10, mb: 10 }}
        >
          {abilities.map((ability: any, index: any) => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
              <Card sx={{ borderRadius: 2, height: "21rem" }}>
                <CardContent sx={{ p: 2 }}>
                  <Link
                    href={`ways/${encodeURIComponent(
                      (ability?.slug).toLowerCase()
                    )}`}
                  >
                    <Typography variant="h5" color={"primary"}>
                      {ability?.label}
                    </Typography>
                  </Link>
                  <Typography
                    variant="body2"
                    fontFamily={"Roboto"}
                    fontWeight={300}
                    textTransform="none"
                    sx={{
                      height: "16rem",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 9,
                      overflow: "hidden",
                    }}
                  >
                    {ability?.description}
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

export default Abilities;
