import React from "react";
import TopBar from "../components/TopBar";
import Grid from "@mui/material/Unstable_Grid2";
import Btn from "../components/Btn";
import { Container, Typography, Box, Avatar, TextField } from "@mui/material";

const Settings = (props) => {
  return (
    <>
      <TopBar showBurger={true}></TopBar>

      <Container maxWidth="lg">
        <Box>
          <Grid container>
            <Grid xs={3} style={{ borderStyle: "solid" }}>
              <Typography textAlign="center">Account Settings</Typography>
              <Avatar
                alt=""
                src="https://seeklogo.com/images/G/general-assembly-logo-D5C634F07A-seeklogo.com.png"
                sx={{ width: 150, height: 150 }}
                display="flex"
                justifycontent="center"
              ></Avatar>
            </Grid>
            <Grid xs={9} style={{ borderStyle: "solid" }}>
              <Typography textAlign="center">Account Settings</Typography>
              <Box xs={2}>Name </Box>
              <Box xs={5} id="outlined-basic" variant="outlined"></Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Settings;
