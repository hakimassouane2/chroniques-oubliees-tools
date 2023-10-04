"use client";
import HeroSection from "@/components/HeroSection";
import { Card, CardContent, Container, Typography } from "@mui/material";
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
        <Typography variant="h1">{currentCreature?.name[0]?.label}</Typography>
        <Card>
          <CardContent>
            <Typography>
              Category: {currentCreature?.category[0]?.label}
            </Typography>
            <Typography>
              Environment: {currentCreature?.environment[0]?.label}
            </Typography>
            {/* Add other stats and details here */}
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default CreatureDetail;
