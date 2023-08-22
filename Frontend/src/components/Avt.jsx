import React from "react";
import { Avatar } from "@mui/material";

const Avt = (props) => {
  return (
    <>
      <Avatar
        sx={{ width: `${props.size}rem`, height: `${props.size}rem` }}
        src={`${props.src}`}
      ></Avatar>
    </>
  );
};

export default Avt;
