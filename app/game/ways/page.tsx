"use client";
import HeroSection from "@/components/HeroSection";
import { useLoading } from "@/contexts/LoadingContext";
import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import Link from "next/link";
import * as React from "react";

const Ways = () => {
  const [ways, setWays] = React.useState([]);
  const { setIsLoading } = useLoading();

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const response = await fetch("/api/ways");
      const data = await response.json();
      setWays(data);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  return (
    <div>
      <HeroSection
        imageSrc="/heroes/co_paths-min.png.webp"
        buttonText="Lire les règles"
        buttonLink="/game/rules"
        title="Voies"
        subtitle="Chaque Profil donne accès à des Capacités. Réparties entre 5 voies, elles s’échelonnent sur 5 Rangs de puissance, de 1 (faible) à 5 (très puissant)."
      />
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
          sx={{ position: "relative", mt: -10, mb: 10 }}
        >
          {ways.map((way: any, index: any) => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
              <Card sx={{ borderRadius: 2 }}>
                <CardContent sx={{ p: 2 }}>
                  {/* <Link
                        href={`ways/${encodeURIComponent(
                          (way?.slug).toLowerCase()
                        )}`}
                      > */}
                  <Typography variant="h5" color={"primary"}>
                    {way?.name || way?.label}
                  </Typography>
                  {/* </Link> */}
                  <Typography
                    variant="body2"
                    fontFamily={"Roboto"}
                    fontWeight={300}
                    textTransform={"capitalize"}
                  >
                    Type de voie: {way?.type}
                  </Typography>
                  <Typography
                    variant="body2"
                    fontFamily={"Roboto"}
                    fontWeight={300}
                    textTransform={"capitalize"}
                  >
                    Profil(s) lié(s):{" "}
                    <Link
                      href={`profiles/${encodeURIComponent(
                        way?.linkedProfiles[0]?.slug
                      )}`}
                    >
                      {way?.linkedProfiles[0]?.label}
                    </Link>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Ways;
