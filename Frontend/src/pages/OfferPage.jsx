import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/user";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Container,
  Typography,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  StyledEngineProvider,
  CircularProgress,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import TopBar from "../components/TopBar";
import Btn from "../components/Btn";
import Listings from "../components/Listings";
import useFetch from "../hooks/useFetch";

const OfferPage = () => {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  const fetchData = useFetch();

  // states
  const [listings, setListings] = useState([]);
  const [dispListings, setDispListings] = useState([]);

  // endpoints
  const getListings = async () => {
    const res = await fetchData("/api/listings/district", "POST", {
      location: userCtx.userInfo.location?.[0].district,
    });

    if (res.ok) {
      setListings(res.data);
      setDispListings(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  // function
  const handleSearch = (e) => {
    const filtered = listings.filter((item) => {
      const lowerCaseTitle = item.title.toLowerCase();
      const lowerCaseInput = e.target.value.toLowerCase();
      return lowerCaseTitle.includes(lowerCaseInput);
    });

    setDispListings(filtered);
  };

  useEffect(() => {
    getListings();
  }, [userCtx.userInfo]);

  return (
    <>
      <TopBar showBurger={true}></TopBar>

      <StyledEngineProvider injectFirst>
        <Container maxWidth="lg">
          <Box>
            <Grid container alignItems="center">
              <Grid xs={12}>
                <Typography variant="h5" textAlign="start" margin="2rem 0">
                  {`Happening in ${userCtx.userInfo?.location?.[0].district} neighbourhood`}
                </Typography>
              </Grid>
              {/* Material UI Search Bar */}
              <Grid xs={10}>
                <FormControl
                  sx={{
                    width: "20rem",
                  }}
                  variant="outlined"
                  className="search-bar"
                  color="secondary"
                  onChange={handleSearch}
                >
                  <InputLabel
                    htmlFor="outlined-adornment"
                    sx={{ ml: "0.5rem" }}
                  >
                    <Typography>Search</Typography>
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment"
                    type="text"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton edge="end" disabled sx={{ mr: "0.1rem" }}>
                          <SearchOutlinedIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Search"
                    className="search-bar"
                  />
                </FormControl>
              </Grid>
              <Grid xs={2}>
                <Btn onClick={() => navigate("/add-offer")}>+ Add Offer</Btn>
              </Grid>

              {/* listings card */}
              {listings ? (
                <Listings listings={dispListings}></Listings>
              ) : (
                <Box sx={{ display: "flex" }}>
                  <CircularProgress />
                </Box>
              )}
            </Grid>
          </Box>
        </Container>
      </StyledEngineProvider>
    </>
  );
};

export default OfferPage;
