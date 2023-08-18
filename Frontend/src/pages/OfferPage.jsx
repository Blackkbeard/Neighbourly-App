import React from "react";
import TopBar from "../components/TopBar";
import Grid from "@mui/material/Unstable_Grid2";
import { Container, Typography, Box } from "@mui/material";

const OfferPage = () => {
  return (
    <>
      <TopBar showBurger={true}></TopBar>

      <Container maxWidth="lg">
        <Box>
          <Grid container>
            <Grid xs={6} style={{ borderStyle: "solid" }}>
              <Typography textAlign="center">The Neighbourhood</Typography>
            </Grid>
            <Grid xs={6} style={{ borderStyle: "solid" }}>
              <Typography textAlign="center">The Neighbourhood</Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default OfferPage;
