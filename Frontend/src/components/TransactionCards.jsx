import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Box,
  Chip,
  Grid,
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
        key={props.idx}
        id={props.id}
        variant="outlined"
        style={{
          borderRadius: "1rem",
          margin: "1rem",
          backgroundColor: "var(--lightpink)",
        }}
        onClick={(e) => {
          props.updateSelectedTxn(props.id);
        }}
      >
        <CardActionArea
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Grid container>
            <Grid
              item
              xs={2}
              sx={{
                display: "flex",
                flexShrink: 1,
                flexDirection: "column",
              }}
            >
              <CardContent sx={{ flex: "0 auto" }}>
                <Avt
                  size={3}
                  src={
                    props.txnToggle === "listings"
                      ? props.requesterImage
                      : props.ownerImage
                  }
                ></Avt>
              </CardContent>
            </Grid>
            <Grid item xs={6} sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flex: "0 auto" }}>
                <Typography component="div" variant="subtitle">
                  {props.listingTitle}
                </Typography>
                <Typography
                  variant="subtitle"
                  color="text.secondary"
                  component="div"
                >
                  {props.txnToggle === "listings"
                    ? props.requesterName
                    : props.ownerName}
                </Typography>
                <Chip
                  label={statusLabel}
                  variant="outlined"
                  sx={{ mb: "1rem", my: "0.5rem" }}
                />
              </CardContent>
            </Grid>
            <Grid item xs={4}>
              <CardMedia
                component="img"
                sx={{ height: 60 }}
                image={props.listingImage}
                alt="Listing img"
                style={{ height: "9rem" }}
              />
            </Grid>
          </Grid>
        </CardActionArea>
      </Card>
    </>
  );
};

export default Transactions;
