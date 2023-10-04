"use client";
import HeroSection from "@/components/HeroSection";
import { Card, CardContent, Container, Grid, Typography } from "@mui/material";

const Rules = () => {
  return (
    <div>
      <HeroSection
        imageSrc="/heroes/rules.webp"
        title="Règles"
        subtitle="Règles officielles (DRS) pour Chroniques Oubliées Fantasy"
      />
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
          sx={{ position: "relative", mt: -10, mb: 10 }}
        >
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Card sx={{ borderRadius: 2 }}>
              <Grid container>
                <Grid item xs={8} sm={8} md={8} lg={8}>
                  <CardContent sx={{ p: 2, height: "16rem" }}>
                    <Typography variant="h5" color={"primary"} gutterBottom>
                      HELLO RULES
                    </Typography>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Rules;
