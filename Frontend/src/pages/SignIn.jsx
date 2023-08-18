import React from "react";
import TopBar from "../components/TopBar";
import Grid from "@mui/material/Unstable_Grid2";
import { Container, Typography, Box } from "@mui/material";

const SignIn = () => {
  return (
    <>
      <TopBar></TopBar>

      <Container maxWidth="lg">
        <Box>
          <Grid container>
            <Grid xs={7} style={{ borderStyle: "solid" }}>
              <Typography textAlign="center">Sign-in</Typography>
            </Grid>
            <Grid xs={5} style={{ borderStyle: "solid" }}>
              <Typography textAlign="center">Sign-in</Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default SignIn;
