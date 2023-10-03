"use client";
import { useLoading } from "@/contexts/LoadingContext";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
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
      <Grid container spacing={3} sx={{ mt: 1, mb: 10 }}>
        {races.map((race: any, index: any) => (
          <Grid item xs={12} sm={12} md={12} lg={12} key={index}>
            <Card sx={{ borderRadius: 2 }}>
              <Grid container sx={{ mt: 5 }}>
                <Grid item xs={8} sm={8} md={8} lg={8}>
                  <CardContent sx={{ p: 2, height: "16rem" }}>
                    <Typography variant="h5" color={"primary"}>
                      {race?.name}
                    </Typography>
                    {/* Archétype */}
                    <Typography
                      variant="body2"
                      fontFamily={"Roboto"}
                      fontWeight={300}
                    >
                      {race?.mainDescription}
                    </Typography>
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
                  </CardContent>
                </Grid>
                <Grid item xs={4} sm={4} md={4} lg={4}>
                  <Link
                    href={`races/${encodeURIComponent(
                      (race?.name).toLowerCase()
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
    </div>
  );
};

export default Races;
