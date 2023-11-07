"use client";
import HeroSection from "@/components/HeroSection";
import { useLoading } from "@/contexts/LoadingContext";
import {
  AccordionSummaryProps,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  capitalize,
} from "@mui/material";
import Link from "next/link";
import * as React from "react";
import { styled } from "@mui/material/styles";

import CloseIcon from "@mui/icons-material/Close";
import { Way } from "../../types/way";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 10,
  "&:before": {
    display: "none",
  },
  "&.Mui-expanded:first-of-type": {
    marginTop: 16,
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : "white",
  flexDirection: "row",
  borderRadius: 10,
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(-180deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  paddingTop: 0,
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const Ways = () => {
  const [ways, setWays] = React.useState([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [specificWay, setSpecificWay] = React.useState({} as Way);
  const { setIsLoading } = useLoading();

  const handleModalClickOpen = (waySlug: string) => {
    fetchSpecificWay(waySlug);
    setModalOpen(true);
  };
  const handleModalClickClose = () => {
    setModalOpen(false);
  };

  const fetchSpecificWay = async (waySlug: string) => {
    const response = await fetch(`/api/ways/${waySlug}`);
    const data = await response.json();
    setSpecificWay(data);
  };

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const response = await fetch("/api/ways");
      const data = await response.json();
      setWays(data);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  return (
    <div>
      <HeroSection
        imageSrc="/heroes/co_paths-min.png.webp"
        buttonText="Lire les règles"
        buttonLink="/game/rules"
        title="Voies"
        subtitle="Chaque Profil donne accès à des Capacités. Réparties entre 5 voies, elles s’échelonnent sur 5 Rangs de puissance, de 1 (faible) à 5 (très puissant)."
      />
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
          sx={{ position: "relative", mt: -10, mb: 10 }}
        >
          {ways.map((way: any, index: any) => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
              <Card sx={{ borderRadius: 2 }}>
                <CardContent sx={{ p: 2 }}>
                  <Typography
                    variant="h6"
                    color={"primary"}
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleModalClickOpen(way?.slug)}
                  >
                    {way?.label}
                  </Typography>
                  <Typography
                    variant="body2"
                    fontFamily={"Roboto"}
                    fontWeight={300}
                    textTransform={"none"}
                  >
                    Type de voie: {capitalize(way?.type)}
                  </Typography>
                  {way?.linkedProfiles?.length > 0 && (
                    <Typography
                      variant="body2"
                      fontFamily={"Roboto"}
                      fontWeight={300}
                      textTransform={"none"}
                    >
                      Profils liés:{" "}
                      {way?.linkedProfiles?.map(
                        (profile: string, index: any) => (
                          <Link
                            href={`profiles/${encodeURIComponent(
                              profile.toLowerCase()
                            )}`}
                            style={{
                              color: "#783d07",
                              textDecoration: "none",
                            }}
                            key={index}
                          >
                            {`${capitalize(profile)}${
                              index < way?.linkedProfiles?.length - 1
                                ? ", "
                                : ""
                            }`}
                          </Link>
                        )
                      )}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <BootstrapDialog
        onClose={handleModalClickClose}
        aria-labelledby="customized-dialog-title"
        open={modalOpen}
        fullWidth={true}
        maxWidth={"lg"}
      >
        <DialogTitle
          color={"primary"}
          sx={{ m: 0, p: 2, fontSize: "2rem" }}
          id="customized-dialog-title"
        >
          {specificWay?.label}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleModalClickClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography
            gutterBottom
            sx={{ fontFamily: "roboto", fontWeight: 300 }}
          >
            Type de voie: {specificWay?.type as string}
          </Typography>
          <Typography
            gutterBottom
            sx={{ fontFamily: "roboto", fontWeight: 300 }}
          >
            Profils liés: {specificWay?.linkedProfiles?.join(", ")}
          </Typography>
          {specificWay?.abilities?.map((ability: any, index: any) => (
            <Accordion sx={{ mt: 2 }} key={ability.name}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ mb: 0, pb: 0 }}
              >
                <Typography
                  color={"primary"}
                  sx={{ mb: 0, pb: 0, fontFamily: "Roboto" }}
                >
                  {`${index + 1}. ${ability.name}`}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "roboto",
                    fontWeight: 300,
                    mt: 2,
                  }}
                >
                  {ability.description}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
};

export default Ways;
