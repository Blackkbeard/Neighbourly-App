import React, { useContext } from "react";
import TopBar from "../components/TopBar";
import UserContext from "../context/user";
import Grid from "@mui/material/Unstable_Grid2";
import { Container, Typography, Box, Chip } from "@mui/material";
import Avt from "../components/Avt";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const Profile = () => {
  const userCtx = useContext(UserContext);
  return (
    <>
      <TopBar showBurger={true}></TopBar>

      <Container maxWidth="lg">
        <Box>
          <Grid container>
            <Grid xs={2} sx={{ mt: "2rem" }}>
              <Avt size={12} src={userCtx.userInfo.image_url}></Avt>
            </Grid>
            <Grid xs={10} sx={{ mt: "2rem" }}>
              <Box>
                <Typography
                  variant="h4"
                  marginBottom="1rem"
                  sx={{ ml: "3rem" }}
                >
                  {userCtx.userInfo.display_name}
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  sx={{ ml: "3rem" }}
                >
                  {`Neighbourhood: ${userCtx.userInfo.location[0].district}`}
                </Typography>
                <Typography sx={{ ml: "3rem" }}>
                  {userCtx.userInfo.biography}
                </Typography>
              </Box>
              <Chip
                icon={<FavoriteBorderIcon />}
                label={`${userCtx.userInfo.help_count} Neighbours helped`}
                variant="outlined"
                sx={{ ml: "3rem", mt: "1rem" }}
                style={{ height: "3rem", width: "20%" }}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Profile;
