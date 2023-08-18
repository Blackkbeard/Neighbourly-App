import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";

const navBar = [
  { item: "The Neighbourhood", link: "/" },
  { item: "Profile", link: "/profile" },
  { item: "Transaction", link: "/transaction" },
  { item: "Settings", link: "/settings" },
  { item: "Log Out", link: "/" },
];

const NavBar = (props) => {
  return (
    <Menu
      sx={{ mt: "45px" }}
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
    >
      {navBar.map((item, id) => (
        <MenuItem
          key={id}
          onClick={props.handleCloseUserMenu}
          component={NavLink}
          to={item["link"]}
          style={{ textDecoration: "none" }}
        >
          <Typography textAlign="center">{item["item"]}</Typography>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default NavBar;
