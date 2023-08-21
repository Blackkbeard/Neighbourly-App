import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Box,
  Chip,
} from "@mui/material";
import Avt from "./Avt";

const Transactions = (props) => {
  const getStatusLabel = (status) => {
    switch (status) {
      case "pending_owner_response":
        return "Awaiting Response";
      case "accepted":
        return "Accepted";
      case "declined":
        return "Declined";
      case "completed":
        return "Completed";
      case "expired":
        return "Expired";
      default:
        return "Unknown";
    }
  };
  const statusLabel = getStatusLabel(props.status);

  return (
    <>
      <Card
        key={props.id}
        variant="outlined"
        style={{
          borderRadius: "1rem",
          margin: "0.6rem",
        }}
        onClick={() => {
          props.setSelectedTxn(props.id);
        }}
      >
        <CardActionArea
          sx={{ display: "flex", justifyContent: "space-between" }}
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
              <Chip
                label={statusLabel}
                variant="outlined"
                sx={{ mb: "1rem", margin: "0.2rem" }}
              />
            </CardContent>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: 100 }}
            image={props.listingImage}
            alt="Listing img"
          />
        </CardActionArea>
      </Card>
    </>
  );
};

export default Transactions;
