import React from "react";
import { Paper, Button } from "@mui/material";

const CarouselItem = (props) => {
  return (
    <Paper>
      <h2>{props.item.name}</h2>
      <p>{props.item.description}</p>
    </Paper>
  );
};
export default CarouselItem;
