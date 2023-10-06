"use client";
import HeroSection from "@/components/HeroSection";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import { SelectChangeEvent } from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import * as React from "react";
import { useLoading } from "../../contexts/LoadingContext";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const Profiles: React.FC = () => {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [sortType, setSortType] = React.useState("");
  const [profiles, setProfiles] = React.useState([]);
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

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const handleAgeChange = (event: SelectChangeEvent) => {
    setSortType(event.target.value as string);
  };

  return (
    <div>
      <HeroSection
        imageSrc="/heroes/profiles-min.png.webp"
        buttonText="Lire les règles"
        buttonLink="/game/rules"
        title="Profils"
        subtitle="Dans Chroniques Oubliées, le « métier », l’occupation principale du personnage, s’appelle un Profil. Cela peut être l'équivalent d'une « Classe » dans d'autres jeux de rôle."
      />
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
    </div>
  );
};

export default Profiles;
