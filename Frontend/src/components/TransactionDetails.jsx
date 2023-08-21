import { React, useState, useEffect } from "react";
import { Box, Typography, Divider } from "@mui/material";
import Btn from "./Btn";
import Avt from "./Avt";
import useFetch from "../hooks/useFetch";

const TransactionDetails = (props) => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box
          xs={2}
          sx={{ display: "flex", flexDirection: "column", m: "0.5rem" }}
        >
          <Avt sx={{ width: "3rem", height: "3rem" }}></Avt>
          {/* //TODO: update avatar */}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", m: "0.5rem" }}>
          <Typography component="div" variant="body">
            {props.selectedTxn.requester_id.display_name}
          </Typography>
          <Typography variant="body" color="text.secondary" component="div">
            Neighbour in {props.selectedTxn.requester_id.location[0].district}
          </Typography>
        </Box>
      </Box>

      <Divider variant="middle" sx={{ marginLeft: "5%", marginRight: "5%" }} />

      <Box>
        <Box>
          <Typography
            variant="body"
            color="text.secondary"
            component="div"
            display="block"
            margin="1rem"
          >
            {props.selectedTxn.requester_id.display_name} is interested in{" "}
            {props.selectedTxn.listing_id.title}.
          </Typography>
          <Typography
            variant="body"
            color="text.secondary"
            component="div"
            display="block"
            margin="1rem"
          >
            Accept this request?
          </Typography>
          <Typography
            variant="body"
            color="text.secondary"
            component="div"
            display="block"
            margin="1rem"
          >
            Once accepted, you will exchange mobile numbers to arrange a
            meet-up. Your mobile number:{" "}
            {props.selectedTxn.requester_id.mobile_number}
          </Typography>
        </Box>
        <Box display="flex" margin="1rem">
          <Btn width={10}>Accept</Btn>
          <Btn isBrown={true} width={10}>
            Decline
          </Btn>
        </Box>
      </Box>
    </>
  );
};

export default TransactionDetails;
