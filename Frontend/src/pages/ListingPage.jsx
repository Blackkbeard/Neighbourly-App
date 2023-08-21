import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import Btn from "../components/Btn";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import HandshakeTwoToneIcon from "@mui/icons-material/HandshakeTwoTone";

const ListingPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const fetchData = useFetch();

  // states
  const [listing, setListing] = useState({});
  const [openDelete, setOpenDelete] = useState(false);

  // functions
  const handleClickOpen = () => {
    setOpenDelete(true);
  };

  const handleClose = () => {
    setOpenDelete(false);
  };

  const handleSubmitRequest = async () => {
    const res = await fetchData("/api/transactions/", "PUT", {
      owner_id: listing.owner_id._id,
      requester_id: "64e2c2fcdce21246ef81b8ed", //TODO: get requester_id
      listing_id: params.item,
    });

    if (res.ok) {
      navigate("/transactions");
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const getListingById = async () => {
    const res = await fetchData("/api/listings/" + params.item);

    if (res.ok) {
      setListing(res.data);
      console.log(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const deleteListing = async () => {
    const res = await fetchData("/api/listings/" + params.item, "DELETE");

    if (res.ok) {
      setOpenDelete(true);
      navigate("/");
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
              <CardMedia component="img" image={listing.image_url} />
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
                  >
                    Submit Request
                  </Btn>

                  {/* add conditional rendering for owner */}
                  <Btn startIcon={<ModeEditOutlineOutlinedIcon />}>Edit</Btn>
                  <Btn
                    startIcon={<DeleteForeverOutlinedIcon />}
                    onClick={handleClickOpen}
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
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h5">
            Are you sure you want to delete this listing?
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography variant="body1">
              This action cannot be undone. Once deleted, the listing and all
              associated data will be permanently removed from the system.
              <br />
              <br />
              Please confirm your decision.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Btn onClick={handleClose} isBrown={true}>
            Cancel
          </Btn>
          <Btn onClick={deleteListing} autoFocus>
            Confirm
          </Btn>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ListingPage;
