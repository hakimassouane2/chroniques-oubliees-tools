"use client";
import {
  Breadcrumbs,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import * as React from "react";
import conditions from "../../../public/conditions/conditions.json";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import Link from "@mui/material/Link";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import {
  Link as RouterLink,
  Route,
  Routes,
  MemoryRouter,
  useLocation,
} from "react-router-dom";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Conditions = () => {
  return (
    <>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ mt: 8, mb: 1, fontFamily: "Roboto" }}
      >
        <Link underline="hover" color="inherit" href="/">
          <HomeRoundedIcon fontSize="small" sx={{ verticalAlign: "sub" }} />
        </Link>
        <Link underline="hover" color="inherit" href="/game">
          Jeu
        </Link>
        <Link
          underline="hover"
          color="text.primary"
          href="/game/conditions"
          aria-current="page"
        >
          États préjudiciables
        </Link>
      </Breadcrumbs>
      <TableContainer component={Paper} sx={{ mb: 10 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow
              sx={{
                fontFamily: "Roboto !important",
                fontSize: "1rem",
                pb: 1,
              }}
            >
              <TableCell
                sx={{
                  fontFamily: "Roboto !important",
                  fontSize: "1rem",
                  pb: 1,
                }}
              ></TableCell>
              <TableCell
                sx={{
                  fontFamily: "Roboto !important",
                  fontSize: "1rem",
                  pb: 1,
                }}
              >
                Nom
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Roboto !important",
                  fontSize: "1rem",
                  pb: 1,
                }}
              >
                Description
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {conditions.map((condition: any, index: any) => (
              <StyledTableRow
                key={condition.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    fontFamily: "Roboto !important",
                    fontWeight: "300",
                    fontSize: "1rem",
                  }}
                >
                  <Image
                    src={condition.icon}
                    alt={condition.name}
                    width={25}
                    height={25}
                  />
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "Roboto !important",
                    fontWeight: "300",
                    fontSize: "1rem",
                  }}
                >
                  {condition.name}
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "Roboto !important",
                    fontWeight: "300",
                    fontSize: "1rem",
                  }}
                >
                  {condition.description}
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Conditions;
