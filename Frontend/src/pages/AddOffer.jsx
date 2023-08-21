import React from "react";
import TopBar from "../components/TopBar";
import Grid from "@mui/material/Unstable_Grid2";
import { Container, Typography, Box, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Btn from "../components/Btn";

const AddOffer = () => {
  return (
    <>
      <TopBar showBurger={true}></TopBar>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container maxWidth="lg">
          <Box>
            <Grid container spacing={3}>
              <Grid xs={12}>
                <Typography variant="h5" textAlign="start" margin="2rem 0">
                  Offer Help
                </Typography>
                <Typography variant="body1" textAlign="start" margin="2rem 0">
                  Equipment available to lend? Want to share excess food?
                  <br></br>
                  Submit a new listing to help a neighbour out!
                </Typography>
              </Grid>
              <Grid xs={5}>
                <TextField
                  label="Title"
                  variant="outlined"
                  sx={{ width: "25rem" }}
                />
                <TextField
                  label="Description"
                  variant="outlined"
                  sx={{ width: "25rem" }}
                />
                <TextField
                  label="Type"
                  variant="outlined"
                  sx={{ width: "25rem" }}
                />
                <DatePicker
                  label="Available from"
                  variant="outlined"
                  sx={{ width: "25rem" }}
                />
                <DatePicker
                  label="Available to"
                  variant="outlined"
                  sx={{ width: "25rem" }}
                />
              </Grid>
              <Grid xs={7} style={{ borderStyle: "solid" }}></Grid>
              <Grid xs={12}>
                <Btn>Create Listing</Btn>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </LocalizationProvider>
    </>
  );
};

export default AddOffer;
