import React from "react";

import Grid from "@mui/material/Unstable_Grid2";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Avatar,
  Box,
} from "@mui/material";

const Listings = (props) => {
  return (
    <>
      <Card
        key={props.id}
        sx={{ display: "flex", justifyContent: "space-between" }}
        variant="outlined"
        style={{
          borderRadius: "1rem",
          margin: "1rem",
        }}
      >
        <Box sx={{ display: "flex", flexShrink: 1, flexDirection: "column" }}>
          <CardContent sx={{ flex: "0 auto" }}>
            <Avatar sx={{ width: "3rem", height: "3rem" }}></Avatar>
          </CardContent>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "0 auto" }}>
            <Typography component="div" variant="subtitle">
              {props.listingTitle}
            </Typography>
            <Typography
              variant="subtitle"
              color="text.secondary"
              component="div"
            >
              {props.requesterName}
            </Typography>
          </CardContent>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 100 }}
          image={props.listingImage}
          alt="Listing img"
        />
      </Card>
    </>
  );
};

export default Listings;
