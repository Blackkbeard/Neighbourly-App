import React, { useContext, useState, useEffect } from "react";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";

import TopBar from "../components/TopBar";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Container,
  Typography,
  Box,
  Chip,
  Divider,
  CircularProgress,
  Snackbar,
  IconButton,
} from "@mui/material";
import Avt from "../components/Avt";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CloseIcon from "@mui/icons-material/Close";
import Btn from "../components/Btn";
import Listings from "../components/Listings";

const Profile = (props) => {
  const params = useParams();
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const navigate = useNavigate();

  // states
  const [listings, setListings] = useState([]);
  const [currProfile, setCurrProfile] = useState([]);

  // snackbar functions
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    props.setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnackbar}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  // Endpoint
  const getListingsByUserId = async () => {
    const res = await fetchData("/api/listings/userId", "POST", {
      owner_id: params.item,
    });

    if (res.ok) {
      setListings(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const getProfileInfo = async () => {
    const res = await fetchData("/auth/accounts/" + params.item);

    if (res.ok) {
      setCurrProfile(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  //render on mount
  useEffect(() => {
    getListingsByUserId();
    getProfileInfo();
  }, [params.item]);

  return (
    <>
      <TopBar showBurger={true}></TopBar>

      <Container maxWidth="lg">
        <Box>
          <Grid container>
            <Grid xs={2} sx={{ mt: "2rem" }}>
              <Avt size={12} src={currProfile.image_url}></Avt>
            </Grid>
            <Grid xs={8} sx={{ mt: "2rem" }}>
              <Box>
                <Typography
                  variant="h4"
                  marginBottom="1rem"
                  sx={{ ml: "3rem", mr: "3rem" }}
                >
                  {currProfile.display_name}
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  sx={{ ml: "3rem" }}
                >
                  {/* optional chaining for object and array to prevent page load fail */}
                  {`Neighbourhood: ${currProfile.location?.[0].district}`}
                </Typography>
                <Typography sx={{ ml: "3rem" }}>
                  {currProfile.biography}
                </Typography>
              </Box>
              <Chip
                icon={
                  <FavoriteBorderIcon
                    fontSize="large"
                    style={{ color: "var(--burgundy)" }}
                  />
                }
                label={`${currProfile.help_count} Neighbours helped`}
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
              {userCtx.userId === params.item && (
                <Btn onClick={() => navigate("/settings")}>Edit Profile</Btn>
              )}
            </Grid>
          </Grid>
          <Divider
            sx={{ mt: "2rem", borderWidth: "10", borderColor: "black" }}
          />
          <Grid container alignItems="center">
            <Grid xs={10} sx={{ mt: "1rem" }}>
              <Typography variant="h5">
                {userCtx.userId === params.item
                  ? "Your Listings"
                  : `${currProfile.display_name}'s Listings`}
              </Typography>
            </Grid>
            <Grid xs={2} sx={{ mt: "1rem" }}>
              {userCtx.userId === params.item && (
                <Btn onClick={() => navigate("/add-offer")}>+ Add Offer</Btn>
              )}
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

      {/* snackbar */}
      <div>
        <Snackbar
          open={props.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message="Listing deleted!"
          action={action}
        />
      </div>
    </>
  );
};

export default Profile;
