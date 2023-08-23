import { React, useState, useEffect } from "react";
import { Box, Typography, Divider, Tooltip, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Btn from "./Btn";
import Avt from "./Avt";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import useFetch from "../hooks/useFetch";
import { useContext } from "react";
import UserContext from "../context/user";

const TransactionDetails = (props) => {
  const userCtx = useContext(UserContext);
  const user_score = props.selectedTxn.owner_id.help_count;
  const navigate = useNavigate();
  const fetchData = useFetch();
  let content = "";

  //Functions

  //When user clicks "Accept", update transaction status to "accepted"
  const updateTxnStatus = async (newStatus) => {
    const res = await fetchData(
      "/api/transactions/" + props.selectedTxn._id,
      "PATCH",
      {
        status: newStatus,
      },
      userCtx.accessToken
    );
    if (res.ok) {
      props.setTransactionState(newStatus);
      if (newStatus === "completed") {
        props.incrementOwnerScore();
      }
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  //generate content based on txnToggle and transaction state
  if (props.txnToggle === "listings") {
    //content for user's listings
    if (props.transactionState === "pending_owner_response") {
      content = (
        <Box sx={{ display: "flex", flexDirection: "column", m: "0.5rem" }}>
          <Typography
            variant="body"
            component="div"
            display="block"
            margin="1rem"
          >
            {props.selectedTxn.requester_id.display_name} is interested in{" "}
            {props.selectedTxn.listing_id.title}. Accept this request? <br />
            <br />
            Once accepted, you will exchange mobile numbers to arrange a
            meet-up.
            <br />
            <br />
            Your mobile number: {props.selectedTxn.owner_id.mobile_number}
          </Typography>

          <Box sx={{ display: "flex", m: "0.5rem" }}>
            <Btn
              width={10}
              onClick={() => {
                updateTxnStatus("accepted");
              }}
            >
              Accept
            </Btn>
            <Btn
              isBrown={true}
              width={10}
              onClick={() => {
                updateTxnStatus("declined");
              }}
            >
              Decline
            </Btn>
          </Box>
        </Box>
      );
    } else if (props.transactionState === "accepted") {
      // Render content for the "accepted" state
      content = (
        <Box sx={{ display: "flex", flexDirection: "column", m: "0.5rem" }}>
          <Typography
            variant="body"
            component="div"
            display="block"
            margin="1rem"
          >
            You accepted {props.selectedTxn.requester_id.display_name}'s request
            for {props.selectedTxn.listing_id.title}.
            <br />
            <br />
            {props.selectedTxn.requester_id.display_name}'s contact number:{" "}
            {props.selectedTxn.requester_id.mobile_number}
            <br />
            <br />
            Arrange a meet-up with {
              props.selectedTxn.requester_id.display_name
            }{" "}
            directly.
          </Typography>

          <Box sx={{ display: "flex", m: "0.5rem" }}>
            <Btn
              width={15}
              onClick={() => {
                updateTxnStatus("completed");
              }}
            >
              Transaction Completed
            </Btn>
          </Box>

          {/* <Typography
            variant="body"
            component="div"
            display="block"
            margin="1rem"
          >
            You can exchange reviews once you have marked this transaction as
            complete.
          </Typography> */}
        </Box>
      );
    } else if (props.transactionState === "declined") {
      // Add content for the "declined" state
      content = (
        <Box sx={{ display: "flex", flexDirection: "column", m: "0.5rem" }}>
          <Typography
            variant="body"
            component="div"
            display="block"
            margin="1rem"
          >
            You declined {props.selectedTxn.requester_id.display_name}'s'
            request for {props.selectedTxn.listing_id.title}.
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", m: "0.5rem" }}>
            <Btn
              width={15}
              onClick={() => {
                navigate(`/listing/${props.selectedTxn.listing_id._id}`);
              }}
            >
              View listing
            </Btn>
          </Box>
        </Box>
      );
    } else if (props.transactionState === "completed") {
      // Render content for the "completed" state
      content = (
        <Box sx={{ display: "flex", flexDirection: "column", m: "0.5rem" }}>
          <Typography
            variant="h2"
            component="div"
            display="block"
            margin="1rem"
            align="center"
          >
            Thanks for being neighbourly!
            <br />
            <FavoriteBorderIcon
              sx={{ fontSize: "60px", color: "pink" }}
            ></FavoriteBorderIcon>
          </Typography>
          <Typography
            variant="body"
            component="div"
            display="block"
            align="center"
          >
            You have helped
            <span style={{ color: "pink", fontSize: "2rem" }}>
              {" "}
              {user_score}{" "}
            </span>
            neighbours.<br></br>
          </Typography>
          {/* <Typography
            variant="body"
            component="div"
            display="block"
            margin="1rem"
            align="center"
          >
            This transaction is complete. Leave{" "}
            {props.selectedTxn.requester_id.display_name} a review to say
            thanks!.
          </Typography> */}
          <Box sx={{ display: "flex", m: "0.5rem" }} justifyContent="center">
            {/* add review button after functionality added  */}
            {/* <Btn width={15}>
              Leave a review
            </Btn> */}
            <Btn
              width={10}
              onClick={() => {
                navigate(`/listing/${props.selectedTxn.listing_id._id}`);
              }}
            >
              View Listing
            </Btn>
          </Box>
        </Box>
      );
    }
  } else if (props.txnToggle === "requests") {
    //content for user's requests
    if (props.transactionState === "pending_owner_response") {
      content = (
        <Box sx={{ display: "flex", flexDirection: "column", m: "0.5rem" }}>
          <Typography
            variant="body"
            component="div"
            display="block"
            margin="1rem"
          >
            You submitted a request to {props.selectedTxn.owner_id.display_name}{" "}
            for {props.selectedTxn.listing_id.title}.
            <br />
            <br />
            Waiting for {props.selectedTxn.owner_id.display_name} to respond...
          </Typography>

          <Box sx={{ display: "flex", m: "0.5rem" }}>
            <Btn
              width={10}
              onClick={() => {
                navigate(`/listing/${props.selectedTxn.listing_id._id}`);
              }}
            >
              View Listing
            </Btn>
          </Box>
        </Box>
      );
    } else if (props.transactionState === "accepted") {
      // Render content for the "accepted" state
      content = (
        <Box sx={{ display: "flex", flexDirection: "column", m: "0.5rem" }}>
          <Typography
            variant="body"
            component="div"
            display="block"
            margin="1rem"
          >
            {props.selectedTxn.owner_id.display_name} accepted your request for{" "}
            {props.selectedTxn.listing_id.title}!
            <br />
            <br />
            {props.selectedTxn.owner_id.display_name}'s contact number:{" "}
            {props.selectedTxn.owner_id.mobile_number}
            <br />
            <br />
            Arrange a meet-up with {
              props.selectedTxn.owner_id.display_name
            }{" "}
            directly.
          </Typography>

          <Box sx={{ display: "flex", m: "0.5rem" }}>
            <Btn
              width={15}
              onClick={() => {
                updateTxnStatus("completed");
              }}
            >
              Transaction Completed
            </Btn>
          </Box>

          {/* <Typography
            variant="body"
            component="div"
            display="block"
            margin="1rem"
          >
            You can exchange reviews once you have marked this transaction as
            complete.
          </Typography> */}
        </Box>
      );
    } else if (props.transactionState === "declined") {
      // Add content for the "declined" state
      content = (
        <Box sx={{ display: "flex", flexDirection: "column", m: "0.5rem" }}>
          <Typography
            variant="body"
            component="div"
            display="block"
            margin="1rem"
          >
            {props.selectedTxn.owner_id.display_name} declined your request for{" "}
            {props.selectedTxn.listing_id.title}.<br />
            Better luck next time...
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", m: "0.5rem" }}>
            <Btn
              width={15}
              onClick={() => {
                navigate(`/listing/${props.selectedTxn.listing_id._id}`);
              }}
            >
              View listing
            </Btn>
          </Box>
        </Box>
      );
    } else if (props.transactionState === "completed") {
      // Render content for the "completed" state
      content = (
        <Box sx={{ display: "flex", flexDirection: "column", m: "0.5rem" }}>
          <Typography
            variant="h2"
            component="div"
            display="block"
            margin="1rem"
            align="center"
          >
            Thanks for being neighbourly!
            <br />
            <FavoriteBorderIcon
              sx={{ fontSize: "60px", color: "pink" }}
            ></FavoriteBorderIcon>
          </Typography>
          <Typography
            variant="body"
            component="div"
            display="block"
            align="center"
          >
            {props.selectedTxn.owner_id.display_name} has helped
            <span style={{ color: "pink", fontSize: "2rem" }}>
              {" "}
              {user_score}{" "}
            </span>
            neighbours.<br></br>
          </Typography>
          {/* <Typography
            variant="body"
            component="div"
            display="block"
            margin="1rem"
            align="center"
          >
            This transaction is complete. Leave{" "}
            {props.selectedTxn.owner_id.display_name} a review to say thanks!.
          </Typography> */}
          <Box sx={{ display: "flex", m: "0.5rem" }} justifyContent="center">
            <Btn
              width={15}
              onClick={() => {
                navigate(`/listing/${props.selectedTxn.listing_id._id}`);
              }}
            >
              View listing
            </Btn>
            {/* add review button after functionality added  */}
            {/* <Btn width={15}>Leave a review</Btn> */}
          </Box>
        </Box>
      );
    }
  }
  return (
    <>
      <Box sx={{ display: "flex", m: "1rem" }}>
        <Box
          xs={2}
          sx={{ display: "flex", flexDirection: "column", m: "0.5rem" }}
        >
          <Tooltip title="View Profile" placement="top">
            <IconButton
              onClick={() => {
                navigate(
                  `/profile/${
                    props.txnToggle === "listings"
                      ? props.selectedTxn.requester_id._id
                      : props.selectedTxn.owner_id._id
                  }`
                );
              }}
            >
              <Avt
                sx={{ width: "3rem", height: "3rem" }}
                alt="Avatar"
                src={
                  props.txnToggle === "listings"
                    ? props.selectedTxn.requester_id.image_url
                    : props.selectedTxn.owner_id.image_url
                }
              ></Avt>
            </IconButton>
          </Tooltip>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", m: "0.5rem" }}>
          <Typography component="div" variant="body">
            {props.txnToggle === "listings"
              ? props.selectedTxn.requester_id.display_name
              : props.selectedTxn.owner_id.display_name}
          </Typography>
          <Typography variant="body" color="text.secondary" component="div">
            Neighbour in{" "}
            {props.txnToggle === "listings"
              ? props.selectedTxn.requester_id.location[0].district
              : props.selectedTxn.owner_id.location[0].district}
          </Typography>
        </Box>
      </Box>

      <Divider variant="middle" sx={{ marginLeft: "5%", marginRight: "5%" }} />

      {content}
    </>
  );
};

export default TransactionDetails;
