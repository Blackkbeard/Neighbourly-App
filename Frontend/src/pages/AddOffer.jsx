import React, { useContext, useRef, useState } from "react";
import TopBar from "../components/TopBar";
import Grid from "@mui/material/Unstable_Grid2";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

import { Container, Typography, Box, TextField, MenuItem } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Btn from "../components/Btn";

const AddOffer = () => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);

  // useRef
  const titleRef = useRef("");
  const descriptionRef = useRef("");
  const typeRef = useRef("");
  const imageRef = useRef("");

  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // function
  const createListing = async () => {
    const res = await fetchData("/api/listings", "PUT", {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      type: typeRef.current.value === "For Loan" ? "loan" : "free",
      owner_id: userCtx.userInfo._id,
      date_available_from: dateFrom,
      date_available_to: dateTo,
      image_url: imageRef.current.value || "../public/sample-image.webp",
    });

    if (res.ok) {
      // setListings(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

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
                  inputRef={titleRef}
                />
                <TextField
                  label="Description"
                  variant="outlined"
                  sx={{ width: "25rem" }}
                  inputRef={descriptionRef}
                />
                <TextField
                  select
                  label="Type"
                  variant="outlined"
                  sx={{ width: "25rem" }}
                  inputRef={typeRef}
                >
                  <MenuItem value="For Loan">For Loan</MenuItem>
                  <MenuItem value="Free">Free</MenuItem>
                </TextField>
                <DatePicker
                  label="Available from"
                  variant="outlined"
                  sx={{ width: "25rem" }}
                  type="date"
                  onChange={(e) =>
                    setDateFrom(e.$d.toISOString().split("T")[0])
                  }
                />
                <DatePicker
                  label="Available to"
                  variant="outlined"
                  sx={{ width: "25rem" }}
                  onChange={(e) => setDateTo(e.$d.toISOString().split("T")[0])}
                />
              </Grid>
              <Grid xs={7}></Grid>
              <Grid xs={12}>
                <Btn onClick={createListing}>Create Listing</Btn>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </LocalizationProvider>
    </>
  );
};

export default AddOffer;
