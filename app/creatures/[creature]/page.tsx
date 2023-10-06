"use client";
import HeroSection from "@/components/HeroSection";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SecurityIcon from "@mui/icons-material/Security";
import {
  AccordionSummaryProps,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import React from "react";
import { useLoading } from "../../contexts/LoadingContext";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 10,
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

const CreatureDetail = ({ params }: { params: { creature: string } }) => {
  const [currentCreature, setCurrentCreature] = React.useState<any>(null);
  const { setIsLoading } = useLoading();

  function stripHtmlTags(input: any) {
    if (input === undefined || input === null || input === "") return;
    return input.replace(/<\/?[^>]+(>|$)/g, "");
  }

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
        hasSecondimage={true}
        secondImageSrc={currentCreature?.picture[0]?.creature_token_url}
      />
      <Container maxWidth="xl">
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          sx={{ position: "relative", mt: -10, mb: 10 }}
        >
          <Card sx={{ borderRadius: 0 }}>
            <Grid container>
              <Grid item xs={8} sm={8} md={8} lg={8}>
                <CardContent sx={{ p: 2 }}>
                  <Typography
                    variant="body2"
                    fontFamily={"Roboto"}
                    fontWeight={300}
                  >
                    NC: {currentCreature?.level[0]?.value}
                  </Typography>
                  <Typography
                    variant="body2"
                    fontFamily={"Roboto"}
                    fontWeight={300}
                  >
                    Famille de créature:{" "}
                    {currentCreature?.creature_family[0]?.label}
                  </Typography>
                  {currentCreature?.boss_type[0] && (
                    <Typography
                      variant="body2"
                      fontFamily={"Roboto"}
                      fontWeight={300}
                    >
                      Type de boss: {currentCreature?.boss_type[0]?.label}
                    </Typography>
                  )}
                  {currentCreature?.boss_rank[0] &&
                    currentCreature?.boss_rank[0].value > 0 && (
                      <Typography
                        variant="body2"
                        fontFamily={"Roboto"}
                        fontWeight={300}
                        gutterBottom
                      >
                        Rang de boss: {currentCreature?.boss_rank[0]?.value}
                      </Typography>
                    )}
                  <Typography
                    variant="body2"
                    fontFamily={"Roboto"}
                    fontWeight={300}
                    gutterBottom
                  >
                    {stripHtmlTags(currentCreature?.appearance[0]?.value)}
                  </Typography>
                  <Typography
                    variant="body2"
                    fontFamily={"Roboto"}
                    fontWeight={300}
                    gutterBottom
                  >
                    {stripHtmlTags(currentCreature?.description[0]?.value)}
                  </Typography>
                  {currentCreature?.dmg_reduction[0] && (
                    <Typography
                      variant="body2"
                      fontFamily={"Roboto"}
                      fontWeight={300}
                      gutterBottom
                    >
                      Réduction des dommages:{" "}
                      {currentCreature?.dmg_reduction[0]?.value}
                    </Typography>
                  )}
                  <Table sx={{ mb: 2 }}>
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
                          DEF{" "}
                          <SecurityIcon
                            fontSize="small"
                            sx={{ color: "#256eff" }}
                          />
                          {currentCreature?.defense[0]?.value}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "roboto",
                            fontWeight: 300,
                            backgroundColor: "#f9f9f9",
                            py: 1,
                          }}
                        >
                          PV{" "}
                          <FavoriteIcon
                            fontSize="small"
                            sx={{ color: "#fc440f" }}
                          />{" "}
                          {currentCreature?.health_point[0]?.value}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "roboto",
                            fontWeight: 300,
                            backgroundColor: "#f9f9f9",
                            py: 1,
                          }}
                        >
                          Init{" "}
                          <DirectionsRunIcon
                            fontSize="small"
                            sx={{ color: "#06a77d" }}
                          />
                          {currentCreature?.init[0]?.value}
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
                          FOR +{currentCreature?.str_mod[0]?.value}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "roboto",
                            fontWeight: 300,
                            py: 1,
                          }}
                        >
                          DEX +{currentCreature?.dex_mod[0]?.value}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "roboto",
                            fontWeight: 300,
                            py: 1,
                          }}
                        >
                          CON +{currentCreature?.con_mod[0]?.value}
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
                          INT +{currentCreature?.int_mod[0]?.value}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "roboto",
                            fontWeight: 300,
                            py: 1,
                          }}
                        >
                          SAG +{currentCreature?.wis_mod[0]?.value}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "roboto",
                            fontWeight: 300,
                            py: 1,
                          }}
                        >
                          CHA +{currentCreature?.cha_mod[0]?.value}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <Typography variant="h5" color={"primary"} gutterBottom>
                    Attaques
                  </Typography>
                  {currentCreature?.attacks[0]?.data?.map((attack: any) => (
                    <Typography
                      variant="body2"
                      fontFamily={"Roboto"}
                      fontWeight={300}
                      key={attack.name}
                      gutterBottom
                    >
                      {attack.name} {attack.test} DM {attack.dm}{" "}
                      {attack.special}
                    </Typography>
                  ))}
                  {currentCreature?.special_capabilities[0].value && (
                    <>
                      <Typography variant="h5" color={"primary"} gutterBottom>
                        Capacité(s) spéciales
                      </Typography>
                      <Typography
                        variant="body2"
                        fontFamily={"Roboto"}
                        fontWeight={300}
                        gutterBottom
                      >
                        {stripHtmlTags(
                          currentCreature?.special_capabilities[0].value
                        )}
                      </Typography>
                    </>
                  )}
                  {currentCreature?.paths[0]?.value && (
                    <>
                      <Typography variant="h5" color={"primary"} gutterBottom>
                        Voie(s)
                      </Typography>
                      <Typography
                        variant="body2"
                        fontFamily={"Roboto"}
                        fontWeight={300}
                        gutterBottom
                      >
                        {stripHtmlTags(currentCreature?.paths[0].value)}
                      </Typography>
                    </>
                  )}
                  {currentCreature?.capabilities && (
                    <>
                      <Typography variant="h5" color={"primary"} gutterBottom>
                        Capacité(s)
                      </Typography>
                      <Typography
                        variant="body2"
                        fontFamily={"Roboto"}
                        fontWeight={300}
                        fontStyle={"italic"}
                        gutterBottom
                      >
                        La liste ci-dessous reprend les capacités définies par
                        les voies.
                      </Typography>
                      {currentCreature?.capabilities.map(
                        (capability: any, index: any) => (
                          <Accordion sx={{ mt: 2 }} key={capability.label}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <Typography
                                variant="body2"
                                color={"primary"}
                                sx={{
                                  fontFamily: "roboto",
                                  fontWeight: 400,
                                }}
                              >
                                {index + 1}. {capability.label}
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
                                {capability.description}
                              </Typography>
                            </AccordionDetails>
                          </Accordion>
                        )
                      )}
                    </>
                  )}
                </CardContent>
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4}>
                <CardMedia
                  component="img"
                  alt={"image"}
                  image={currentCreature?.picture[0]?.creature_token_url}
                  sx={{ backgroundColor: "white" }}
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Container>
    </div>
  );
};

export default CreatureDetail;
