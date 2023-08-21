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
import Avt from "./Avt";

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
                      <Avt size={3}></Avt>
                    </IconButton>
                  </Tooltip>
                }
                title={item.owner_id.display_name}
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
                    <Typography gutterBottom variant="h7" component="div">
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
