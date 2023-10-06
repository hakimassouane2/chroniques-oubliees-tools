"use client";
import HeroSection from "@/components/HeroSection";
import { Race } from "@/types/race";
import {
  Card,
  CardContent,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
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
        <Grid container sx={{ position: "relative", mt: -10, mb: 10 }}>
          <Card sx={{ borderRadius: 0 }}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Grid item xs={12} sm={12} md={8} lg={8}>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ fontFamily: "roboto", fontWeight: 300 }}
                >
                  {currentRace?.secondDescription}
                </Typography>
                <Typography variant="h5" color={"primary"} gutterBottom>
                  Repères
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "roboto",
                    fontWeight: 300,
                    fontStyle: "italic",
                  }}
                >
                  {currentRace?.appearance?.description}
                </Typography>
                <br></br>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "roboto",
                    fontWeight: 300,
                  }}
                >
                  Age de départ: {currentRace?.appearance?.startingAge} ans
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "roboto",
                    fontWeight: 300,
                  }}
                >
                  Espérance de vie: {currentRace?.appearance?.lifeSpan} ans
                </Typography>
                <Table sx={{ mb: 2 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>{" "}
                      {/* Empty cell for the top-left corner */}
                      <TableCell
                        sx={{
                          fontFamily: "roboto",
                          fontWeight: 300,
                        }}
                      >
                        Min
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "roboto",
                          fontWeight: 300,
                        }}
                      >
                        Max
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        sx={{
                          fontFamily: "roboto",
                          fontWeight: 300,
                          backgroundColor: "#f9f9f9",
                          py: 1,
                        }}
                      >
                        Taille
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "roboto",
                          fontWeight: 300,
                          backgroundColor: "#f9f9f9",
                          py: 1,
                        }}
                      >
                        {currentRace?.appearance?.minHeight} m
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "roboto",
                          fontWeight: 300,
                          backgroundColor: "#f9f9f9",
                          py: 1,
                        }}
                      >
                        {currentRace?.appearance?.maxHeight} m
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{
                          fontFamily: "roboto",
                          fontWeight: 300,
                          py: 1,
                        }}
                      >
                        Poids
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "roboto",
                          fontWeight: 300,
                          py: 1,
                        }}
                      >
                        {currentRace?.appearance?.minWeight} kg
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "roboto",
                          fontWeight: 300,
                          py: 1,
                        }}
                      >
                        {currentRace?.appearance?.maxWeight} kg
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Typography variant="h5" color={"primary"} gutterBottom>
                  Caractéristiques
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontFamily: "roboto", fontWeight: 300 }}
                  gutterBottom
                >
                  {currentRace?.statistics}
                </Typography>
                <Typography variant="h5" color={"primary"} gutterBottom>
                  Capacités
                </Typography>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ fontFamily: "roboto", fontWeight: 300 }}
                >
                  {currentRace?.racials[0]?.name}:{" "}
                  {currentRace?.racials[0]?.description}
                </Typography>
                <Typography variant="h5" color={"primary"} gutterBottom>
                  Noms Typiques
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontFamily: "roboto", fontWeight: 300 }}
                  gutterBottom
                >
                  {currentRace?.usualNames}
                </Typography>
                {currentRace?.typicalMaleNames && (
                  <Typography
                    variant="body2"
                    sx={{ fontFamily: "roboto", fontWeight: 300 }}
                    gutterBottom
                  >
                    <b>Noms typiques masculins:</b>{" "}
                    {currentRace?.typicalMaleNames?.join(", ")}
                  </Typography>
                )}
                {currentRace?.typicalFemaleNames && (
                  <Typography
                    variant="body2"
                    sx={{ fontFamily: "roboto", fontWeight: 300 }}
                    gutterBottom
                  >
                    <b>Noms typiques feminins :</b>{" "}
                    {currentRace?.typicalFemaleNames?.join(", ")}
                  </Typography>
                )}
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
