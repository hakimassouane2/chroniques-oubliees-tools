import HeroSection from "@/components/HeroSection";
import { Container, Typography } from "@mui/material";

// Create a base MUI nextJS component with a Typohraphy h1 "HELLO WORLD"
const Abilities = () => (
  <>
    <HeroSection
      imageSrc="/heroes/capabilities-min.png.webp"
      buttonText="Lire les règles"
      buttonLink="/game/rules"
      title="Capacités"
      subtitle="Les Capacités sont assignées à des Voies et ont chacune un Rang de puissance.
      Si la capacité Limitée elle est suivie de (L). Si la capacité est magique, elle est suivi d'une étoile *."
    />
    <Container maxWidth="xl">
      <Typography variant="h1">Hello abilities</Typography>
    </Container>
  </>
);

export default Abilities;
