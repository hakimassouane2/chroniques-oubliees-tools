"use client";
import HeroSection from "@/components/HeroSection";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { useLoading } from "../../contexts/LoadingContext";

const CreatureDetail = ({ params }: { params: { creature: string } }) => {
  const [currentCreature, setCurrentCreature] = React.useState<any>(null);
  const { setIsLoading } = useLoading();

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const response = await fetch(`/api/creatures/${params.creature}`);
      const data = await response.json();
      setCurrentCreature(data);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  return (
    <div>
      <HeroSection
        imageSrc="/heroes/creatures-min.png.webp"
        title={currentCreature?.name[0]?.label}
      />
      <Container maxWidth="xl">
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          sx={{ position: "relative", mt: -10, mb: 10 }}
        >
          <Card>
            <Grid container>
              <Grid item xs={8} sm={8} md={8} lg={8}>
                <CardContent sx={{ p: 2 }}>
                  <Typography
                    variant="body2"
                    fontFamily={"Roboto"}
                    fontWeight={300}
                  >
                    NC: {currentCreature?.level[0]?.value}
                  </Typography>
                  <Typography
                    variant="body2"
                    fontFamily={"Roboto"}
                    fontWeight={300}
                  >
                    Famille de créature:{" "}
                    {currentCreature?.creature_family[0]?.label}
                  </Typography>
                  <Typography
                    variant="body2"
                    fontFamily={"Roboto"}
                    fontWeight={300}
                  >
                    Type de boss: {currentCreature?.boss_type[0]?.label}
                  </Typography>
                  <Typography
                    variant="body2"
                    fontFamily={"Roboto"}
                    fontWeight={300}
                    gutterBottom
                  >
                    Rang de boss: {currentCreature?.boss_rank[0]?.value}
                  </Typography>
                  <Typography
                    variant="body2"
                    fontFamily={"Roboto"}
                    fontWeight={300}
                    gutterBottom
                  >
                    {currentCreature?.appearance[0]?.value}
                  </Typography>
                  <Typography
                    variant="body2"
                    fontFamily={"Roboto"}
                    fontWeight={300}
                    gutterBottom
                  >
                    {currentCreature?.description[0]?.value}
                  </Typography>
                  <Typography
                    variant="body2"
                    fontFamily={"Roboto"}
                    fontWeight={300}
                    gutterBottom
                  >
                    Réduction des dommages:{" "}
                    {currentCreature?.dmg_reduction[0]?.value}
                  </Typography>
                  <Typography variant="h5" color={"primary"} gutterBottom>
                    Attaques
                  </Typography>
                  {currentCreature?.attacks[0]?.data?.map((attack: any) => (
                    <Typography
                      variant="body2"
                      fontFamily={"Roboto"}
                      fontWeight={300}
                      key={attack.name}
                      gutterBottom
                    >
                      {attack.name} {attack.test} DM {attack.dm}{" "}
                      {attack.special}
                    </Typography>
                  ))}
                  <Typography variant="h5" color={"primary"} gutterBottom>
                    Capacité(s) spéciales
                  </Typography>
                  <Typography variant="h5" color={"primary"} gutterBottom>
                    Voie(s)
                  </Typography>
                  <Typography variant="h5" color={"primary"} gutterBottom>
                    Capacité(s)
                  </Typography>
                </CardContent>
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4}>
                <CardMedia
                  component="img"
                  alt={"image"}
                  image={currentCreature?.picture[0]?.creature_token_url}
                  sx={{ backgroundColor: "white" }}
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Container>
    </div>
  );
};

export default CreatureDetail;
