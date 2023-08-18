import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { NavLink } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";

const navBar1 = [
  { item: "The Neighbourhood", link: "/" },
  { item: "Profile", link: "/profile" },
  { item: "Transactions", link: "/transactions" },
];

const navBar2 = [
  { item: "Settings", link: "/settings" },
  { item: "Log Out", link: "/" },
];

const NavBar = (props) => {
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
            Howdy, User
          </MenuItem>
          {navBar1.map((item, id) => (
            <MenuItem
              key={id}
              onClick={props.handleCloseUserMenu}
              component={NavLink}
              to={item["link"]}
              style={{ textDecoration: "none" }}
              className="menu-item"
            >
              <Typography textAlign="center">{item["item"]}</Typography>
            </MenuItem>
          ))}
          <Divider variant="middle" />
          {navBar2.map((item, id) => (
            <MenuItem
              key={id}
              onClick={props.handleCloseUserMenu}
              component={NavLink}
              to={item["link"]}
              style={{ textDecoration: "none" }}
              className="menu-item"
            >
              <Typography textAlign="center">{item["item"]}</Typography>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </StyledEngineProvider>
  );
};

export default NavBar;
