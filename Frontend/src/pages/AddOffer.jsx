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
import dayjs from "dayjs";

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
  const [file, setFile] = useState(); //image file
  const [imageUrl, setImageUrl] = useState("");

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

  // endpoint to create listing
  const createListing = async () => {
    const res = await fetchData(
      "/api/listings",
      "PUT",
      {
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        type: typeRef.current.value === "For Loan" ? "loan" : "free",
        owner_id: userCtx.userInfo._id,
        date_available_from: dateFrom,
        date_available_to: dateTo,
        image_url: imageUrl || "/sample-image.webp",
      },
      userCtx.accessToken
    );

    if (res.ok) {
      setOpen(true);
      //to fetch all data?
      setNewListingId(res.data.id);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  //for image upload
  const submit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert("Please select an image file");
      return;
    }
    const formData = new FormData();
    formData.append("image", file);

    // append listing_id to update existing listing
    // formData.append("listing_id", userFullInfo._id);

    const res = await fetch(
      import.meta.env.VITE_SERVER + "/api/images/listings",
      {
        method: "POST",
        headers: {},
        body: formData,
      }
    );
    const data = await res.json();

    let returnValue = {};
    if (res.ok) {
      if (data.status === "error") {
        returnValue = { ok: false, data: data.msg };
      } else {
        returnValue = { ok: true, data };
        alert("Image uploaded");
        setImageUrl(data.url);
      }
    } else {
      if (data?.errors && Array.isArray(data.errors)) {
        const messages = data.errors.map((item) => item.msg);
        returnValue = { ok: false, data: messages };
      } else if (data?.status === "error") {
        returnValue = { ok: false, data: data.message || data.msg };
      } else {
        console.log(data);
        returnValue = { ok: false, data: "An error has occurred" };
      }
    }

    return returnValue;
  };

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
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
                <Typography
                  variant="body1"
                  textAlign="start"
                  margin="2rem 0 1rem 0"
                >
                  Equipment available to lend? Want to share excess food?
                  <br></br>
                  Submit a new listing to help a neighbour out!
                </Typography>
              </Grid>
              <Grid xs={5}>
                <TextField
                  required
                  label="Title"
                  variant="outlined"
                  sx={{ width: "25rem", mb: "1rem" }}
                  inputRef={titleRef}
                  helperText="Name your listing"
                />
                <TextField
                  required
                  multiline
                  minRows={4}
                  label="Description"
                  variant="outlined"
                  sx={{ width: "25rem", mb: "1rem" }}
                  inputRef={descriptionRef}
                  helperText="Describe what you are offering"
                />
                <TextField
                  required
                  select
                  label="Type"
                  variant="outlined"
                  sx={{ width: "25rem", mb: "1rem" }}
                  inputRef={typeRef}
                  helperText="Type of listing"
                >
                  <MenuItem value="For Loan">For Loan</MenuItem>
                  <MenuItem value="Free">Free</MenuItem>
                </TextField>
                <DatePicker
                  disablePast
                  label="Available from"
                  variant="outlined"
                  sx={{ width: "25rem", mb: "1rem" }}
                  onChange={(e) =>
                    setDateFrom(e.$d.toISOString().split("T")[0])
                  }
                  slotProps={{
                    textField: {
                      required: true,
                    },
                  }}
                />
                <DatePicker
                  disablePast
                  minDate={dayjs(dateFrom + 48)}
                  label="Available to"
                  variant="outlined"
                  sx={{ width: "25rem" }}
                  onChange={(e) => setDateTo(e.$d.toISOString().split("T")[0])}
                />
              </Grid>
              <Grid xs={7}>
                {/* <img
                  alt=""
                  src="public/sample-image.jpg"
                  sx={{ width: 150, height: 150 }}
                  display="flex"
                  justifycontent="center"
                ></img> */}

                <input
                  onChange={fileSelected}
                  type="file"
                  accept="image/*"
                ></input>

                <Btn onClick={submit}>Upload image</Btn>
              </Grid>
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
