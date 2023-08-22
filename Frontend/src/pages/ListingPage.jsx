import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

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
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Btn from "../components/Btn";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import HandshakeTwoToneIcon from "@mui/icons-material/HandshakeTwoTone";

const ListingPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const fetchData = useFetch();

  // states & ref
  const [listing, setListing] = useState({});
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [open, setOpen] = useState(false); //snackbar
  const [btnName, setBtnName] = useState(""); //for snackbar

  const titleRef = useRef("");
  const descriptionRef = useRef("");
  const typeRef = useRef("");

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
  };

  const getMsg = (btnName) => {
    switch (btnName) {
      case "edit":
        return "Listing updated!";
        break;
      case "delete":
        return "Listing deleted!";
        break;
      case "submit":
        return "Request submitted!";
    }
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
    const res = await fetchData("/api/transactions/", "PUT", {
      owner_id: listing.owner_id._id,
      requester_id: "64e2c2fcdce21246ef81b8ed", //TODO: get requester_id
      listing_id: params.item,
    });

    if (res.ok) {
      setBtnName(e.target.id);
      setOpen(true);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
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
    const res = await fetchData("/api/listings/" + params.item, "DELETE");

    if (res.ok) {
      // to display snackbar at profile page instead!!!
      // setBtnName(e.target.id);
      // setOpen(true);

      setOpenDelete(false);
      navigate("/profile");
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const updateListing = async (e) => {
    const res = await fetchData("/api/listings/" + params.item, "PATCH", {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      type: typeRef.current.value === "For Loan" ? "loan" : "free",
      // image_url:
      //   "https://i.pcmag.com/imagery/roundups/06msR0ZNV3Oc2GfpqCu9AcT-14..v1632927607.jpg",
    });

    if (res.ok) {
      getListingById();

      setBtnName(e.target.id);
      setOpen(true);

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
                      <IconButton onClick={() => console.log("to profile")}>
                        <Avatar sx={{ width: "3rem", height: "3rem" }}></Avatar>
                      </IconButton>
                    </Tooltip>
                  }
                  title={listing?.owner_id?.display_name}
                  subheader={`Your neighbour at USER-LOCATION`}
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
                  <Box sx={{ height: "5rem" }}>
                    <Typography variant="body1">
                      {listing.description}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  {/* add conditional rendering for neighbour */}
                  <Btn
                    onClick={handleSubmitRequest}
                    startIcon={<HandshakeTwoToneIcon />}
                    id="submit"
                  >
                    Submit Request
                  </Btn>

                  {/* add conditional rendering for owner */}
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
            fullWidth
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
            fullWidth
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
            fullWidth
            variant="outlined"
            defaultValue={listing.type === "loan" ? "For Loan" : "Free"}
            inputRef={typeRef}
          >
            <MenuItem value="For Loan">For Loan</MenuItem>
            <MenuItem value="Free">Free</MenuItem>
          </TextField>
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
    </>
  );
};

export default ListingPage;
