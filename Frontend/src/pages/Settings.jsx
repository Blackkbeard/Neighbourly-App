import React from "react";
import TopBar from "../components/TopBar";
import Grid from "@mui/material/Unstable_Grid2";
import { Container, Typography, Box } from "@mui/material";

const Settings = () => {
  return (
    <>
      <TopBar showBurger={true}></TopBar>

      <Container maxWidth="lg">
        <Box>
          <Grid container>
            <Grid xs={3} style={{ borderStyle: "solid" }}>
              <Typography textAlign="center">Account Settings</Typography>
            </Grid>
            <Grid xs={9} style={{ borderStyle: "solid" }}>
              <Typography textAlign="center">Account Settings</Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Settings;
