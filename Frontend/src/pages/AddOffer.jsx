import React, { useContext, useRef, useState } from "react";
import TopBar from "../components/TopBar";
import Grid from "@mui/material/Unstable_Grid2";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Typography,
  Box,
  TextField,
  MenuItem,
  Snackbar,
  IconButton,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Btn from "../components/Btn";

const AddOffer = () => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();

  // useRef
  const titleRef = useRef("");
  const descriptionRef = useRef("");
  const typeRef = useRef("");
  const imageRef = useRef("");

  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [newListingId, setNewListingId] = useState("");
  const [open, setOpen] = useState(false); //snackbar

  // function
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button
        style={{ color: "var(--dustypink)" }}
        size="small"
        onClick={() => {
          navigate(`/listing/${newListingId}`);
        }}
      >
        VIEW LISTING
      </Button>

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

  // endpoint
  const createListing = async () => {
    const res = await fetchData("/api/listings", "PUT", {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      type: typeRef.current.value === "For Loan" ? "loan" : "free",
      owner_id: userCtx.userInfo._id,
      date_available_from: dateFrom,
      date_available_to: dateTo,
      image_url: imageRef.current.value || "/sample-image.webp",
    });

    if (res.ok) {
      setOpen(true);
      //to fetch all data?
      setNewListingId(res.data.id);
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

      {/* snackbar */}
      <div>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message="Listing created!"
          action={action}
        />
      </div>
    </>
  );
};

export default AddOffer;
