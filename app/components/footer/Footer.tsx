import FacebookIcon from "@mui/icons-material/Facebook";
import PeopleIcon from "@mui/icons-material/People";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer id="page-footer" className="py-1 pb-5 pb-md-0 sticky-footer">
      <Container
        maxWidth={false}
        sx={{
          backgroundColor: "rgba(0,0,0,.75)",
          fontFamily: "Roboto",
          color: "white",
          paddingLeft: "0 !important",
          paddingRight: "0 !important",
        }}
      >
        <Grid
          container
          spacing={3}
          alignItems={"center"}
          sx={{
            flexDirection: { xs: "column", sm: "column", md: "row" },
          }}
        >
          <Grid item xs={12} md={6} lg={3} sx={{ flex: "1 !important" }}>
            <Link href="/">
              <Image src="/logo.webp" alt="logo" width="305" height="305" />
            </Link>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: "flex", flex: "1 !important" }}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Typography
              variant="body1"
              fontFamily={"Roboto"}
              fontWeight={300}
              align="center"
              gutterBottom
              sx={{ mb: 2 }}
            >
              Rejoignez la communauté !
            </Typography>
            <Grid item xs={12} md={6} lg={3} sx={{ display: "flex", mb: 2 }}>
              <Button
                href="https://www.facebook.com/groups/369348487218684"
                target="_blank"
                rel="nofollow"
                variant="contained"
                color="info"
                size="large"
                sx={{ mr: 2 }}
              >
                <FacebookIcon />
              </Button>
              <Button
                href="https://discord.gg/SurCS7Q8BV"
                target="_blank"
                rel="nofollow"
                variant="contained"
                color="secondary"
                size="large"
              >
                <PeopleIcon />
              </Button>
            </Grid>
            <Typography
              variant="body2"
              fontFamily={"Roboto"}
              fontWeight={300}
              align="center"
              sx={{ width: "90%" }}
              gutterBottom
            >
              Veuillez noter que ces réseaux sociaux ne nous appartiennent pas,
              mais nous y sommes actifs.
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            lg={3}
            mb={{ xs: 5, md: 3, lg: 0 }}
            sx={{ textAlign: "center", flex: "1 !important" }}
          >
            {/* Replace the content inside this Grid item with your navigation links */}
            <Typography
              variant="body2"
              fontFamily={"Roboto"}
              fontWeight={300}
              gutterBottom
            >
              Mentions Légales
            </Typography>
            <Typography
              variant="body2"
              fontFamily={"Roboto"}
              fontWeight={300}
              gutterBottom
            >
              A propos
            </Typography>
            <Typography
              variant="body2"
              fontFamily={"Roboto"}
              fontWeight={300}
              gutterBottom
            >
              Contact
            </Typography>
            <Typography
              variant="body2"
              fontFamily={"Roboto"}
              fontWeight={300}
              gutterBottom
            >
              FAQ
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
