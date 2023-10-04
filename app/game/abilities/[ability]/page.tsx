"use client";
import HeroSection from "@/components/HeroSection";
import { Ability } from "@/types/ability";
import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useLoading } from "../../../contexts/LoadingContext";

const AbiityDetail = ({ params }: { params: { ability: string } }) => {
  const [currentAbility, setCurrentAbility] = React.useState<Ability | null>(
    null
  );
  const { setIsLoading } = useLoading();

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const response = await fetch(`/api/abilities/${params.ability}`);
      const data = await response.json();
      setCurrentAbility(data);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  return (
    <>
      <HeroSection
        imageSrc="/heroes/capabilities-min.png.webp"
        title={currentAbility?.label || ""}
      />
      <Container maxWidth="xl">
        <Grid container sx={{ mt: 10, mb: 10 }}>
          <Card>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Grid item xs={12} sm={12} md={8} lg={8}>
                <Typography variant="subtitle1" color={"primary"}>
                  Dé de vie{" "}
                </Typography>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </>
  );
};

export default AbiityDetail;
