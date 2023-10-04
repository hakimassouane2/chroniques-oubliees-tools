"use client";
import HeroSection from "@/components/HeroSection";
import { Way } from "@/types/way";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { useLoading } from "../../../contexts/LoadingContext";

const WayDetail = ({ params }: { params: { way: string } }) => {
  const [currentWay, setCurrentWay] = React.useState<Way | null>(null);
  const { setIsLoading } = useLoading();

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const response = await fetch(`/api/ways/${params.way}`);
      const data = await response.json();
      setCurrentWay(data);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  return (
    <>
      <HeroSection
        imageSrc="/heroes/co_paths-min.png.webp"
        title={currentWay?.label || ""}
        subtitle={currentWay?.additionalDescription || ""}
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
                {currentWay?.abilities?.map((ability: any, index: any) => (
                  <Accordion sx={{ mt: 2 }} key={ability.name}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      sx={{ mb: 0, pb: 0 }}
                    >
                      <Typography color={"primary"} sx={{ mb: 0, pb: 0 }}>
                        {ability.name}
                      </Typography>
                    </AccordionSummary>
                  </Accordion>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </>
  );
};

export default WayDetail;
