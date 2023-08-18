import React from "react";
import TopBar from "../components/TopBar";
import Grid from "@mui/material/Unstable_Grid2";
import { Container, Typography, Box } from "@mui/material";

const ProfileSetup = () => {
  return (
    <>
      <TopBar></TopBar>

      <Container maxWidth="lg">
        <Box>
          <Grid container>
            <Grid xs={12} style={{ borderStyle: "solid" }}>
              <Typography textAlign="center">Registration</Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default ProfileSetup;
