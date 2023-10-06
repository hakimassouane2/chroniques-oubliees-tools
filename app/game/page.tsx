import HeroSection from "@/components/HeroSection";
import MainPageCard from "@/components/MainPageCard";
import { Container, Grid } from "@mui/material";

// Create a base MUI nextJS component with a Typohraphy h1 "HELLO WORLD"
const MainGamePage = () => (
  <>
    <HeroSection
      imageSrc="/heroes/game-min.png.webp"
      title="Jeu"
      subtitle="Vous trouverez ici toutes les informations nécessaires pour plonger dans l'univers passionnant du jeu de rôle Chroniques Oubliées Fantasy. Explorez les différentes sous-sections pour en apprendre davantage sur les règles, les races, les profils, les voies, les capacités et les états préjudiciables."
    />
    <Container maxWidth="xl">
      <Grid
        container
        spacing={3}
        sx={{ position: "relative", mt: -10, mb: 10 }}
      >
        <MainPageCard
          url={"game/rules"}
          imageUrl={"/heroes/rules.webp"}
          title="Règles"
          description="Retrouvez les règles du jeu de rôle Chroniques Oubliées Fantasy issues du Livre de base."
        />
        <MainPageCard
          url={"game/races"}
          imageUrl={"/heroes/races-min.png.webp"}
          title="Race"
          description="Votre personnage peut être humain ou appartenir à une autre
              des 8 races de base. La Race choisie influe sur le caractère
              du PJ et sur ses rapports avec les autres peuples humanoïdes."
        />
        <MainPageCard
          url={"game/profiles"}
          imageUrl={"/heroes/profiles-min.png.webp"}
          title="Profils"
          description="Dans Chroniques Oubliées, le « métier », l’occupation principale du personnage, s’appelle un Profil."
        />
        <MainPageCard
          url={"game/ways"}
          imageUrl={"/heroes/co_paths-min.png.webp"}
          title="Voies"
          isSmall={true}
          description="Chaque Profil donne accès à des Capacités. Réparties entre 5 voies, elles s’échelonnent sur 5 Rangs de puissance, de 1 (faible) à 5 (très puissant)."
        />
        <MainPageCard
          url={"game/abilities"}
          imageUrl={"/heroes/capabilities-min.png.webp"}
          title="Capacités"
          isSmall={true}
          description="Les Capacités sont assignées à des Voies et ont chacune un Rang de puissance.
        Si la capacité Limitée elle est suivie de (L). Si la capacité est magique, elle est suivi d'une étoile *"
        />
        <MainPageCard
          url={"game/equipments"}
          imageUrl={"/heroes/equipments-min.png.webp"}
          title="Equipements"
          isSmall={true}
          description="Au cours d'une aventure, votre héros pourra porter ou acquérir différents biens et équipements. Retrouvez la liste de ces équipements issus du Livre de Base."
        />
        <MainPageCard
          url={"game/conditions"}
          imageUrl={"/heroes/prejudiciable_effects-min.png.webp"}
          title="Etats préjudiciables"
          isSmall={true}
          description="Un état préjudiciable est un ensemble de pénalités infligées à un personnage."
        />
      </Grid>
    </Container>
  </>
);

export default MainGamePage;
