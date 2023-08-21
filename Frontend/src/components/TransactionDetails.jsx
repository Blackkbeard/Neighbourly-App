import { React, useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Btn from "./Btn";
import useFetch from "../hooks/useFetch";

const TransactionDetails = (props) => {
  return (
    <>
      <Box>
        <Box>
          <Typography
            variant="body"
            color="text.secondary"
            component="div"
            display="block"
            margin="1rem"
          >
            RequesterName is interested in ListingTitle.
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
            meet-up.
          </Typography>

          <Typography
            variant="body"
            color="text.secondary"
            component="div"
            display="block"
            margin="1rem"
          >
            Your mobile number: +65 91234567
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
