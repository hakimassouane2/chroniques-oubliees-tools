"use client";
import HeroSection from "@/components/HeroSection";
import SearchIcon from "@mui/icons-material/Search";
import {
  Card,
  CardContent,
  Container,
  FormControl,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

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
            <Card sx={{ borderRadius: 0 }}>
              <Grid container>
                <Grid item xs={12} sm={12} md={9} lg={9}>
                  <CardContent sx={{ p: 2 }}>
                    <Typography
                      variant="body2"
                      fontFamily={"Roboto"}
                      fontWeight={300}
                      gutterBottom
                    >
                      Vous êtes complètement débutant dans lunivers du Jeu de
                      rôle ?
                    </Typography>
                    <Typography
                      variant="body2"
                      fontFamily={"Roboto"}
                      fontWeight={300}
                      gutterBottom
                    >
                      Si vous ne connaissez absolument rien au Jeu de rôle et
                      que vous souhaitez en découvrir rapidement les principes
                      (en même aller plus loin), nous vous proposons de
                      consulter ces vidéos Youtube de la chaîne JDR Pratique :
                    </Typography>
                    <Typography
                      variant="body2"
                      fontFamily={"Roboto"}
                      fontWeight={300}
                      gutterBottom
                    >
                      Nous vous recommandons aussi ces vidéos de la chaîne
                      Rôle'n Play qui vous permettront notamment de voir à quoi
                      peut ressembler une partie de Chroniques Oubliées Fantasy
                      :
                    </Typography>
                    <Typography
                      variant="body2"
                      fontFamily={"Roboto"}
                      fontWeight={300}
                      gutterBottom
                    >
                      Qu'est-ce que Chroniques Oubliées Fantasy ?
                    </Typography>
                    <Typography
                      variant="body2"
                      fontFamily={"Roboto"}
                      fontWeight={300}
                      gutterBottom
                    >
                      Le jeu de rôle Chroniques Oubliées Fantasy fait partie du
                      d20 system qui a pour origine la version 3.5 de Donjons et
                      Dragons, selon les termes de la licence ludique libre
                      (OGL, Open game licence). Le jeu propose un système
                      simplifié destiné à l'origine à l'initiation, tout en
                      restant largement compatible avec Donjons et Dragons et
                      ses dérivés. Mais elles ne se limitent pas aux débutants,
                      et les versions publiées dans Casus Belli offrent tout un
                      ensemble de règles optionnelles qui satisfont les joueurs
                      habitués.
                    </Typography>
                    <Typography
                      variant="body2"
                      fontFamily={"Roboto"}
                      fontWeight={300}
                      gutterBottom
                    >
                      Le joueur choisit un peuple (humain, elfe sylvain,
                      nain...) et un profil (guerrier, magicien, rôdeur...), qui
                      correspond à la classe de Donjons et Dragons.
                    </Typography>
                    <Typography
                      variant="body2"
                      fontFamily={"Roboto"}
                      fontWeight={300}
                      gutterBottom
                    >
                      Qu'est-ce qu'un DRS ?
                    </Typography>
                    <Typography
                      variant="body2"
                      fontFamily={"Roboto"}
                      fontWeight={300}
                      gutterBottom
                    >
                      Le Document de Référence du Système (DRS) est un ensemble
                      de règles de jeux de rôle édité sous la licence ludique
                      libre. Le DRS spécifie les règles de base du système D20
                      de Chroniques Oubliées (fantasy), incluant les races,
                      classes, compétences, dons, sorts, objets magiques et
                      monstres.
                    </Typography>
                    <Typography
                      variant="body2"
                      fontFamily={"Roboto"}
                      fontWeight={300}
                      gutterBottom
                    >
                      Le DRS rassemble les règles fondamentales d’un jeu,
                      dépouillées de tout artifice (que l'on peut trouver dans
                      des campagnes, des descriptions d'univers, des aides de
                      jeu ou des suppléments de règles comme le Compagnon).
                      C’est un concept né avec la version 3 de Dungeons &
                      Dragons au moment où Wizards of The Coast a mis ses règles
                      en libre accès.
                    </Typography>
                    <Typography
                      variant="body2"
                      fontFamily={"Roboto"}
                      fontWeight={300}
                      gutterBottom
                    >
                      Est-ce que toutes les règles de Chroniques Oubliée Fantasy
                      sont en ligne ?
                    </Typography>
                    <Typography
                      variant="body2"
                      fontFamily={"Roboto"}
                      fontWeight={300}
                      gutterBottom
                    >
                      Non, seules les règles de base jusqu’à la page 85
                      (jusqu’aux Voies raciales incluses) ainsi que les règles
                      sur les objets magiques (chapitre 10) et le bestiaire
                      (chapitre 11 et 12) p195 à 280 sont incluses. D’autre
                      part, seules les règles de Chroniques Oubliées Fantasy
                      (COF) sont en ligne. Vous ne trouverez pas les autres
                      variantes comme Chroniques Oubliées Contemporaines (COC).
                    </Typography>
                  </CardContent>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3}>
                  <CardContent sx={{ p: 2 }}>
                    <FormControl variant="standard">
                      <TextField
                        id="input-with-icon-adornment"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon />
                            </InputAdornment>
                          ),
                        }}
                        fullWidth={true}
                        placeholder="Rechercher dans les règles"
                        variant="outlined"
                        sx={{ fontFamily: "Roboto", fontWeight: 300 }}
                      />
                    </FormControl>
                    <Typography variant="h5" color={"primary"}>
                      Navigation du livre
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
