"use client";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Button,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
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
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!open) setAnchorEl(event.currentTarget);
  };

  const handleSubMenuClick = (url: string) => {
    setAnchorEl(null);
    router.push(url);
    setMobileOpen(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateToUrl = (url: string) => {
    router.push(url);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    {
      label: "Jeu",
      url: "/game",
      children: [
        { label: "Règles", url: "/game/rules" },
        { label: "Races", url: "/game/races" },
      ],
    },
    { label: "Bestiaire", url: "/creatures" },
    { label: "Ressources", url: "/ressources" },
  ];

  return (
    <>
      <AppBar color="primary" position="fixed" sx={{ zIndex: 1300 }}>
        <Container maxWidth={false}>
          <Toolbar disableGutters>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { xs: "block", md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Link href="/">
              <Image src="/logo.webp" alt="logo" width="75" height="75" />
            </Link>
            {/* Pages menu */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
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
                  sx={{
                    color: "white",
                    textTransform: "none",
                    fontSize: "1.7rem",
                  }}
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
                    sx={{
                      fontFamily: "Roboto",
                      fontWeight: "300",
                      fontSize: "1rem",
                    }}
                  >
                    Règles
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleSubMenuClick("/game/races");
                    }}
                    sx={{
                      fontFamily: "Roboto",
                      fontWeight: "300",
                      fontSize: "1rem",
                    }}
                  >
                    Races
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleSubMenuClick("/game/profiles");
                    }}
                    sx={{
                      fontFamily: "Roboto",
                      fontWeight: "300",
                      fontSize: "1rem",
                    }}
                  >
                    Profiles
                  </MenuItem>
                  <MenuItem
                    sx={{
                      fontFamily: "Roboto",
                      fontWeight: "300",
                      fontSize: "1rem",
                    }}
                    onClick={() => {
                      handleSubMenuClick("/game/ways");
                    }}
                  >
                    Voies
                  </MenuItem>
                  <MenuItem
                    sx={{
                      fontFamily: "Roboto",
                      fontWeight: "300",
                      fontSize: "1rem",
                    }}
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
                    sx={{
                      fontFamily: "Roboto",
                      fontWeight: "300",
                      fontSize: "1rem",
                    }}
                  >
                    Équipements
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleSubMenuClick("/game/conditions");
                    }}
                    sx={{
                      fontFamily: "Roboto",
                      fontWeight: "300",
                      fontSize: "1rem",
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
                sx={{
                  color: "white",
                  textTransform: "none",
                  fontSize: "1.7rem",
                }}
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
                sx={{
                  color: "white",
                  textTransform: "none",
                  fontSize: "1.7rem",
                }}
              >
                Ressources
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better performance on mobile
        }}
      >
        <List>
          {menuItems.map((item) => (
            <div key={item.label}>
              <ListItem button onClick={() => handleSubMenuClick(item.url)}>
                <ListItemText primary={item.label} />
              </ListItem>
              {item.children &&
                item.children.map((subItem) => (
                  <ListItem
                    button
                    key={subItem.label}
                    onClick={() => handleSubMenuClick(subItem.url)}
                  >
                    <ListItemText
                      primary={subItem.label}
                      style={{ paddingLeft: "20px" }}
                    />
                  </ListItem>
                ))}
            </div>
          ))}
        </List>
      </Drawer>
    </>
  );
}
export default Navbar;
