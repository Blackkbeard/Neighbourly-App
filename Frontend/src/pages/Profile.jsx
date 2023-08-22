import React, { useContext } from "react";
import TopBar from "../components/TopBar";
import UserContext from "../context/user";
import Grid from "@mui/material/Unstable_Grid2";
import { Container, Typography, Box } from "@mui/material";
import Avt from "../components/Avt";

const Profile = () => {
  const userCtx = useContext(UserContext);
  return (
    <>
      <TopBar showBurger={true}></TopBar>

      <Container maxWidth="lg">
        <Box>
          <Grid container>
            <Grid xs={2} style={{ borderStyle: "solid" }} sx={{ mt: "2rem" }}>
              <Avt size={12} src={userCtx.userInfo.image_url}></Avt>
            </Grid>
            <Grid xs={10} style={{ borderStyle: "solid" }} sx={{ mt: "2rem" }}>
              <Typography variant="h4" marginBottom="1rem">
                {userCtx.userInfo.display_name}
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                {`Neighbourhood: ${userCtx.userInfo.location[0].district}`}
              </Typography>
              <Typography>{userCtx.userInfo.biography}</Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Profile;
