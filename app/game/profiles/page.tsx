"use client";
import HeroSection from "@/components/HeroSection";
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
import { useLoading } from "../../contexts/LoadingContext";
import ProfileForm from "../../components/profile/ProfileForm";

const Profiles: React.FC = () => {
  const [profiles, setProfiles] = React.useState([]);
  const [showForm, setShowForm] = React.useState(false);
  const { setIsLoading } = useLoading();

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const response = await fetch("/api/profiles");
      const data = await response.json();
      setProfiles(data);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  return (
    <div>
      <HeroSection
        imageSrc="/heroes/profiles-min.png.webp"
        buttonText="Lire les règles"
        buttonLink="/game/rules"
        title="Profils"
        subtitle="Dans Chroniques Oubliées, le « métier », l’occupation principale du personnage, s’appelle un Profil. Cela peut être l'équivalent d'une « Classe » dans d'autres jeux de rôle."
      />
      {!showForm ? (
        <Container maxWidth="xl">
          <Grid
            container
            spacing={3}
            sx={{ position: "relative", mt: -10, mb: 10 }}
          >
            {profiles.map((profile: any, index: any) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card sx={{ borderRadius: 2 }}>
                  <Link href={`profiles/${profile?.slug}`}>
                    <CardMedia
                      component="img"
                      alt={profile?.name}
                      height="350"
                      image={profile?.imageUrlCropped}
                      sx={{ backgroundColor: "white" }}
                    />
                  </Link>
                  <CardContent sx={{ p: 2, height: "15rem" }}>
                    <Typography
                      variant="h5"
                      color={"primary"}
                      style={{ textTransform: "capitalize" }}
                    >
                      {profile?.label}
                    </Typography>
                    {/* Archétype */}
                    <Typography
                      variant="body2"
                      fontFamily={"Roboto"}
                      fontWeight={300}
                      overflow={"hidden"}
                      sx={{
                        height: "11rem",
                        whiteSpace: "wrap",
                        WebkitLineClamp: 6,
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {profile?.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      ) : (
        <Container maxWidth="xl" sx={{ my: 5, textAlign: "center" }}>
          <ProfileForm />
        </Container>
      )}
      <Container maxWidth="xl" sx={{ textAlign: "center", my: 5 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowForm(!showForm)}
          sx={{
            color: "white",
            fontFamily: "Roboto",
            fontWeight: 300,
            textTransform: "none",
          }}
        >
          {showForm ? "Liste des profils" : "Ajouter un profil"}
        </Button>
      </Container>
    </div>
  );
};

export default Profiles;
