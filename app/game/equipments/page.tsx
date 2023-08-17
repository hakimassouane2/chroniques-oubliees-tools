"use client";
import {
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
import weapons from "../../../public/equipements/armes.json";
import armors from "../../../public/equipements/armures.json";

const Equipments = () => {
  return (
    <>
      <Typography
        variant="h4"
        component="h1"
        color={"primary"}
        gutterBottom
        sx={{ mt: 2 }}
      >
        Armes
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 2 }}>
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
              >
                Nom
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Roboto !important",
                  fontSize: "1rem",
                  pb: 1,
                }}
                align="right"
              >
                Type
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Roboto !important",
                  fontSize: "1rem",
                  pb: 1,
                }}
                align="right"
              >
                Arme de jet
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Roboto !important",
                  fontSize: "1rem",
                  pb: 1,
                }}
                align="right"
              >
                Portée
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Roboto !important",
                  fontSize: "1rem",
                  pb: 1,
                }}
                align="right"
              >
                Rechargement
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Roboto !important",
                  fontSize: "1rem",
                  pb: 1,
                }}
                align="right"
              >
                Critique
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Roboto !important",
                  fontSize: "1rem",
                  pb: 1,
                }}
                align="right"
              >
                Dégâts
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Roboto !important",
                  fontSize: "1rem",
                  pb: 1,
                }}
                align="right"
              >
                Dégâts temporaires
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Roboto !important",
                  fontSize: "1rem",
                  pb: 1,
                }}
                align="right"
              >
                Prix
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {weapons.map((weapon: any, index: any) => (
              <TableRow
                key={weapon.name}
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
                  {weapon.name}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontFamily: "Roboto !important",
                    fontWeight: "300",
                    fontSize: "1rem",
                  }}
                >
                  {weapon.type}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontFamily: "Roboto !important",
                    fontWeight: "300",
                    fontSize: "1rem",
                  }}
                >
                  {weapon.thrownWeapon}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontFamily: "Roboto !important",
                    fontWeight: "300",
                    fontSize: "1rem",
                  }}
                >
                  {weapon.range}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontFamily: "Roboto !important",
                    fontWeight: "300",
                    fontSize: "1rem",
                  }}
                >
                  {weapon.reload}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontFamily: "Roboto !important",
                    fontWeight: "300",
                    fontSize: "1rem",
                  }}
                >
                  {weapon.critical}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontFamily: "Roboto !important",
                    fontWeight: "300",
                    fontSize: "1rem",
                  }}
                >
                  {weapon.damage}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontFamily: "Roboto !important",
                    fontWeight: "300",
                    fontSize: "1rem",
                  }}
                >
                  {weapon.tempDamage}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontFamily: "Roboto !important",
                    fontWeight: "300",
                    fontSize: "1rem",
                  }}
                >
                  {weapon.price}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h4" component="h1" color={"primary"} gutterBottom>
        Armures
      </Typography>
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
              >
                Nom
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Roboto !important",
                  fontSize: "1rem",
                  pb: 1,
                }}
                align="right"
              >
                Type
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Roboto !important",
                  fontSize: "1rem",
                  pb: 1,
                }}
                align="right"
              >
                DEF
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Roboto !important",
                  fontSize: "1rem",
                  pb: 1,
                }}
                align="right"
              >
                Prix
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Roboto !important",
                  fontSize: "1rem",
                  pb: 1,
                }}
                align="left"
              >
                Commentaire
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {armors.map((armor: any, index: any) => (
              <TableRow
                key={armor.name}
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
                  {armor.name}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontFamily: "Roboto !important",
                    fontWeight: "300",
                    fontSize: "1rem",
                  }}
                >
                  {armor.type}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontFamily: "Roboto !important",
                    fontWeight: "300",
                    fontSize: "1rem",
                  }}
                >
                  {armor.def}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontFamily: "Roboto !important",
                    fontWeight: "300",
                    fontSize: "1rem",
                  }}
                >
                  {armor.price}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontFamily: "Roboto !important",
                    fontWeight: "300",
                    fontSize: "1rem",
                  }}
                >
                  {armor.comments}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Equipments;
