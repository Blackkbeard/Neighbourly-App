import React, { useState, useEffect, useRef, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

import TopBar from "../components/TopBar";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Container,
  Typography,
  Box,
  Card,
  CardHeader,
  Tooltip,
  Button,
  IconButton,
  Avatar,
  CardMedia,
  CardContent,
  Chip,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  MenuItem,
  CircularProgress,
  Snackbar,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Btn from "../components/Btn";
import Avt from "../components/Avt";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import HandshakeTwoToneIcon from "@mui/icons-material/HandshakeTwoTone";

const ListingPage = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const user_id = userCtx.userInfo._id;

  // states & ref
  const [listing, setListing] = useState({});
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [addDisable, setAddDisable] = useState(false);
  const [dateFrom, setDateFrom] = useState(dayjs(listing.date_available_from));
  const [dateTo, setDateTo] = useState(dayjs(listing.date_available_to));

  const [open, setOpen] = useState(false); //snackbar
  const [btnName, setBtnName] = useState(""); //for snackbar
  const [file, setFile] = useState(); //image file
  const [imageUrl, setImageUrl] = useState("");

  const titleRef = useRef("");
  const descriptionRef = useRef("");
  const typeRef = useRef("");

  const listing_owner_id = listing.owner_id?._id;

  // functions
  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setAddDisable(false);
  };

  const getMsg = (btnName) => {
    switch (btnName) {
      case "edit":
        return "Listing updated!";
        break;
      case "submit":
        return "Request submitted!";
    }
  };

  const dateForUpdate = (e, from = true) => {
    if (from) {
      setDateFrom(e.$d.toISOString().split("T")[0]);
    } else {
      setDateTo(e.$d.toISOString().split("T")[0]);
    }
  };

  const handleCheckBox = () => {
    setAddDisable(!addDisable);
    setDateTo("");
  };

  // snackbar functions
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      {btnName === "submit" && (
        <Button
          style={{ color: "var(--dustypink)" }}
          size="small"
          onClick={() => {
            navigate("/transactions");
          }}
        >
          VIEW REQUEST
        </Button>
      )}

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

  const handleSubmitRequest = async (e) => {
    const res = await fetchData(
      "/api/transactions/",
      "PUT",
      {
        owner_id: listing.owner_id._id,
        requester_id: user_id,
        listing_id: params.item,
      },
      userCtx.accessToken
    );

    if (res.ok) {
      setBtnName(e.target.id);
      setOpen(true);
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

  // endpoint
  const getListingById = async () => {
    const res = await fetchData("/api/listings/" + params.item);

    if (res.ok) {
      setListing(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const deleteListing = async (e) => {
    const res = await fetchData(
      "/api/listings/" + params.item,
      "DELETE",
      undefined,
      userCtx.accessToken
    );

    if (res.ok) {
      props.setOpen(true);

      setOpenDelete(false);
      navigate(`/profile/${userCtx.userInfo._id}`);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const updateListing = async (e) => {
    const body = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      type: typeRef.current.value === "For Loan" ? "loan" : "free",
      date_available_from: dateFrom,
      date_available_to: dateTo,
    };
    if (imageUrl) body.image_url = imageUrl;

    const res = await fetchData(
      "/api/listings/" + params.item,
      "PATCH",
      body,
      userCtx.accessToken
    );

    if (res.ok) {
      getListingById();

      setBtnName(e.target.id);
      setOpen(true);

      setAddDisable(false);
      setOpenEdit(false);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  useEffect(() => {
    getListingById();
  }, []);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TopBar showBurger={true}></TopBar>

        <Container maxWidth="lg">
          <Box>
            <Grid container spacing={3}>
              <Grid xs={12}>
                <Card style={{ marginTop: "2rem" }} elevation={0}>
                  <CardHeader
                    // onClick to listing owner profile
                    avatar={
                      <Tooltip title="View Profile" placement="top">
                        <IconButton
                          onClick={() =>
                            navigate(`/profile/${listing.owner_id?._id}`)
                          }
                        >
                          <Avt
                            sx={{ width: "3rem", height: "3rem" }}
                            src={listing.owner_id?.image_url}
                          ></Avt>
                        </IconButton>
                      </Tooltip>
                    }
                    title={listing?.owner_id?.display_name}
                    subheader={
                      user_id !== listing_owner_id
                        ? `Your neighbour at ${userCtx.userInfo.location?.[0].district}`
                        : `Your listing at ${userCtx.userInfo.location?.[0].district}`
                    }
                  />
                </Card>
              </Grid>

              <Grid xs={5}>
                {listing.image_url ? (
                  <CardMedia component="img" image={listing.image_url} />
                ) : (
                  <Box sx={{ display: "flex" }}>
                    <CircularProgress />
                  </Box>
                )}
              </Grid>
              <Grid xs={7}>
                <Card elevation={0}>
                  <CardContent>
                    <Typography gutterBottom variant="h4">
                      {listing.title}
                    </Typography>
                    <Chip
                      label={listing.type === "loan" ? "For Loan" : "Free"}
                      variant="outlined"
                      sx={{ mb: "1rem" }}
                    />
                    <Box sx={{ height: "6rem" }}>
                      <Typography variant="body1">
                        {listing.description}
                      </Typography>
                    </Box>
                    <Box sx={{ height: "2rem" }}>
                      <Typography variant="body1" fontSize="0.8rem">
                        {`Available from: ${
                          listing.date_available_from?.split("T")[0]
                        }`}
                        <br></br>
                        {listing.date_available_to &&
                          `Available up to: ${
                            listing.date_available_to?.split("T")[0]
                          }`}
                      </Typography>
                    </Box>
                  </CardContent>

                  {/* conditional rendering of buttons depending on owner or neighbour */}
                  <CardActions>
                    {user_id !== listing_owner_id ? (
                      <Btn
                        onClick={handleSubmitRequest}
                        startIcon={<HandshakeTwoToneIcon />}
                        id="submit"
                      >
                        Submit Request
                      </Btn>
                    ) : (
                      <>
                        <Btn
                          startIcon={<ModeEditOutlineOutlinedIcon />}
                          onClick={handleOpenEdit}
                        >
                          Edit
                        </Btn>
                        <Btn
                          startIcon={<DeleteForeverOutlinedIcon />}
                          onClick={handleOpenDelete}
                        >
                          Delete
                        </Btn>
                      </>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Container>

        {/* dialog for delete listing */}
        <Dialog
          open={openDelete}
          onClose={handleCloseDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Are you sure you want to delete this listing?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This action cannot be undone. Once deleted, the listing and all
              associated data will be permanently removed from the system.
              <br />
              <br />
              Please confirm your decision.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Btn onClick={handleCloseDelete} isBrown={true}>
              Cancel
            </Btn>
            <Btn onClick={deleteListing} autoFocus id="delete">
              Delete Listing
            </Btn>
          </DialogActions>
        </Dialog>

        {/* dialog for edit listing */}
        <Dialog open={openEdit} onClose={handleCloseEdit}>
          <DialogTitle>Edit Listing Details</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Title"
              type="text"
              sx={{ width: "32rem" }}
              variant="outlined"
              defaultValue={listing.title}
              inputRef={titleRef}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Description"
              multiline
              minRows={4}
              type="text"
              sx={{ width: "32rem" }}
              variant="outlined"
              defaultValue={listing.description}
              inputRef={descriptionRef}
            />
            <TextField
              autoFocus
              select
              margin="dense"
              label="Type"
              type="text"
              sx={{ width: "32rem" }}
              variant="outlined"
              defaultValue={listing.type === "loan" ? "For Loan" : "Free"}
              inputRef={typeRef}
            >
              <MenuItem value="For Loan">For Loan</MenuItem>
              <MenuItem value="Free">Free</MenuItem>
            </TextField>
            <DatePicker
              label="Available from"
              variant="outlined"
              sx={{ width: "32rem", mt: "0.4rem", mb: "0.4rem" }}
              defaultValue={dayjs(listing.date_available_from)}
              onChange={(e) => dateForUpdate(e)}
            />
            <DatePicker
              disablePast
              minDate={dayjs(dateFrom + 48)}
              label="Available to"
              variant="outlined"
              sx={{ width: "32rem", mt: "0.4rem" }}
              defaultValue={dayjs(listing.date_available_to)}
              onChange={(e) => dateForUpdate(e, false)}
              disabled={addDisable}
            />
            <FormGroup>
              <FormControlLabel
                control={<Checkbox onChange={handleCheckBox} />}
                label="Remove date?"
              ></FormControlLabel>
            </FormGroup>
            <br />
            <input onChange={fileSelected} type="file" accept="image/*"></input>
            <Typography variant="body2" fontSize="0.8rem">
              *Upload an image only if you want to replace the existing image
            </Typography>
            <Btn onClick={submit}>Upload image</Btn>
          </DialogContent>
          <DialogActions>
            <Btn onClick={handleCloseEdit} isBrown={true}>
              Cancel
            </Btn>
            <Btn onClick={updateListing} id="edit">
              Confirm
            </Btn>
          </DialogActions>
        </Dialog>

        {/* snackbar */}
        <div>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            message={getMsg(btnName)}
            action={action}
          />
        </div>
      </LocalizationProvider>
    </>
  );
};

export default ListingPage;
