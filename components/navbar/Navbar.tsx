"use client";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button, Link, Menu, MenuItem } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as React from "react";

function Navbar() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!open) setAnchorEl(event.currentTarget);
  };

  const handleSubMenuClick = (url: string) => {
    setAnchorEl(null);
    router.push(url);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateToUrl = (url: string) => {
    router.push(url);
  };

  return (
    <AppBar color="primary" position="static">
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <Link href="/">
            <Image src="/logo.webp" alt="logo" width="75" height="75" />
          </Link>
          {/* Pages menu */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            <div>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onMouseEnter={handleMenuClick}
                onClick={() => handleSubMenuClick("/game")}
                sx={{ color: "white" }}
                endIcon={<KeyboardArrowDownIcon />}
              >
                Jeu
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleSubMenuClick("/game/rules");
                  }}
                >
                  Règles
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleSubMenuClick("/game/races");
                  }}
                >
                  Races
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleSubMenuClick("/game/profiles");
                  }}
                >
                  Profiles
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleSubMenuClick("/game/ways");
                  }}
                >
                  Voies
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleSubMenuClick("/game/abilities");
                  }}
                >
                  Capacités
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleSubMenuClick("/game/equipments");
                  }}
                >
                  Équipements
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleSubMenuClick("/game/conditions");
                  }}
                >
                  États préjudiciables
                </MenuItem>
              </Menu>
            </div>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={() => {
                navigateToUrl("/creatures");
              }}
              sx={{ color: "white" }}
            >
              Bestiaire
            </Button>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={() => {
                navigateToUrl("/ressources");
              }}
              sx={{ color: "white" }}
            >
              Ressources
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
