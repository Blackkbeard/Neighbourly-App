import React from "react";

import Grid from "@mui/material/Unstable_Grid2";
import {
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  Typography,
  CardActionArea,
  Avatar,
} from "@mui/material";

const Listings = () => {
  return (
    <>
      {[1, 2, 3, 4].map((item, id) => {
        return (
          <Grid xs={4} key={id}>
            <Card
              sx={{ maxWidth: 345 }}
              variant="outlined"
              style={{ borderRadius: "1rem", marginTop: "2rem" }}
            >
              <CardHeader
                // onClick to listing owner profile
                avatar={
                  <Avatar sx={{ width: "3rem", height: "3rem" }}></Avatar>
                }
                title="Listing owner"
                subheader="Listing date"
                style={{ backgroundColor: "var(--lightpink)" }}
              />
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="/sample-image.webp"
                  alt="green iguana"
                  style={{ height: "12rem" }}
                />
                <CardContent style={{ backgroundColor: "var(--lightpink)" }}>
                  <Typography gutterBottom variant="h6" component="div">
                    Listing item name
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Listing type
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
    </>
  );
};

export default Listings;
