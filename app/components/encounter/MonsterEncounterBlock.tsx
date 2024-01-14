import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  List,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Popover,
  TextField,
  Typography,
} from "@mui/material";

import CancelIcon from "@mui/icons-material/Cancel";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SecurityIcon from "@mui/icons-material/Security";
import Image from "next/image";
import { useState } from "react";
import LifeBar from "./LifeBar";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import React from "react";

function MonsterEncounterBlock(props: {
  monster: any;
  onDeleteMonster: any;
  onRenameMonster: any;
  onModifyMaxHp: any;
  targetReRender: any;
}) {
  const [openRenameDialog, setOpenRenameDialog] = React.useState(false);
  const [openModifyMaxHpDialog, setOpenModifyMaxHpDialog] =
    React.useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const hpPercentage: number =
    (props?.monster?.currentHP / props?.monster?.health_point[0]?.value) * 100;
  let color: string;
  if (hpPercentage > 50) color = "rgb(6, 167, 125)";
  else if (hpPercentage <= 50 && hpPercentage >= 25) color = "rgb(255, 136, 0)";
  else color = "rgb(252, 68, 15)";

  const openOptionMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeOptionMenu = () => {
    setAnchorEl(null);
  };

  const handleDeleteMonster = () => {
    props.onDeleteMonster(props?.monster?.randomEncounterId);
  };

  const setCurrentHP = (value: number, monsterRandomEncounterId: string) => {
    if (value < 0) value = 0;
    const getEncounter = localStorage.getItem("encounter");
    if (!getEncounter) return;
    const encounter = JSON.parse(getEncounter);
    const encounterMonsterFound = encounter.find(
      (encounterMonster: any) =>
        encounterMonster.randomEncounterId === monsterRandomEncounterId
    );
    if (!encounterMonsterFound) return;
    encounterMonsterFound.currentHP =
      value > encounterMonsterFound.health_point[0]?.value
        ? encounterMonsterFound.health_point[0]?.value
        : value;
    localStorage.setItem("encounter", JSON.stringify(encounter));
    props.targetReRender();
  };

  const handleClickOpenRenameDialog = () => {
    closeOptionMenu();
    setOpenRenameDialog(true);
  };

  const handleCloseRenameDialog = () => {
    setOpenRenameDialog(false);
  };

  const handleClickOpenModifyMaxHpDialog = () => {
    closeOptionMenu();
    setOpenModifyMaxHpDialog(true);
  };

  const handleClickCloseModifyMaxHpDialog = () => {
    setOpenModifyMaxHpDialog(false);
  };

  return (
    <Grid container spacing={2}>
      <Dialog
        open={openRenameDialog}
        onClose={handleCloseRenameDialog}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const newName = formJson.name;
            console.log(newName);
            props.onRenameMonster(props?.monster?.randomEncounterId, newName);
            handleCloseRenameDialog();
          },
        }}
      >
        <DialogContent sx={{ py: 0 }}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Nom"
            type="text"
            fullWidth
            variant="standard"
            InputLabelProps={{
              sx: {
                fontFamily: "Roboto",
                fontWeight: 300,
              },
            }}
            InputProps={{
              sx: {
                fontFamily: "Roboto",
                fontWeight: 300,
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              fontFamily: "roboto",
              fontWeight: 300,
              color: "white",
              textTransform: "none",
              textAlign: "center",
            }}
          >
            Renommer
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openModifyMaxHpDialog}
        onClose={handleClickCloseModifyMaxHpDialog}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const newMaxHp = formJson.maxhp;
            props.onModifyMaxHp(props?.monster?.randomEncounterId, newMaxHp);
            handleClickCloseModifyMaxHpDialog();
          },
        }}
      >
        <DialogContent sx={{ py: 0 }}>
          <TextField
            autoFocus
            margin="dense"
            id="maxhp"
            name="maxhp"
            label="PV Max"
            type="number"
            fullWidth
            variant="standard"
            InputLabelProps={{
              sx: {
                fontFamily: "Roboto",
                fontWeight: 300,
              },
            }}
            InputProps={{
              sx: {
                fontFamily: "Roboto",
                fontWeight: 300,
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              fontFamily: "roboto",
              fontWeight: 300,
              color: "white",
              textTransform: "none",
              textAlign: "center",
            }}
          >
            Modifier les PV Max
          </Button>
        </DialogActions>
      </Dialog>
      <Grid item xs={5} sm={3} md={4} lg={4}>
        <Box
          style={{
            borderRadius: "50%",
            width: "110px" /* You can set this to whatever you prefer */,
            height:
              "110px" /* Ensure this matches the width for a perfect circle */,
            overflow: "hidden",
            WebkitBoxShadow: `${
              props?.monster?.currentHP > 0
                ? `0px 0px 19px 2px ${color}`
                : `0px 0px 19px 2px gray`
            }  `,
            boxShadow: `${
              props?.monster?.currentHP > 0
                ? `0px 0px 19px 2px ${color}`
                : `0px 0px 19px 2px gray`
            }  `,
            border: "3px solid lightgray",
            backgroundColor: "#bfbfbf",
            marginBottom: "1rem",
          }}
        >
          <Image
            src={props?.monster?.picture[0]?.creature_token_url}
            alt="hero second image"
            height={110}
            width={110}
          />
        </Box>
      </Grid>
      <Grid item xs={7} sm={9} md={8} lg={8} sx={{ pl: "0px !important" }}>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography
            variant="h6"
            title={props?.monster?.name[0]?.label}
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {props?.monster?.currentHP <= 0 && (
              <CancelIcon fontSize="small" sx={{ color: "red" }} />
            )}
            {props?.monster?.name[0]?.label}
          </Typography>
          <IconButton aria-label="more" onClick={openOptionMenu}>
            <MoreHorizIcon />
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={closeOptionMenu}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <MenuList sx={{ fontFamily: "roboto" }}>
              <MenuItem onClick={handleClickOpenRenameDialog}>
                <ListItemIcon>
                  <ModeEditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    fontFamily: "Roboto",
                    fontSize: "1rem",
                  }}
                >
                  Renommer
                </ListItemText>
              </MenuItem>
              <MenuItem onClick={handleClickOpenModifyMaxHpDialog}>
                <ListItemIcon>
                  <FavoriteIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    fontFamily: "Roboto",
                    fontSize: "1rem",
                  }}
                >
                  Modifier les PV max
                </ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <FileCopyIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    fontFamily: "Roboto",
                    fontSize: "1rem",
                  }}
                >
                  Dupliquer
                </ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleDeleteMonster}>
                <ListItemIcon>
                  <DeleteIcon fontSize="small" color="error"></DeleteIcon>
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    fontFamily: "Roboto",
                    fontSize: "1rem",
                    color: "red",
                  }}
                >
                  Supprimer
                </ListItemText>
              </MenuItem>
            </MenuList>
          </Popover>
        </Box>

        <LifeBar
          maxHP={props?.monster?.health_point[0]?.value}
          currentHP={props?.monster?.currentHP}
          setCurrentHP={setCurrentHP}
          color={color}
          monster={props?.monster}
        />

        <Box display={"flex"} gap={2}>
          <Typography
            sx={{
              fontFamily: "roboto",
              fontWeight: 300,
              backgroundColor: "#f9f9f9",
              py: 1,
            }}
          >
            <SecurityIcon
              fontSize="small"
              sx={{ color: "#256eff", mb: -0.5 }}
            />
            {props?.monster?.defense[0]?.value}
          </Typography>
          <Typography
            sx={{
              fontFamily: "roboto",
              fontWeight: 300,
              backgroundColor: "#f9f9f9",
              py: 1,
            }}
          >
            <DirectionsRunIcon
              fontSize="small"
              sx={{ color: "#06a77d", mb: -0.5 }}
            />
            {props?.monster?.init[0]?.value}
          </Typography>
        </Box>

        <Typography
          variant="body2"
          fontFamily={"Roboto"}
          fontWeight={300}
          dangerouslySetInnerHTML={{
            __html: props?.monster?.attacks[0].value,
          }}
          gutterBottom
        ></Typography>
      </Grid>
    </Grid>
  );
}

export default MonsterEncounterBlock;
