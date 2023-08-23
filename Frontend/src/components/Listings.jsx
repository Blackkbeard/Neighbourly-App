import React from "react";
import { Link, useNavigate } from "react-router-dom";

import Grid from "@mui/material/Unstable_Grid2";
import {
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  Typography,
  CardActionArea,
  Tooltip,
  IconButton,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import Avt from "./Avt";

const Listings = (props) => {
  const navigate = useNavigate();
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
                avatar={
                  <Tooltip title="View Profile" placement="top">
                    <IconButton
                      onClick={() => navigate(`/profile/${item.owner_id._id}`)}
                    >
                      <Avt size={3} src={item.owner_id.image_url}></Avt>
                    </IconButton>
                  </Tooltip>
                }
                title={item.owner_id.display_name}
                subheader={item.created_at.split("T")[0]}
                style={{ backgroundColor: "var(--lightpink)" }}
                action={
                  <IconButton
                    onClick={() =>
                      navigator.clipboard.writeText(`${window.location.origin}/listing/${item._id}`)
                    }
                  >
                    <ShareIcon />
                  </IconButton>
                }
              />
              <Link
                to={`/listing/${item._id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.image_url}
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
