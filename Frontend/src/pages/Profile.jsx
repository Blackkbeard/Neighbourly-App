import React, { useContext, useState, useEffect } from "react";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

import TopBar from "../components/TopBar";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Container,
  Typography,
  Box,
  Chip,
  Divider,
  CircularProgress,
} from "@mui/material";
import Avt from "../components/Avt";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Btn from "../components/Btn";
import Listings from "../components/Listings";

const Profile = () => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const navigate = useNavigate();

  // states
  const [listings, setListings] = useState([]);

  // Endpoint
  const getListingsByUserId = async () => {
    const res = await fetchData("/api/listings/userId", "POST", {
      owner_id: userCtx.userInfo._id,
    });

    if (res.ok) {
      setListings(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  useEffect(() => {
    getListingsByUserId();
  });
  return (
    <>
      <TopBar showBurger={true}></TopBar>

      <Container maxWidth="lg">
        <Box>
          <Grid container>
            <Grid xs={2} sx={{ mt: "2rem" }}>
              <Avt size={12} src={userCtx.userInfo?.image_url}></Avt>
            </Grid>
            <Grid xs={8} sx={{ mt: "2rem" }}>
              <Box>
                <Typography
                  variant="h4"
                  marginBottom="1rem"
                  sx={{ ml: "3rem", mr: "3rem" }}
                >
                  {userCtx.userInfo?.display_name}
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  sx={{ ml: "3rem" }}
                >
                  {/* optional chaining for object and array to prevent page load fail */}
                  {`Neighbourhood: ${userCtx.userInfo?.location?.[0].district}`}
                </Typography>
                <Typography sx={{ ml: "3rem" }}>
                  {userCtx.userInfo.biography}
                </Typography>
              </Box>
              <Chip
                icon={
                  <FavoriteBorderIcon
                    fontSize="large"
                    style={{ color: "var(--burgundy)" }}
                  />
                }
                label={`${userCtx.userInfo?.help_count} Neighbours helped`}
                variant="outlined"
                sx={{ ml: "3rem", mt: "1rem" }}
                style={{
                  height: "3rem",
                  width: "30%",
                  borderColor: "var(--burgundy)",
                }}
              />
            </Grid>
            <Grid xs={2} sx={{ mt: "2rem" }}>
              <Btn onClick={() => navigate("/settings")}>Edit Profile</Btn>
            </Grid>
          </Grid>
          <Divider
            sx={{ mt: "2rem", borderWidth: "10", borderColor: "black" }}
          />
          <Grid container alignItems="center">
            <Grid xs={10} sx={{ mt: "1rem" }}>
              <Typography variant="h5">Your Listings</Typography>
            </Grid>
            <Grid xs={2} sx={{ mt: "1rem" }}>
              <Btn onClick={() => navigate("/add-offer")}>+ Add Offer</Btn>
            </Grid>
            {/* listings card */}
            {listings ? (
              <Listings listings={listings}></Listings>
            ) : (
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            )}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Profile;
