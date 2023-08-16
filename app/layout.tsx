"use client";

import { ThemeProvider } from "@emotion/react";
import { Container, createTheme } from "@mui/material";
import Navbar from "../components/navbar/Navbar";
import "./globals.css";
import { Roboto } from "next/font/google";

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
    <html lang="en">
      <head>
        <title>Chroniques Oubliées | DRS</title>
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <Navbar />
          <Container maxWidth="xl">{children}</Container>
        </ThemeProvider>
      </body>
    </html>
  );
}
