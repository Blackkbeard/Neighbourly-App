import React, { useContext } from "react";
import TopBar from "../components/TopBar";
import Grid from "@mui/material/Unstable_Grid2";
import { Container, Typography, Box } from "@mui/material";
import Btn from "../components/Btn";
import UserContext from "../context/user";

const OfferPage = () => {
  const userCtx = useContext(UserContext);

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
              <Btn>Sign In</Btn>
              <Btn isBrown={true}>Cancel</Btn>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default OfferPage;
