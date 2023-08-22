import React from "react";
import { Paper, Typography } from "@mui/material";

const CarouselItem = (props) => {
  return (
    <Paper
      elevation={0}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "space-between",
        margin: "0 auto",
      }}
    >
      <img
        src={props.item.image_src}
        style={{
          width: "100%",
          maxHeight: "80%",
          display: "block",
          margin: "0 auto",
        }}
        alt="Item"
      />
      <Typography
        display="block"
        variant="subtitle"
        style={{ textAlign: "center", marginTop: "10px" }}
      >
        {props.item.description}
      </Typography>
    </Paper>
  );
};
export default CarouselItem;
