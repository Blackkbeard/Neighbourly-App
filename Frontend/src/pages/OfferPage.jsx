import React, { useContext } from "react";
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
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import TopBar from "../components/TopBar";
import Btn from "../components/Btn";
import Listings from "../components/Listings";

const OfferPage = () => {
  const userCtx = useContext(UserContext);

  return (
    <>
      <TopBar showBurger={true}></TopBar>

      <StyledEngineProvider injectFirst>
        <Container maxWidth="lg">
          <Box>
            <Grid container alignItems="center">
              <Grid xs={12}>
                <Typography variant="h5" textAlign="start" margin="2rem 0">
                  Happening in USER-LOCATION neighbourhood
                </Typography>
              </Grid>

              {/* Material UI Search Bar */}
              <Grid xs={10}>
                <FormControl
                  sx={{
                    width: "20rem",
                    input: { fontFamily: "var(--font)" },
                  }}
                  variant="outlined"
                  className="search-bar"
                  color="secondary"
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
                <Btn>+ Add Offer</Btn>
              </Grid>

              <Listings></Listings>
            </Grid>
          </Box>
        </Container>
      </StyledEngineProvider>
    </>
  );
};

export default OfferPage;
