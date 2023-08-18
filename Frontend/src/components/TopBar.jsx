import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import GiteIcon from "@mui/icons-material/Gite";
import Avatar from "@mui/material/Avatar";
import NavBar from "./NavBar";

const TopBar = (props) => {
  const [anchorElUser, setAnchorElUser] = useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1 }}
          >
            <GiteIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            neighbourly
          </Typography>

          {/* conditional rendering of avatar & burger menu */}
          {props.showBurger && (
            <>
              <IconButton sx={{ p: 1 }}>
                <Avatar />
              </IconButton>

              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 1 }}
                onClick={handleOpenUserMenu}
              >
                <MenuIcon />
              </IconButton>
            </>
          )}

          {/* navigavtion bar */}
          <NavBar
            anchorElUser={anchorElUser}
            handleCloseUserMenu={handleCloseUserMenu}
          ></NavBar>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopBar;
