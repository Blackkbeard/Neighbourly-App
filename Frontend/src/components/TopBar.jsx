import React, { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import GiteIcon from "@mui/icons-material/Gite";
import NavBar from "./NavBar";
import { NavLink } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";
import Avt from "./Avt";
import UserContext from "../context/user";

const TopBar = (props) => {
  const userCtx = useContext(UserContext);
  const [anchorElUser, setAnchorElUser] = useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (e) => {
    if (e.target.innerText == "Log Out") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userId");

      userCtx.setAccessToken("");
      userCtx.setUserInfo({});
      userCtx.setUserId("");
    }
    setAnchorElUser(false);
  };

  return (
    <StyledEngineProvider injectFirst>
      <Box>
        <AppBar position="static" className="lightpink top-bar" elevation={0}>
          <Toolbar>
            <IconButton
              size="medium"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{
                mr: "1rem",
                ml: "0.3rem",
                ":hover": { backgroundColor: "rgba(187, 0, 84, 0.85)" },
              }}
              className="burgundy"
              component={NavLink}
              to="/"
            >
              <GiteIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              className="burgundy-text"
            >
              neighbourly
            </Typography>

            {/* conditional rendering of avatar & burger menu */}
            {props.showBurger && (
              <>
                <IconButton
                  sx={{ p: 1 }}
                  component={NavLink}
                  to={`/profile/${userCtx.userInfo._id}`}
                >
                  <Avt src={userCtx.userInfo.image_url} />
                </IconButton>

                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ ml: "0.5rem" }}
                  onClick={handleOpenUserMenu}
                  className="burgundy-text"
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
    </StyledEngineProvider>
  );
};

export default TopBar;
