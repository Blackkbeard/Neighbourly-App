import { React, useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../context/user";

import {
  ListItemIcon,
  Menu,
  MenuItem,
  MenuList,
  Typography,
  Divider,
} from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import GiteIcon from "@mui/icons-material/Gite";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { StyledEngineProvider } from "@mui/material/styles";

const NavBar = (props) => {
  const userCtx = useContext(UserContext);

  const navBar1 = [
    {
      item: "The Neighbourhood",
      link: "/",
      icon: <GiteIcon fontSize="large" />,
    },
    {
      item: "Profile",
      link: `/profile/${userCtx.userInfo._id}`,
      icon: <PersonOutlineOutlinedIcon fontSize="large" />,
    },
    {
      item: "Transactions",
      link: "/transactions",
      icon: <SwapHorizOutlinedIcon fontSize="large" />,
    },
  ];

  const navBar2 = [
    {
      item: "Settings",
      link: "/settings",
      icon: <SettingsOutlinedIcon fontSize="large" />,
    },
    {
      item: "Log Out",
      link: "/",
      icon: <CloseIcon fontSize="large" />,
    },
  ];

  return (
    <StyledEngineProvider>
      <Menu
        sx={{ mt: "4rem" }}
        id="menu-appbar"
        anchorEl={props.anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(props.anchorElUser)}
        onClose={props.handleCloseUserMenu}
        elevation={0}
      >
        <MenuList>
          <MenuItem className="menu-item" disabled>
            <Typography textAlign="center">
              Howdy, {userCtx.userInfo.display_name}
            </Typography>
          </MenuItem>
          {navBar1.map((item, id) => (
            <MenuItem
              key={id}
              onClick={props.handleCloseUserMenu}
              component={NavLink}
              to={item.link}
              style={{ textDecoration: "none" }}
              className="menu-item"
            >
              <ListItemIcon sx={{ mr: "1rem" }}>{item.icon}</ListItemIcon>
              <Typography textAlign="center">{item.item}</Typography>
            </MenuItem>
          ))}
          <Divider variant="middle" />
          {navBar2.map((item, id) => (
            <MenuItem
              key={id}
              onClick={props.handleCloseUserMenu}
              component={NavLink}
              to={item.link}
              style={{ textDecoration: "none" }}
              className="menu-item"
            >
              <ListItemIcon sx={{ mr: "1rem" }}>{item.icon}</ListItemIcon>
              <Typography textAlign="center">{item.item}</Typography>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </StyledEngineProvider>
  );
};

export default NavBar;
