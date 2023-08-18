import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

const navBar = [
  "The Neighbourhood",
  "Profile",
  "Transaction",
  "Settings",
  "Log Out",
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
      {navBar.map((item) => (
        <MenuItem key={item} onClick={props.handleCloseUserMenu}>
          <Typography textAlign="center">{item}</Typography>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default NavBar;
