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

const Listings = () => {
  return (
    <>
      {[1, 2, 3, 4].map((item, id) => {
        return (
          <Grid xs={12} key={id}>
            <Card
              sx={{ display: "flex", justifyContent: "space-between" }}
              variant="outlined"
              style={{
                borderRadius: "1rem",
                margin: "1rem",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Avatar sx={{ width: "3rem", height: "3rem" }}></Avatar>
                </CardContent>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h6">
                    Listing Title
                  </Typography>
                  <Typography
                    variant="subtitle"
                    color="text.secondary"
                    component="div"
                  >
                    RequesterName
                  </Typography>
                </CardContent>
              </Box>
              <CardMedia
                component="img"
                sx={{ width: 100 }}
                image="/sample-image.webp"
                alt="Listing img"
              />
            </Card>
          </Grid>
        );
      })}
    </>
  );
};

export default Listings;
