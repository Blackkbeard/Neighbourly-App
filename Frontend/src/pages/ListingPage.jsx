import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
} from "@mui/material";
import Btn from "../components/Btn";

const ListingPage = () => {
  const params = useParams();
  const fetchData = useFetch();
  const [listing, setListing] = useState({});

  const getListingById = async () => {
    const res = await fetchData("/api/listings/" + params.item);

    if (res.ok) {
      setListing(res.data);
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
                  {/* add conditional rendering for owner/neighbour */}
                  <Btn>Submit Request</Btn>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default ListingPage;
