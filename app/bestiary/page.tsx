import HeroSection from "@/components/HeroSection";
import MainPageCard from "@/components/MainPageCard";
import { Container, Grid } from "@mui/material";

// Create a base MUI nextJS component with a Typohraphy h1 "HELLO WORLD"
const Creatures = () => (
  <>
    <HeroSection
      imageSrc="/heroes/bestiary-min.png.webp"
      title="Bestiaire"
      subtitle="Explorez le bestiaire de Chroniques Oubliées Fantasy pour découvrir une multitude de créatures fascinantes. Que vous cherchiez des animaux sauvages, des monstres terrifiants ou des races humanoïdes exotiques, cette section est votre guide ultime. Plongez dans les sous-sections suivantes pour approfondir vos connaissances."
    />
    <Container maxWidth="xl">
      <Grid
        container
        spacing={3}
        sx={{ position: "relative", mt: -10, mb: 10 }}
      >
        <MainPageCard
          url={"bestiary/creatures"}
          imageUrl={"/heroes/creatures-min.png.webp"}
          title="Créatures"
          description="Retrouvez l'ensemble des créatures du bestiaire public de Chroniques Oubliées Fantasy ! Vous pouvez les cloner dans votre bestiaire privé et/ou les ajouter au générateur de rencontres."
        />
        <MainPageCard
          url={"bestiary/creature-families"}
          imageUrl={"/heroes/creatures_family-min.png.webp"}
          title="Famille de créatures"
          description="Certaines créatures peuvent être regroupées dans une même famille tant elle partagent des caractéristiques communes."
        />
        <MainPageCard
          url={"bestiary/encounters"}
          imageUrl={"/heroes/encounter.webp"}
          title="Générateur de rencontres"
          description="Ajoutez, modifiez, supprimer des créatures publiques ou privées au sein du générateur de rencontres afin de faciliter leur suivi au cours d'une partie."
        />
      </Grid>
    </Container>
  </>
);

export default Creatures;
