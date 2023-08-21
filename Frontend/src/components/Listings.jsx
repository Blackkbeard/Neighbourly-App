import React from "react";
import { Link } from "react-router-dom";

import Grid from "@mui/material/Unstable_Grid2";
import {
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  Typography,
  CardActionArea,
  Avatar,
  Tooltip,
  IconButton,
} from "@mui/material";

const Listings = (props) => {
  return (
    <>
      {props.listings.map((item, id) => {
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
                  <Tooltip title="View Profile" placement="top">
                    <IconButton onClick={() => console.log("to profile")}>
                      <Avatar sx={{ width: "3rem", height: "3rem" }}></Avatar>
                    </IconButton>
                  </Tooltip>
                }
                title="Listing owner"
                subheader={item.created_at.split("T")[0]}
                style={{ backgroundColor: "var(--lightpink)" }}
              />
              <Link
                to={`/listing/${item._id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    //   image="/sample-image.webp"
                    image={item.image_url}
                    alt="green iguana"
                    style={{ height: "12rem" }}
                  />
                  <CardContent style={{ backgroundColor: "var(--lightpink)" }}>
                    <Typography gutterBottom variant="h6" component="div">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.type === "loan" ? "For Loan" : "Free"}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
          </Grid>
        );
      })}
    </>
  );
};

export default Listings;
