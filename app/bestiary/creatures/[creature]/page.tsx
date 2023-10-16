"use client";
import HeroSection from "@/components/HeroSection";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SecurityIcon from "@mui/icons-material/Security";
import {
  AccordionSummaryProps,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Link,
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
import { useLoading } from "../../../contexts/LoadingContext";
import { stat } from "fs";

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

  function isSuperior(ability: string) {
    return currentCreature?.sup_abilities?.some(
      (supAbility: any) => supAbility.value === ability
    );
  }

  const getStrString = () => {
    return parseInt(currentCreature?.str_mod[0]?.value) >= 0
      ? `+${currentCreature?.str_mod[0]?.value}`
      : currentCreature?.str_mod[0]?.value;
  };

  const getDexString = () => {
    return parseInt(currentCreature?.dex_mod[0]?.value) >= 0
      ? `+${currentCreature?.dex_mod[0]?.value}`
      : currentCreature?.dex_mod[0]?.value;
  };

  const getConString = () => {
    return parseInt(currentCreature?.con_mod[0]?.value) >= 0
      ? `+${currentCreature?.con_mod[0]?.value}`
      : currentCreature?.con_mod[0]?.value;
  };

  const getIntString = () => {
    return parseInt(currentCreature?.int_mod[0]?.value) >= 0
      ? `+${currentCreature?.int_mod[0]?.value}`
      : currentCreature?.int_mod[0]?.value;
  };

  const getWisString = () => {
    return parseInt(currentCreature?.wis_mod[0]?.value) >= 0
      ? `+${currentCreature?.wis_mod[0]?.value}`
      : currentCreature?.wis_mod[0]?.value;
  };

  const getChaString = () => {
    return parseInt(currentCreature?.cha_mod[0]?.value) >= 0
      ? `+${currentCreature?.cha_mod[0]?.value}`
      : currentCreature?.cha_mod[0]?.value;
  };

  const getCapabilities = () => {
    let result: any = [];

    currentCreature?.capabilities.forEach((capability: any) => {
      result.push(`**${capability.label}** ${capability.description}`);
    });

    return result.join("\n");
  };

  function convertHtmlToMarkdown(input: string): string {
    const tagsToKeep = ["strong", "em"];
    const parser = new DOMParser();
    const doc = parser.parseFromString(input, "text/html");

    function processNode(node: Node): string {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent || "";
      }

      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;

        if (tagsToKeep.includes(element.tagName.toLowerCase())) {
          if (element.tagName.toLowerCase() === "strong") {
            return `**${processNodes(element)}**`;
          } else if (element.tagName.toLowerCase() === "em") {
            return `_${processNodes(element)}_`;
          }
        }

        return processNodes(element);
      }

      return "";
    }

    function processNodes(parentNode: Node): string {
      let result = "";

      for (let node of parentNode.childNodes) {
        result += processNode(node);
      }

      return result;
    }

    return processNodes(doc.body);
  }

  const copyForLK = (e: any) => {
    const creatureStats = `
**${currentCreature?.name[0]?.label}** | NC ${currentCreature?.level[0]?.value}
| DEF                                    | PV                                           | VIT               | FOR${
      isSuperior("str") ? "*" : ""
    } | DEX${isSuperior("dex") ? "*" : ""} | CON${
      isSuperior("con") ? "*" : ""
    } | INT${isSuperior("int") ? "*" : ""} | SAG${
      isSuperior("wis") ? "*" : ""
    } | CHA${isSuperior("cha") ? "*" : ""} |
|----------------------------------------|----------------------------------------------|-------------------|-----|-----|-----|-----|-----|-----|
| ${currentCreature?.defense[0]?.value}  | ${
      currentCreature?.health_point[0]?.value
    }   | 30ft. (6 cases)   | ${getStrString()}   | ${getDexString()}    |  ${getConString()}   | ${getIntString()}    | ${getWisString()}    |  ${getChaString()}   |

${convertHtmlToMarkdown(
  currentCreature?.attacks[0].value
)}\n${convertHtmlToMarkdown(
      currentCreature?.special_capabilities[0].value
    )}\n${getCapabilities()}`;

    navigator.clipboard.writeText(creatureStats);
  };

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
              <Grid item xs={12} sm={12} md={9} lg={9}>
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
                    dangerouslySetInnerHTML={{
                      __html: currentCreature?.appearance[0]?.value,
                    }}
                  ></Typography>
                  <Typography
                    variant="body2"
                    fontFamily={"Roboto"}
                    fontWeight={300}
                    gutterBottom
                    dangerouslySetInnerHTML={{
                      __html: currentCreature?.description[0]?.value,
                    }}
                  ></Typography>
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
                            sx={{ color: "#256eff", mb: -0.5 }}
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
                            sx={{ color: "#fc440f", mb: -0.5 }}
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
                            sx={{ color: "#06a77d", mb: -0.5 }}
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
                          FOR{" "}
                          {parseInt(currentCreature?.str_mod[0]?.value) >= 0
                            ? "+"
                            : ""}
                          {currentCreature?.str_mod[0]?.value}
                          {isSuperior("str") && "*"}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "roboto",
                            fontWeight: 300,
                            py: 1,
                          }}
                        >
                          DEX{" "}
                          {parseInt(currentCreature?.dex_mod[0]?.value) >= 0
                            ? "+"
                            : ""}
                          {currentCreature?.dex_mod[0]?.value}
                          {isSuperior("dex") && "*"}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "roboto",
                            fontWeight: 300,
                            py: 1,
                          }}
                        >
                          CON{" "}
                          {parseInt(currentCreature?.con_mod[0]?.value) >= 0
                            ? "+"
                            : ""}
                          {currentCreature?.con_mod[0]?.value}
                          {isSuperior("con") && "*"}
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
                          INT{" "}
                          {parseInt(currentCreature?.int_mod[0]?.value) >= 0
                            ? "+"
                            : ""}
                          {currentCreature?.int_mod[0]?.value}
                          {isSuperior("int") && "*"}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "roboto",
                            fontWeight: 300,
                            py: 1,
                          }}
                        >
                          SAG{" "}
                          {parseInt(currentCreature?.wis_mod[0]?.value) >= 0
                            ? "+"
                            : ""}
                          {currentCreature?.wis_mod[0]?.value}
                          {isSuperior("wis") && "*"}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "roboto",
                            fontWeight: 300,
                            py: 1,
                          }}
                        >
                          CHA{" "}
                          {parseInt(currentCreature?.cha_mod[0]?.value) >= 0
                            ? "+"
                            : ""}
                          {currentCreature?.cha_mod[0]?.value}
                          {isSuperior("cha") && "*"}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <Typography variant="h5" color={"primary"} gutterBottom>
                    Attaques
                  </Typography>
                  <Typography
                    variant="body2"
                    fontFamily={"Roboto"}
                    fontWeight={300}
                    dangerouslySetInnerHTML={{
                      __html: currentCreature?.attacks[0].value,
                    }}
                    gutterBottom
                  ></Typography>
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
                        dangerouslySetInnerHTML={{
                          __html:
                            currentCreature?.special_capabilities[0].value,
                        }}
                      ></Typography>
                    </>
                  )}
                  {currentCreature?.profile[0]?.label && (
                    <>
                      <Typography variant="h5" color={"primary"} gutterBottom>
                        Profil
                      </Typography>
                      <Typography
                        variant="body2"
                        fontFamily={"Roboto"}
                        fontWeight={300}
                        gutterBottom
                      >
                        Profil:{" "}
                        <Link
                          href={`/game/profiles/${encodeURIComponent(
                            currentCreature?.profile[0]?.label
                          ).toLowerCase()}`}
                        >
                          {currentCreature?.profile[0]?.label}
                        </Link>
                      </Typography>
                      <Typography
                        variant="body2"
                        fontFamily={"Roboto"}
                        fontWeight={300}
                        gutterBottom
                      >
                        Niveau de profil:{" "}
                        {currentCreature?.profile_level[0]?.value}
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
                        dangerouslySetInnerHTML={{
                          __html: currentCreature?.paths[0]?.value,
                        }}
                      ></Typography>
                    </>
                  )}
                  {currentCreature?.capabilities.length > 0 && (
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
              <Grid item xs={12} sm={12} md={3} lg={3}>
                <CardMedia
                  component="img"
                  alt={"image"}
                  image={currentCreature?.picture[0]?.creature_token_url}
                  sx={{ backgroundColor: "white" }}
                />
                <Button
                  variant="contained"
                  color="info"
                  onClick={copyForLK}
                  sx={{
                    fontFamily: "roboto",
                    fontWeight: 300,
                    textAlign: "center",
                  }}
                >
                  Copy for LK
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Container>
    </div>
  );
};

export default CreatureDetail;
