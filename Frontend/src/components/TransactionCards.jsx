import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Box,
} from "@mui/material";
import Avt from "./Avt";

const Listings = (props) => {
  return (
    <>
      <Card
        key={props.id}
        sx={{ display: "flex", justifyContent: "space-between" }}
        variant="outlined"
        style={{
          borderRadius: "1rem",
          margin: "0.6rem",
        }}
      >
        <Box sx={{ display: "flex", flexShrink: 1, flexDirection: "column" }}>
          <CardContent sx={{ flex: "0 auto" }}>
            <Avt size={3}></Avt>
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
