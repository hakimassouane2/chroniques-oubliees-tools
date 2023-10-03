"use client";

import { ThemeProvider } from "@emotion/react";
import { Container, createTheme } from "@mui/material";
import { Roboto } from "next/font/google";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import ConditionalLoadingScreen from "./components/ConditionalLoadingScreen";
import { LoadingProvider } from "./contexts/LoadingContext";
import "./globals.css";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "rgb(44 11 2 / 75%)",
        // light: will be calculated from palette.primary.main,
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        main: "#E0C2FF",
        light: "#F5EBFF",
        // dark: will be calculated from palette.secondary.main,
        contrastText: "#47008F",
      },
    },
    typography: {
      fontFamily: ["Blackmoor", "Lato", "sans-serif"].join(","),
      fontSize: 20,
    },
  });

  return (
    <LoadingProvider>
      <html lang="en">
        <head>
          <title>Chroniques Oubliées | DRS</title>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap"
          />
        </head>
        <body>
          <ThemeProvider theme={theme}>
            <Navbar />
            <ConditionalLoadingScreen />
            <Container maxWidth="xl">{children}</Container>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </LoadingProvider>
  );
}
